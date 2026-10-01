<script setup>
const searchTerm = defineModel('searchTerm', { default: '' })
const sortDirection = defineModel('sortDirection', { default: 'asc' })

defineEmits(['add-click'])

function toggleSort() {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
}
</script>

<template>
  <div class="toolbar">
    <input
      v-model="searchTerm"
      type="search"
      class="toolbar__search"
      placeholder="Cari berdasarkan nama atau kategori..."
      aria-label="Cari barang"
    />
    <button type="button" class="toolbar__button" @click="toggleSort">
      Urutkan: {{ sortDirection === 'asc' ? 'A-Z' : 'Z-A' }}
    </button>
    <button type="button" class="toolbar__button toolbar__button--primary" @click="$emit('add-click')">
      + Tambah Barang
    </button>
  </div>
</template>

<style scoped src="./Toolbar.css"></style>
