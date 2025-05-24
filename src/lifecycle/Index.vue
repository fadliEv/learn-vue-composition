<script setup>
import {ref} from 'vue'
import Timer from './Timer.vue';

const isVisible = ref(true)
</script>

<template>
  <button @click="isVisible = !isVisible">
    {{ isVisible ? "Hide" : "Show" }}
  </button>

  <Timer v-if="isVisible"/>

</template>