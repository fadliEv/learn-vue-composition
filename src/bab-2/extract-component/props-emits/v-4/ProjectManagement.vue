<script setup>
import { ref, onMounted, reactive} from "vue"
import ProjectList from "./ProjectList.vue"
import ProjectForm from "./ProjectForm.vue"

const projects = ref([])
const editingProject = ref(null)

function setupLocalStorage(){
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
        projects.value = JSON.parse(storedProjects)
    }else{
        const initialData = [
            {id : 1, name : "Website Redesign", client : "Acme Corp", status : "Ongoing", budget : 1000000},
            {id : 2, name : "Mobile App", client : "Mandiri", status : "Completed", budget : 2000000},
        ]
        projects.value = initialData        
        updateLocalStorage()
    }
}

function updateLocalStorage(){
    localStorage.setItem("projects", JSON.stringify(projects.value))
}

onMounted(() => {
    setupLocalStorage()
})

function upsertProject(project){
    if (project.id){
        const idx = projects.value.findIndex(p => p.id === project.id)
        if (idx !== -1) projects.value[idx] = {...project}
        editingProject.value = null
    }else{
        project.id = Date.now()
        projects.value.push(project)
    }
    updateLocalStorage()
}

function onEditing(project){
    editingProject.value = project
}

</script>


<template>
    <div class="container">
        <h1 style="text-align: center;">Project Management</h1>
        <ProjectForm
            v-model="editingProject"
            @save="upsertProject"
        />
        <ProjectList
         :projects="projects"
         @edit="onEditing"
        />
    </div>
</template>


<style scoped>
.container {
    max-width: 700px;
    margin : 1rem auto;    
}
.footer {
    display: flex;
    justify-content: space-between;
}
</style>