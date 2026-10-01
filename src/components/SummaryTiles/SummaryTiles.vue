<script setup>
defineProps({
  summary: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="summary-tiles" aria-label="Ringkasan inventaris">
    <div class="summary-tile">
      <p class="summary-tile__label">Total Barang</p>
      <p class="summary-tile__value">{{ summary.totalBarang }}</p>
    </div>
    <div class="summary-tile summary-tile--warning">
      <p class="summary-tile__label">Stok Menipis + Habis</p>
      <p class="summary-tile__value">{{ summary.stokKritis }}</p>
    </div>
    <div class="summary-tile">
      <p class="summary-tile__label">Jumlah Kategori</p>
      <p class="summary-tile__value">{{ summary.kategoriUnik }}</p>
    </div>
    <div class="summary-tile">
      <p class="summary-tile__label">Total Unit</p>
      <p class="summary-tile__value">{{ summary.totalUnit }}</p>
    </div>
  </section>
</template>

<style scoped src="./SummaryTiles.css"></style>
