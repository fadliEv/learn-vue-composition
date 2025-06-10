<script setup>
import { ref, onMounted } from "vue"

const tasks = ref([])

const newTaskName = ref('')

// edit
const onEdit = ref(false)
const editingTaskId = ref(null)
const inputRefs = ref([])
const originalTaskName = ref("")

function initLocalStorage(){
    const checkItem = localStorage.getItem("tasks")
    if(checkItem) {
        tasks.value = JSON.parse(checkItem)
    }else{
        const initData = [
            { id: 1, name: "Task 1" },
            { id: 2, name: "Task 2" },
            { id: 3, name: "Task 3" }
        ]
        tasks.value = initData
        localStorage.setItem("tasks",JSON.stringify(tasks.value))
    }
}

onMounted(() => {
    initLocalStorage()
})


function addTask() {
    if (newTaskName.value.trim()) {
        tasks.value.push({ id: Date.now(), name: newTaskName.value })
        newTaskName.value = ''
    }
    localStorage.setItem("tasks",JSON.stringify(tasks.value))
}

function removeTask(id) {
    const isAccepted = confirm("Are you sure to delete this task?")
    if (isAccepted) {
        const index = tasks.value.findIndex(t => t.id === id)
        if (index !== -1) {
            tasks.value.splice(index, 1)
        }
    }
    localStorage.setItem("tasks",JSON.stringify(tasks.value))
}

function editTask(id){
    if(onEdit.value && editingTaskId.value === id){
        onEdit.value = false
        editingTaskId.value = null
        return;
    }

    const task = tasks.value.find(t => t.id === id)
    originalTaskName.value = task.name

    onEdit.value = true
    editingTaskId.value = id
    
    const idx = tasks.value.findIndex(t => t.id === id)
    if (idx !== -1 && inputRefs.value[idx]){
        inputRefs.value[idx].focus()
    } 
    localStorage.setItem("tasks",JSON.stringify(tasks.value))           
}

function cancelEdit(){
    if (editingTaskId.value){
        const task = tasks.value.find(t => t.id === editingTaskId.value)
        if (task) {
            task.name = originalTaskName.value
        }
    }
    
    onEdit.value = false
    editingTaskId.value = null
}

function saveEdit(){
    onEdit.value = false
    editingTaskId.value = null
    localStorage.setItem("tasks",JSON.stringify(tasks.value))           
}


function setItemRef(el, index){
    inputRefs.value[index] = el
}
</script>

<template>
    <div class="wrapper">
        <h1>Todo</h1>
        <form @submit.prevent="addTask">
            <input type="text" placeholder="Input new Todo" v-model="newTaskName">
            <button>
                Add
            </button>
        </form>
        <ul>
            <TransitionGroup name="slide-fade" tag="ul">
                <li v-for="(task,index) in tasks" :key="task.id">
                    <div class="wrapper-item">
                        <input
                            type="text"
                            v-model="task.name"
                            :ref="el => setItemRef(el,index)"
                            :disabled=" editingTaskId !== task.id"                            
                        >
                        <button @click="removeTask(task.id)">
                            Remove
                        </button>
                        <template v-if="onEdit && editingTaskId === task.id">
                            <button
                                @click="saveEdit"
                            >
                                Save
                            </button>
                            <button
                                @click="cancelEdit"                                
                            >
                                Cancel
                            </button>
                        </template>
                        <button                         
                            v-else
                            :disabled="onEdit"
                            @click="editTask(task.id)"
                            >
                             Edit
                        </button>
                    </div>
                </li>
            </TransitionGroup>
        </ul>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px
}
form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}
ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
li {
    margin-bottom: 10px;
}
.wrapper-item {
    display: flex;
    align-items: center;
    gap: 10px;
}
input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px
}

/* Transition styles */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.slide-fade-leave-active {
    position: absolute;
}
.slide-fade-move {
    transition: transform 0.5s ease;
}
</style>