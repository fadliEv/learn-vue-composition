<script setup>
import { ref } from "vue"

const username = ref('')
const password = ref('')
const isLoggedIn = ref(false)

function login() {
    if (username.value === "admin" && password.value === "123") {
        isLoggedIn.value = true
    }else {
        alert('login gagal')
    }
} 
</script>

<template>

    <div>
        <input v-model="username" placeholder="Username"/>
        <input v-model="password" placeholder="Password">
        <button @click="login">Login</button>

        <p v-if="isLoggedIn"> Hallo, {{ username }}</p>
        <p v-else>Silahkan login terlebih dahulu</p>
    </div>

</template>