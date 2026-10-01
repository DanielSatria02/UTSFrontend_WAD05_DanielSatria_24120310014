<script setup>
import StockBadge from '../StockBadge/StockBadge.vue'
import { getStockStatus } from '../../composables/useBarang'

defineProps({
  items: {
    type: Array,
    required: true,
  },
})

defineEmits(['delete'])
</script>

<template>
  <div class="barang-list">
    <div class="barang-list__scroll">
      <table class="barang-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Jumlah Stok</th>
            <th>Lokasi Gudang</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td data-label="Nama">{{ item.nama }}</td>
            <td data-label="Kategori">{{ item.kategori }}</td>
            <td data-label="Jumlah Stok">{{ item.jumlah_stok }}</td>
            <td data-label="Lokasi Gudang">{{ item.lokasi_gudang }}</td>
            <td data-label="Status">
              <StockBadge :status="getStockStatus(item.jumlah_stok)" />
            </td>
            <td data-label="Aksi">
              <button type="button" class="barang-table__delete" @click="$emit('delete', item.id)">
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="items.length === 0" class="barang-table__empty-row">
            <td colspan="6">Tidak ada data barang yang cocok.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped src="./BarangList.css"></style>
