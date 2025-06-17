<script setup>
import { ref, onMounted } from "vue"
import Dashboard from "../v1/components/Dashboard.vue"
import ModalConfirmation from "./ModalConfirmation.vue"

const isAccepted = ref(false)
onMounted(() => {
    const isExist = localStorage.getItem("login")
    if(isExist) {
        isAccepted.value = true
    }
})
function getResponse(response){
    if(response) {
        localStorage.setItem("login","test")
        isAccepted.value = true
    }else{
        alert("you have to accept")
    }
}
function clearLocalStorage(){
    localStorage.clear()
    isAccepted.value = false
}
</script>

<template>
    <Dashboard v-if="isAccepted" @clear="clearLocalStorage"/>
    <ModalConfirmation v-else @confirm="getResponse"/>
</template>