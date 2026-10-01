<script setup>
defineProps({
  status: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <span
    class="stock-badge"
    :class="{
      'stock-badge--aman': status === 'Aman',
      'stock-badge--menipis': status === 'Menipis',
      'stock-badge--habis': status === 'Habis',
    }"
  >
    {{ status }}
  </span>
</template>

<style scoped src="./StockBadge.css"></style>
