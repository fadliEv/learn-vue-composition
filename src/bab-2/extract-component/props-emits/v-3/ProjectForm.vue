<script setup>
import { reactive, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  modelValue: Object
})
const emit = defineEmits(['update:modelValue', 'save'])

const form = reactive({
  id: null,
  name: '',
  client: '',
  status: '',
  budget: null
})

const statusOptions = ['Planned', 'Ongoing', 'Completed', 'Cancelled']

// Sinkronisasi form dengan modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
        console.log("Test Watcher : ", newVa);
        
      Object.assign(form, newVal)
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// // Emit perubahan form untuk v-model dua arah
// watch(form, (newVal) => {
//   emit('update:modelValue', { ...newVal })
// }, { deep: true })

function save() {
  if (!form.name.trim()) {
    alert('Project name is required')
    return
  }
  emit('save', { ...form })
  resetForm()
}

function resetForm() {
  form.id = null
  form.name = ''
  form.client = ''
  form.status = ''
  form.budget = null
}

</script>

<template>
  <form @submit.prevent="save" class="form">
    <h2>{{ form.id ? 'Edit Project' : 'Add New Project' }}</h2>

    <label>
      Name:
      <input v-model="form.name" type="text" required />
    </label>

    <label>
      Client:
      <input v-model="form.client" type="text" required/>
    </label>

    <label>
      Status:
      <select v-model="form.status" required>
        <option value="" disabled>Select status</option>
        <option v-for="s in statusOptions" :key="s" :value="s">{{ s }}</option>
      </select>
    </label>

    <label>
      Budget:
      <input v-model.number="form.budget" type="number" min="0" required/>
    </label>

    <button type="submit">{{ form.id ? 'Update' : 'Add' }}</button>
  </form>
</template>

<style scoped>
.form {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background: #f9f9f9;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input, select {
  width: 100%;
  padding: 0.3rem;
  margin-top: 0.2rem;
  box-sizing: border-box;
}
button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
}
</style>
