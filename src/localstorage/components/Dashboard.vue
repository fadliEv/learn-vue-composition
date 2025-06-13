<script setup>
const emits = defineEmits(['clear'])
function clearData(){
    emits('clear')
}
</script>


<template>
    <h1>Dashboard</h1>
    <button @click="clearData">Clear Localstorage</button>
</template>