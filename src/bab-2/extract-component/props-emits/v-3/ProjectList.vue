<script setup>
import { formatRupiah } from './UtilsFormat'

const props = defineProps({
  projects: Array
})

const emit = defineEmits(['edit', 'delete'])

function onEdit(project) {
  emit('edit', project)
}

function onDelete(id) {
  emit('delete', id)
}
</script>   

<template>
  <table border="1" cellpadding="8" cellspacing="0" style="width: 100%">
    <thead>
      <tr>
        <th>No</th>
        <th>Name</th>
        <th>Client</th>
        <th>Status</th>
        <th>Budget</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(project, index) in projects" :key="project.id">
        <td>{{ index + 1 }}</td> <!-- nomor urut dari index -->
        <td>{{ project.name }}</td>
        <td>{{ project.client }}</td>
        <td>{{ project.status }}</td>
        <td>{{ formatRupiah(project.budget) }}</td> <!-- format Rupiah -->
        <td>
          <button @click="onEdit(project)">Edit</button>
          <button @click="onDelete(project.id)">Delete</button>
        </td>
      </tr>
      <tr v-if="projects.length === 0">
        <td colspan="6" style="text-align: center; color: gray;">
          No projects found.
        </td>
      </tr>
    </tbody>
  </table>
</template>
