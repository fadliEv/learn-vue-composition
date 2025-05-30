<script setup>
import { provide, ref } from "vue"
import ChildComponent from "./ChildComponent.vue"

const message = ref("Halo ini pesan dari parent !!")
const counter = ref(0)
function updateMessage(newMsg){
    message.value = newMsg
}
function increment(){
    counter.value++
}

provide('state', {
    message,
    counter
})
provide('emits', {
    updateMessage,
    increment
})

</script>


<template>
    <h3>Ini Dari Parent Component</h3>
    <ChildComponent/>
</template>