<script setup>
import { ref, onMounted } from "vue"

const todos = ref([])

const newTodo = ref('')

function addTodo(){
    todos.value.push({id : todos.value.length + 1, text : newTodo.value, isCompleted : false})
    newTodo.value = ""
    refreshLS()
}

function initLocalStorage(){
    if (localStorage.getItem("todos")){
        todos.value = JSON.parse(localStorage.getItem('todos'))
    }else{
        const defaultTodos = [
            {id : 1, text : "Belajar Vue", isCompleted : false},
            {id : 2, text : "Bikin App", isCompleted : true},
            {id : 3, text : "Ngopi", isCompleted : false}
        ]
        todos.value = defaultTodos
        refreshLS()
    }
}

function refreshLS(){
    localStorage.setItem("todos", JSON.stringify(todos.value))
}

function updateTodoStatus(todo){
    todos.value = todos.value.map( t => {
        if (todo.id === t.id){
            t.isCompleted = !t.isCompleted
            return t
        }
        return t
    })    
    refreshLS()
}

function deleteTodo(id){
    todos.value = todos.value.filter(t => t.id !== id)
    refreshLS()
}

onMounted(() => initLocalStorage())

</script>

<template>
    <div class="container">
        <h2>Todo App</h2>
        <form @submit.prevent="addTodo">
            <input type="text" v-model="newTodo" placeholder="Tambah todo">
            <button type="submit">Submit</button>
        </form>

        <ul>
            <TransitionGroup name="list" tag="ul">
                <li v-for="todo in todos" :key="todo.id">                                        
                    <span :style="{textDecoration : todo.isCompleted ? 'line-through' : 'none'}">
                        {{ todo.text }}
                        <input type="checkbox" :checked="todo.isCompleted" @change="updateTodoStatus(todo)">
                        <button @click="deleteTodo(todo.id)">X</button>
                    </span>                                        
                </li>
            </TransitionGroup>
        </ul>        
        
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin : auto;
    font-family: Arial, sans-serif;
}
.todo-list {
    list-style-type: none;
    padding : 0
}

li {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
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