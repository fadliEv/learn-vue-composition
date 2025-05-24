<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue"

const todos = ref([])

const formData = reactive({
    title : ''
})

const showList = ref(true)
const timer = ref(0)
let intervalId = null

localStorage.setItem

function initLocalstorage(){
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {        
        todos.value = JSON.parse(storedTodos ) 
    }else{
        const defaultTodos = [
            { id : 1, title : 'Belajar vue', isCompleted : false},
            { id : 2, title : 'Mandi', isCompleted : false},
            { id : 3, title : 'Olahraga', isCompleted : true},
        ]
        localStorage.setItem("todos",JSON.stringify(defaultTodos))
        todos.value = defaultTodos
    }
}

function updateLocalStorage(todos) {
    localStorage.setItem("todos",JSON.stringify(todos))
}

onMounted(() => {
    initLocalstorage()
    if (showList.value) {        
        startTimer()
    }
})

watch(showList, (newVal) => {
    if (newVal){
        startTimer()
    }else{
        clearInterval(intervalId)
        timer.value = 0
    }
})

function startTimer() {
    clearInterval(intervalId)
    timer.value = 0
    intervalId = setInterval(() => {
        timer.value++
    },1000)
}

function addTodo(){
    if (formData.title.length > 3){
        const newTodo = {
            id : todos.value.length + 1,
            title : formData.title,
            isCompleted : false
        }
        todos.value.push(newTodo)
        formData.title = ""
        updateLocalStorage(todos.value)
    }else{
        alert("Minimal 3 karater bosku")
    }
}

const todoDone = computed(() => {
    return todos.value.filter(t => t.isCompleted).length
})

const remainingTodos = computed(() => {
    return todos.value.filter(t => !t.isCompleted).length
})

function toggleDone(id) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
    updateLocalStorage(todos.value)
}


function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
    updateLocalStorage(todos.value)
}

const searchTodo = ref("")

const filteredTodos = computed(() => {
    return todos.value.filter( t => {
        return t.title.toLowerCase().includes(searchTodo.value.toLowerCase())
    })
})

</script>


<template>

    <div class="container">
        <h2>Todo List</h2>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="formData.title" placeholder="Nama Todo">
            <button type="submit">Submit</button>
        </form>
        <br>
        <button @click="showList = !showList">
            {{ showList ? "Hide" : "Show" }}
        </button>
        <p>Timer aktif saat daftar tampil: {{ timer }} detik</p>
        <input type="text" placeholder="Cari Todo..." v-model="searchTodo">
        <ul v-if="showList">
            <li
            v-for="todo in filteredTodos"
            :key="todo.id"
            >
                {{ todo.title }}
                <input type="checkbox" v-model="todo.isCompleted" @change="toggleDone(todo.id)" />
                <button @click="removeTodo(todo.id)">Delete</button>
            </li>
        </ul>
        <p v-else> Daftar todo disembunyikan</p>

        <p>
            Tugas Selesai : {{ todoDone }}/{{ todos.length }} <br>
            Tugas belum selesai : {{ remainingTodos }}
        </p>
    </div>

</template>