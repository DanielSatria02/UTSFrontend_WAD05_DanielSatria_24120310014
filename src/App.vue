<script setup>
import { onMounted, ref } from 'vue'
import { useBarang } from './composables/useBarang'
import SummaryTiles from './components/SummaryTiles/SummaryTiles.vue'
import Toolbar from './components/Toolbar/Toolbar.vue'
import BarangList from './components/BarangList/BarangList.vue'
import BarangForm from './components/BarangForm/BarangForm.vue'
import heroImage from './assets/arianagrandeSwarovski.jpg'
import swarovskiLogo from './assets/swarovskiLogo.png'

const {
  isLoading,
  errorMessage,
  searchTerm,
  sortDirection,
  sortedBarang,
  summary,
  loadBarang,
  addBarang,
  removeBarang,
} = useBarang()

const isFormVisible = ref(false)

async function handleFormSubmit(payload) {
  const success = await addBarang(payload)
  if (success) isFormVisible.value = false
}

onMounted(loadBarang)
</script>

<template>
  <div class="app">
    <div class="app__hero" :style="{ '--hero-image': `url(${heroImage})` }">
      <header class="app__header">
        <img class="app__logo" :src="swarovskiLogo" alt="Swarovski logo" />
        <h1>Swarovski Inventory Dashboard</h1>
        <p class="app__subtitle">Do note that we are not affiliated with Swarovski.. #yet ;].</p>
      </header>
    </div>

    <SummaryTiles :summary="summary" />

    <Toolbar
      v-model:search-term="searchTerm"
      v-model:sort-direction="sortDirection"
      @add-click="isFormVisible = true"
    />

    <p v-if="errorMessage" class="app__error" role="alert">{{ errorMessage }}</p>
    <p v-else-if="isLoading" class="app__loading">Memuat data barang...</p>

    <BarangList :items="sortedBarang" @delete="removeBarang" />

    <BarangForm
      v-if="isFormVisible"
      @submit="handleFormSubmit"
      @close="isFormVisible = false"
    />
  </div>
</template>

<style scoped src="./App.css"></style>
