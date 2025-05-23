<script setup>
import {reactive} from "vue"
    const form = reactive({
        name : '',
        email : ''
    })
</script>


<template>
    <div>
        <div>
            <label for="name">Name : </label>
            <input v-model="form.name" placeholder="name">
        </div>
        <div>
            <label for="email">Email : </label>
            <input v-model="form.email" placeholder="email">
        </div>
        <p>Nama : {{ form.name }}</p>
        <p>Email : {{ form.email }}</p>
    </div>
</template>