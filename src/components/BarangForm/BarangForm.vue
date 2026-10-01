<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit', 'close'])

const form = reactive({
  nama: '',
  kategori: '',
  jumlah_stok: 0,
  lokasi_gudang: '',
})

function handleSubmit() {
  emit('submit', { ...form })
}
</script>

<template>
  <div class="barang-form-overlay" @click.self="$emit('close')">
    <form class="barang-form" @submit.prevent="handleSubmit">
      <h2 class="barang-form__title">Tambah Barang Baru</h2>

      <label class="barang-form__field">
        <span>Nama Barang</span>
        <input v-model="form.nama" type="text" required />
      </label>

      <label class="barang-form__field">
        <span>Kategori</span>
        <input v-model="form.kategori" type="text" required />
      </label>

      <label class="barang-form__field">
        <span>Jumlah Stok</span>
        <input v-model.number="form.jumlah_stok" type="number" min="0" required />
      </label>

      <label class="barang-form__field">
        <span>Lokasi Gudang</span>
        <input v-model="form.lokasi_gudang" type="text" required />
      </label>

      <div class="barang-form__actions">
        <button type="button" class="barang-form__cancel" @click="$emit('close')">Batal</button>
        <button type="submit" class="barang-form__submit">Simpan</button>
      </div>
    </form>
  </div>
</template>

<style scoped src="./BarangForm.css"></style>
