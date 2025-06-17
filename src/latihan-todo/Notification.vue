<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

// Auto-close after 3 seconds
onMounted(() => {
  setTimeout(() => {
    emit('close')
  }, 3000)
})
</script>

<template>
  <Transition name="notification">
    <div class="notification">
      <p>{{ message }}</p>
      <button @click="$emit('close')" class="close-btn">×</button>
    </div>
  </Transition>
</template>

<style scoped>
.notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 15px 20px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
}

/* Transition effects */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.5s ease;
}

.notification-enter-from,
.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>