<script setup>

import { computed, ref } from "vue"

const users = ref([
    {id : 1, name : "Doni"},
    {id : 2, name : "sena"},
    {id : 3, name : "xjon"},
    {id : 4, name : "been"},
])

const filterText = ref('')
const filteredUsers = computed(() => users.value.filter(user => {
    return user.name.toLowerCase().includes(filterText.value.toLowerCase())
}))

</script>


<template>
    <div>
        <label for="Cari">Cari : </label>
        <input type="text" v-model="filterText" placeholder="Caru user">
    </div>
    <!-- <div>
        <ul>
            <li v-for="user in users">{{ user.name }}</li>
        </ul>
    </div> -->
    <div>
        <ul>
            <li v-for="user in filteredUsers">{{ user.name }}</li>
        </ul>
    </div>
</template>