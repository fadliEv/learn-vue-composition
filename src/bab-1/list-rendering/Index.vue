<script setup>

import { ref, reactive } from "vue"

const users = ref([
    {id : 1, name : "Udin"},
    {id : 2, name : "Resa"}
])

const formData = reactive({
    name : "PT Hunian",
    address : "Pondok labu",
    author : "KH Dewantara"
})

const newUser = ref("")

function addNewUser(){
    if (newUser.value.length > 5){
        const newId = users.value.length + 1 
        users.value.push({ id : newId, name : newUser.value})
        newUser.value = ""
    }else {
        alert("Masukan Minimal 5 Karakter")
    }
}

function removeUser(userId){
    users.value = users.value.filter(user => user.id != userId)
}
</script>


<template>
    <div>
        <label for="name">Name : </label>
        <input type="text" v-model="newUser" placeholder="Name">
        <button v-on:click="addNewUser">Tambah</button>
    </div>
    <!-- <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.name }}
            <button v-on:click="removeUser(user.id)">Hapus</button>
        </li>
    </ul> -->
    <div v-for="user in users" class="containt-value" :key="user.id">
        <div>{{ user.id }}</div>
        <div class="name-label">{{ user.name }}</div>
        <button v-on:click="removeUser(user.id)">Remove</button>
    </div>
    <br>
    <h4>Test</h4>
    <ul>
        <li v-for="(v,k) in formData">
            {{ k }} : {{ v }}
        </li>
    </ul>
</template>


<style scoped>
.containt-value {
    /* height: 50px;
    width: 150px; */
    display: flex;
    background-color: aquamarine;
    padding: 5px;
    /* justify-content: center; */
    align-items: center;
    margin-top : 10px;
    border-radius: 10px;
}
.name-label {
    font-size: 20px;
    margin: 0 40px;
}
</style>