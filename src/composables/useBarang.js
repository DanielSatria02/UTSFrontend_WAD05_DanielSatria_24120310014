import { computed, ref } from 'vue'
import { createBarang, deleteBarang, fetchBarang } from '../api/barangApi'

// Stock status thresholds (see README for rationale): Habis = 0, Menipis = 1-5, Aman = >5
const MENIPIS_MAX = 5

export function getStockStatus(jumlahStok) {
  if (jumlahStok <= 0) return 'Habis'
  if (jumlahStok <= MENIPIS_MAX) return 'Menipis'
  return 'Aman'
}

export function useBarang() {
  const barangList = ref([])
  const isLoading = ref(false)
  const errorMessage = ref('')
  const searchTerm = ref('')
  const sortDirection = ref('asc')

  async function loadBarang() {
    isLoading.value = true
    errorMessage.value = ''
    try {
      barangList.value = await fetchBarang()
    } catch (err) {
      errorMessage.value = 'Gagal mengambil data barang dari server. Pastikan backend berjalan.'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  async function addBarang(payload) {
    errorMessage.value = ''
    try {
      await createBarang(payload)
      await loadBarang()
      return true
    } catch (err) {
      errorMessage.value = 'Gagal menambahkan barang baru.'
      console.error(err)
      return false
    }
  }

  async function removeBarang(id) {
    errorMessage.value = ''
    try {
      await deleteBarang(id)
      await loadBarang()
    } catch (err) {
      errorMessage.value = 'Gagal menghapus barang.'
      console.error(err)
    }
  }

  // Pencarian berdasarkan nama atau kategori
  const filteredBarang = computed(() => {
    const term = searchTerm.value.trim().toLowerCase()
    if (!term) return barangList.value
    return barangList.value.filter(
      (item) =>
        item.nama.toLowerCase().includes(term) || item.kategori.toLowerCase().includes(term),
    )
  })

  // Urutan A-Z / Z-A berantai di atas hasil pencarian
  const sortedBarang = computed(() => {
    const sorted = [...filteredBarang.value].sort((a, b) => a.nama.localeCompare(b.nama))
    return sortDirection.value === 'asc' ? sorted : sorted.reverse()
  })

  // 4 tile ringkasan, dihitung murni dari data barang yang sama
  const summary = computed(() => {
    const raw = barangList.value.reduce(
      (acc, item) => {
        acc.totalBarang += 1
        acc.totalUnit += item.jumlah_stok
        if (getStockStatus(item.jumlah_stok) !== 'Aman') acc.stokKritis += 1
        acc.kategoriSet.add(item.kategori)
        return acc
      },
      { totalBarang: 0, stokKritis: 0, totalUnit: 0, kategoriSet: new Set() },
    )
    return {
      totalBarang: raw.totalBarang,
      stokKritis: raw.stokKritis,
      totalUnit: raw.totalUnit,
      kategoriUnik: raw.kategoriSet.size,
    }
  })

  return {
    barangList,
    isLoading,
    errorMessage,
    searchTerm,
    sortDirection,
    filteredBarang,
    sortedBarang,
    summary,
    loadBarang,
    addBarang,
    removeBarang,
  }
}
