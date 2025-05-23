<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const timer = ref(0)
let intervalId = null

// Debug: Cek saat komponen pertama kali dimuat
onMounted(() => {
  console.log('Component Mounted')
  intervalId = setInterval(() => {
    timer.value++
  }, 1000)
})

// Debug: Cek saat komponen di-unmount
onUnmounted(() => {
  clearInterval(intervalId)
  console.log('Component Unmounted')
})

const isVisible = ref(true)
</script>

<template>
  <button @click="isVisible = !isVisible">
    {{ isVisible ? 'Hide' : 'Show' }} Timer
  </button>

  <!-- Gunakan v-if agar komponen bisa di-unmount -->
  <p v-if="isVisible">Timer {{ timer }}</p>
</template>
