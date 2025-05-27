<script setup>
import { onMounted, reactive, ref } from "vue"

const isEdited = ref(false)
const timer = ref(0)
let intervalId = null
const users = ref([])

const genders = ref([
    {label : "Laki-laki", value : "Laki-laki"},
    {label : "Perempuan", vale : "Perempuan"}
])

const formData = reactive({
    id : null,
    name : null,
    email : null,
    gender : null,
    address : null
})

function addUser(){
    if (isEdited.value){
        const idx = users.value.findIndex(u => u.id == formData.id)
        users.value[idx] = {...formData}
        isEdited.value = false
    }else{        
        const newUser = {
            id : users.value.length + 1, 
            name : formData.name,
            email : formData.email,
            gender : formData.gender,
            address : formData.address
        }
        console.log("Test !!! : ", newUser);        
        users.value.push(newUser)
    }
    updateLocalStorage(users.value)
    clearForm()
}

function deleteUser(id) {
    const isDelete = confirm("are u sure to delete this datda ? ")
    if (isDelete) users.value = users.value.filter(u => u.id != id)
    updateLocalStorage(users.value)
}

function editUser(id){
    const currentUser = users.value.find(u => u.id == id)
    if (currentUser){
        formData.id = currentUser.id
        formData.name = currentUser.name
        formData.email = currentUser.email
        formData.gender = currentUser.gender
        formData.address = currentUser.address
        isEdited.value = true
    }
}

function clearForm(){
    formData.name = null
    formData.email = null
    formData.gender = null
    formData.address = null
}

function initLocalstorage(){
    const storedUsers = localStorage.getItem("users")
    if(storedUsers) {
        users.value = JSON.parse(storedUsers)
    }else {
        const defaultUsers = [
            {id : 1, name : "Rifki", email : "rifki@gmail.com", gender : "Laki-laki", address : "Jakarta"},
            {id : 2, name : "Doni", email : "doni@gmail.com", gender : "Laki-laki", address : "Depok"},
            {id : 3, name : "Diana", email : "diana@gmail.com", gender : "Perempuan", address : "Semarang"},
        ]
        users.value = defaultUsers
        updateLocalStorage(defaultUsers)
    }
}

function updateLocalStorage(users){
    localStorage.setItem("users",JSON.stringify(users))
}

onMounted(() => {
    initLocalstorage()
    startTimer()
})

function startTimer(){
    clearInterval(intervalId)
    intervalId = setInterval(() => {
        timer.value++
    },1000)
}

function resetTimer(){
    clearInterval(intervalId)
    timer.value = 0
    startTimer()
}

</script>


<template>
<div class="card">
    <h2 class="title">Management User</h2>

    <form @submit.prevent="addUser" >
        <div>
            <label for="name">Name : </label>
            <input v-model="formData.name" type="text" required>
        </div>
        <div>
            <label for="email">Email : </label>
            <input v-model="formData.email" type="email" required>
        </div>
        <div>
            <label for="gender">Gender</label>
            <select v-model="formData.gender" required>
                <option value="" disabled>Select Gender</option>
                <option
                v-for="gender in genders"
                :key="gender.vale"
                :value="gender.value"
                >
                {{ gender.label }}
                </option>
            </select>
        </div>
        <div>
            <label for="address">Address</label>
            <textarea v-model="formData.address" required></textarea>
        </div>
        <button class="button">Submit</button>
    </form>
    <span>Timer {{ timer }}</span>
    <button @click="resetTimer" >Reset Timer</button>
    <ul>
        <li 
            v-for="item in users"
            :key="item.id"
            class="list-item"
        >
        <div>
            {{ item.name }} - {{ item.address }}
        </div>
        <div>
            <button class="button" @click="editUser(item.id)">
                Edit
            </button>
            <button class="button" @click="deleteUser(item.id)">
                Delete
            </button>
        </div>
        </li>
    </ul>
    <div>
        <span>Total Users : {{users.length}}</span>
    </div>
</div>
</template>


<style scoped>
.card {
    max-width: 500px;
    margin : auto;
    padding : 1rem;
    border : 1px solid #ddd;
    border-radius: 1rem;
}

.title {    
    text-align: center;
}

.list-item{
    list-style-type: none;
    border-bottom: 1px solid black;
    
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 5px;
    margin: 0 5px;
}
</style>