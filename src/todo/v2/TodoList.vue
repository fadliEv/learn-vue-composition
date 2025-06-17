<script setup>
import   useStore   from "./Store"
import { computed, onMounted } from "vue"
import TodoItem from "./TodoItem.vue"

const store = useStore;

const todos = computed( () => store.state.todos)

function removeTodo(todo) {
    const index = store.state.todos.indexOf(todo)
    store.state.todos.splice(index, 1)
    store.saveToLocalstorage();
}

function toggleTodo(todo) {
    todo.isCompleted = !todo.isCompleted
    store.saveToLocalstorage()
}

onMounted(() => {
    console.log(store.state.todos);is
})
</script>

<template>
    <div>
        <h3>Your To-Do List</h3>
        <div v-if="todos.length === 0"> No Tasks found!</div>
        <TodoItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delelte="removeTodo"
            @toggle="toggleTodo"
        />
    </div>
</template>