<script setup>
import { ref } from "vue"
import TodoList from './TodoList.vue'

const todos = ref([
    {id : 1, text : "Belajar VueJS", isCompleted : true},
    {id : 2, text : "Bermain", isCompleted : false},
    {id : 3, text : "Tidur", isCompleted : true}
])

const newTodo = ref("")

function updateTodoStatus(item, checked) {
    const confirmChange = confirm(`Apakah Anda yakin ingin mengubah status "${item.text}" menjadi ${checked ? 'Selesai' : 'Belum selesai'}?`)
    if (confirmChange) {
        item.isCompleted = checked
    }
}

</script>


<template>
    <div class="container">
        <h2>Todo App dengan Slot</h2>
        <TodoList :items="todos">
            <template #default="{item}">
                    <span :style="{textDecoration : item.isCompleted ? 'line-through' : 'none'}">{{ item.text }}</span>
                    <input type="checkbox" @change="e => updateTodoStatus(item,e.target.checked)" v-model="item.isCompleted">
                    <button>Delete</button>
            </template>
        </TodoList>
    </div>
</template>