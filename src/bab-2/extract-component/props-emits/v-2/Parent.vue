<script setup>
import { ref } from "vue"
import MyInput from "./MyInput.vue";
const value = ref('')

function onSubmit(data){
    alert(`Submitted : ${data}`)
}
</script>

<template>
    <MyInput
        v-model:data="value"
        :maxLengthValid="10"
        placeholder="Type something..."
        @submit="onSubmit"        
    />
    <p>Value Dari Parent : {{ value }}</p>
</template>