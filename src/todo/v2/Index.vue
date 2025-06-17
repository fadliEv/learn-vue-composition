<script setup>
import TodoList from './TodoList.vue';
import { ref, watch, computed } from "vue"
import useStore from './Store';

const store = useStore
const newTodo = ref('')
const theme = computed(() => store.state.theme)

function toggleTheme(){
    store.state.theme = store.state.theme === "light" ? "dark" : "light"
    store.saveToLocalstorage()
}

function addTodo(){
    if (newTodo.value.trim() === "") return;
    const payload = {
        id : Date.now(),
        name : newTodo.value,
        isCompleted : false
    }

    store.state.todos.push(payload)
    newTodo.value = ""
    store.saveToLocalstorage()
}

watch( 
    () => store.state.todos,
    () => {
        console.log("Todos Updated");
        store.saveToLocalstorage()
    }
)
</script>

<template>
    <div :class="theme">
        <header>
            <button @click="toggleTheme">Toggle theme</button>
        </header>
        <div>
            <input type="text" v-model="newTodo" @keyup.enter="addTodo">
            <TodoList/>
        </div>
    </div>
</template>

<style scoped>
.light {
    background-color: white;
    color : black
}
.dark {
    background-color : black;
    color : white;
}

header {
    display : flex;
    justify-content : space-between;
    padding : 10px;
}

input {
    margin : 10px 0;
    padding : 10px;
    border : 1px solid #ccc;
    border-radius : 4px;
}

button {
    padding : 5px 10px;
    cursor : pointer;
}
</style>