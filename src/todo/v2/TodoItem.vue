<script setup>
const props = defineProps({
    todo : Object
})
const emits = defineEmits(['delete','toggle'])

function toggleCompleted(){
    emits('toggle', props.todo)
}
function deleteTodo(){
    emits('delete',props.todo)
}
</script>

<template>
    <div class="todo-item">
        <input type="checkbox" :checked="todo.isCompleted" @change="toggleCompleted">
        <span :class="{completed : todo.isCompleted}">{{ todo.name }}</span>
        <button @click="deleteTodo" >Delete</button>
    </div>
</template>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    margin : 5px 0;
}
.todo-item .completed {
    text-decoration: line-through;
}

button {
    margin-left: 10px;
}
</style>