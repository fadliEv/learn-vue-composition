<script setup>
import { ref, onMounted } from "vue"
import Modal from "./Modal.vue"
import Notification from "./Notification.vue"

const tasks = ref([])
const newTaskName = ref('')
const isShowModal = ref(false)
const currentTask = ref(null)

// edit
const onEdit = ref(false)
const editingTaskId = ref(null)
const inputRefs = ref([])
const originalTaskName = ref("")

const notificationMsg = ref("")
const showNotif = ref(false)

function setItemRef(el, index) {
    inputRefs.value[index] = el
}

function editTask(id) {
    const task = tasks.value.find(t => t.id == id)
    originalTaskName.value = task.name
    onEdit.value = true
    editingTaskId.value = id
    const idx = tasks.value.findIndex(t => t.id === id)
    if(idx !== -1 && inputRefs.value[idx]){
        inputRefs.value[idx].focus()
    }    
}

function saveEdit(){
    onEdit.value = false
    editingTaskId.value = null
    updateLocalStorage()
}

function cancelEdit(){
    tasks.value = tasks.value.map(t => {
        if(t.id === editingTaskId.value){
            t.name = originalTaskName.value
            return t
        }
        return t
    })
    onEdit.value = false
    editingTaskId.value = null
    updateLocalStorage()
}

function initLocalStorage(){
    const checkItem = localStorage.getItem('tasks')
    if(checkItem) {
        tasks.value = JSON.parse(checkItem)
    }else{
        const initData = [
            { id : 1, name : "Task 1", isCompleted : false},
            { id : 2, name : "Task 2", isCompleted : true},
            { id : 3, name : "Task 3", isCompleted : false}
        ]
        tasks.value = initData
        updateLocalStorage()
    }
}

function addTask(){
    const newTask = {
        id : Date.now(),
        name : newTaskName.value,
        isCompleted : false
    }
    tasks.value.unshift(newTask)
    newTaskName.value = ""
    updateLocalStorage()
}

function updateLocalStorage(){
    localStorage.setItem('tasks',JSON.stringify(tasks.value))
}

function handleDeleteConfirmation(isDeleted){
    if (isDeleted && currentTask.value.id) {
        console.log("LOg",isDeleted);
        
        tasks.value = tasks.value.filter(t => t.id !== currentTask.value.id)
    }
    updateLocalStorage()
}

function confirmDelete(task){
    isShowModal.value = true
    currentTask.value = task
}

function toggleTaskComplete(task){
    task.isCompleted = !task.isCompleted
    updateLocalStorage()

    notificationMsg.value = `Task marked as ${task.isCompleted ? 'completed' : 'incompleted'}`
    showNotif.value = true
    setTimeout(() => {
        showNotif.value = false
    }, 2000);
}

onMounted(() => {
    initLocalStorage()
})
</script>

<template>
    <div class="wrapper">
        <h1>Todo</h1>
        <form @submit.prevent="addTask">
            <input type="text" placeholder="input new todo" v-model="newTaskName">
            <button>
                Add
            </button>
        </form>
        <ul>
            <TransitionGroup name="list" tag="ul">
                <li v-for="(task,index) in tasks" :key="task.id">
                    <div class="wrapper-item">
                        <input 
                            v-model="task.name"
                            type="text"    
                            :ref="el => setItemRef(el,index)"
                            :disabled="task.id !== editingTaskId"
                        >
                        <input 
                            type="checkbox" 
                            name="" 
                            :checked="task.isCompleted" 
                            v-model="task.isCompleted" 
                            id=""
                            @change="toggleTaskComplete(task)"
                            >
                        <button @click="confirmDelete(task)">
                            remove
                        </button>
                        <template v-if="onEdit && editingTaskId === task.id">
                            <button @click="saveEdit">Save</button>
                            <button @click="cancelEdit">Cancel</button>
                        </template>
                        <button v-else @click="editTask(task.id)">
                            edit
                        </button>
                    </div>``
                </li>
            </TransitionGroup>
        </ul>
        <Modal v-model="isShowModal" @confirmed="handleDeleteConfirmation"/>
        <Notification
            v-if="showNotif"
            :message="notificationMsg"
            @close="showNotif = false"
        />
    </div>
</template>

<style scoped>
.wrapper {
    max-width : 600px;
    margin : 0 auto;
    padding : 20px;
}

.form {
    display : flex;
    gap : 10px;
    margin-bottom : 20px;
}

ul {
    list-style: none;
    padding : 0;
    margin : 0;
}
li {
    margin-bottom : 10px;
}
.wrapper-item {
    /* display : flex; */
    align-items : center;    
}
input[type="text"] {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
}

input[type="text"].completed {
    text-decoration: line-through;
    color: #666;
    background-color: #f0f0f0;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>