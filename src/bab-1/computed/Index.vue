<script setup>
import { reactive, computed } from "vue"

 const formData = reactive({
    firstName : "",
    lastName : ""
 })

 const fullName = computed(() => {
    return `${formData.firstName} ${formData.lastName}`
 })

</script>

<template>
    <div>
        <label for="firstNam">Firstname</label>
        <input type="text" v-model="formData.firstName" placeholder="Firstname">
    </div>
    <div>
        <label for="lastName">LastName</label>
        <input type="text" v-model="formData.lastName" placeholder="LastName">
    </div>
    <p>Nama Lengkap : {{ fullName }}</p>
</template>