<script setup>
import {ref} from "vue"
const isLoggedIn = ref(false)

</script>


<template>

    <div v-if="isLoggedIn">
        Selamat datang, boss!
    </div>
    <div v-else>
        silahkan login terlebih dahulu
    </div>
    <div>
        <button @click="() => isLoggedIn = !isLoggedIn" >Change State</button>
    </div>

</template>