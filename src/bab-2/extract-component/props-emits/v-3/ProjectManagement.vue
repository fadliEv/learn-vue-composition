<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectForm from './ProjectForm.vue'
import ProjectList from './ProjectList.vue'
import { formatRupiah } from './UtilsFormat'

const projects = ref([])

const editingProject = ref(null)   // Project yg diedit
const search = ref('')


function initLocalstorage(){
    const storedProjects = localStorage.getItem('projects')
    if(storedProjects){
        projects.value = JSON.parse(storedProjects)
    }else{
        const initialData = [
            { id: 1, name: 'Website Redesign', client: 'Acme Corp', status: 'Ongoing', budget: 10000 },
            { id: 2, name: 'Mobile App', client: 'Beta LLC', status: 'Completed', budget: 15000 }
        ]
        projects.value = initialData
        updateLocalStorage()
    }
}

function updateLocalStorage(){
    localStorage.setItem('projects', JSON.stringify(projects.value))
}

onMounted(() => {
    initLocalstorage()
})

// Tambah atau update project
function upsertProject(project) {
  if (project.id) {
    const idx = projects.value.findIndex(p => p.id === project.id)
    if (idx !== -1) projects.value[idx] = { ...project }
    editingProject.value = null
  } else {
    project.id = Date.now()
    projects.value.push(project)
  }
  updateLocalStorage()
}

// Mulai edit project 
function editProject(project) {
  editingProject.value = { ...project }
}

// Hapus project
function deleteProject(id) {
  if (confirm('Are you sure to delete this project?')) {
    projects.value = projects.value.filter(p => p.id !== id)
    if (editingProject.value && editingProject.value.id === id) {
      editingProject.value = null
    }
    updateLocalStorage()
  }
}

// Computed: filter projects berdasarkan search
const filteredProjects = computed(() => {
  const q = search.value.toLowerCase()
  if (!q) return projects.value
  return projects.value.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.client.toLowerCase().includes(q) ||
    p.status.toLowerCase().includes(q)
  )
})

// Total budget dari semua project
const totalBudget = computed(() =>
  projects.value.reduce((sum, p) => sum + (p.budget || 0), 0)
)
</script>

<template>
  <div class="container">
    <h1 style="text-align: center;">Project Management</h1>

    <ProjectForm
      v-model="editingProject"
      @save="upsertProject"
    />

    <input
      v-model="search"
      placeholder="Search projects by name, client, status..."
      style="margin: 1rem 0; width: 100%; padding: 0.5rem"
    />

    <ProjectList
      :projects="filteredProjects"
      @edit="editProject"
      @delete="deleteProject"
    />
    <div class="footer">
        <p><strong>Total Budget:</strong> {{ formatRupiah(totalBudget) }}</p>
        <p><strong>Total Item:</strong> {{ projects.length  }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 1rem auto;
  font-family: Arial, sans-serif;
}
.footer {
    display: flex;
    justify-content: space-between;
}
</style>
