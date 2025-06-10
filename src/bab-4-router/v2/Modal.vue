<script setup>

const props = defineProps({
  showModal: Boolean,  // Props untuk menentukan apakah modal ditampilkan
  employeeName: String // Nama employee yang sedang dipilih
})

const emit = defineEmits(['confirm', 'cancel'])

function confirmDelete() {
  emit('confirm')
}

function confirmCancel() {
  emit('cancel')
}
</script>

<template>
  <Transition name="slide-fade">
    <div v-if="showModal" class="modal-overlay">
        <div class="modal">
          <h3>Are you sure you want to delete {{ employeeName }}?</h3>
          <div class="modal-actions">
            <button @click="confirmDelete" class="btn-confirm">Yes, Delete</button>
            <button @click="confirmCancel" class="btn-cancel">Cancel</button>
          </div>
        </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;  
}

.modal {
  background: white;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;  
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}


</style>
