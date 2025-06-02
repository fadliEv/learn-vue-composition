<script setup>
const props = defineProps({
  items: Array
})
const emit = defineEmits(['toggle', 'delete'])

function emitToggle(id, completed) {
  emit('toggle', id, completed)
}
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- Scoped slot + emitToggle -->
      <slot :item="item" :emitToggle="emitToggle">
        {{ item.text }}
      </slot>
    </li>
  </ul>
</template>
