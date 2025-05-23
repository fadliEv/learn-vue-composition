<script setup>
import { ref } from "vue"
const counter = ref(0)

function increment(){
    counter.value++
}

function decrement(){
    counter.value--
}

</script>


<template>
    <button v-on:click="increment" class="button">Minuss</button>
    <span class="counter-value">{{ counter }}</span>
    <button v-on:click="decrement" class="button">Plus</button>
</template> 


<style scoped>
.button{
    padding: 10px;
    background-color: brown;
    color: white;
    border-radius: 7px;
    border: none;
}
.counter-value {
    font-weight: bold;
    font-size: 25px;
    margin: 0 10px;
}
</style>