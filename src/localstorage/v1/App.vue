<script setup>
import Dashboard from './components/Dashboard.vue';
import ModalConfirmation from './components/ModalConfirmation.vue';
import { ref, onMounted } from "vue"

const isAccepted = ref(false)

onMounted(() => {
    const isExist = localStorage.getItem("login","test")
    if(isExist) {
        isAccepted.value = true
    }
})

function getResponse(response){
    if (response) {
        isAccepted.value = response
        localStorage.setItem("login","test")
    }
    else {
        alert("Kudu di terima")
    }
}

function clearStorage(){
    localStorage.clear()
    isAccepted.value = false
}
</script>


<template>
    <Dashboard v-if="isAccepted" @clear="clearStorage"  />
    <ModalConfirmation @confirm="getResponse" v-else/>
</template>