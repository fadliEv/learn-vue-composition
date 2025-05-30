<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const timer = ref(0)
let intervalId = null;


onMounted(() => {
    console.log("Timer Component mounted");
    intervalId = setInterval(() => {
        timer.value++
    },1000)
})

onUnmounted(() => {
  clearInterval(intervalId)  
  console.log("Timer Component unmounted");
})

</script>

<template>

    <p>Timer : {{ timer }}</p>

</template>