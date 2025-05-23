<script setup>
import {ref, reactive, computed} from "vue"


// Item state
const users = ref([
    {id : 1, name : "Doni", email : "doni@gmail.com", gender : "Laki-laki", address : "jakarta"},
    {id : 2, name : "Siti", email : "reza@gmail.com", gender : "Perempuan", address : "Depok"},
    {id : 3, name : "Riki", email : "riki@gmail.com", gender : "Laki-laki", address : "Bogor"},
])

const genderOptions = ref([
    {value : "Laki-laki", label : "Laki-laki"},
    {value : "Perempuan", label : "Perempuan"}
])

const formData = reactive({
    id : 0,
    name : "",
    email : "",
    gender : "",
    address : ""
})

const isLoading = ref(false)

const search = ref("")
const showList = ref(true)
const isEdit = ref(false)


function addUser() {
    if (!formData.name.trim() || !formData.email.trim()) {
        alert("Data Tidak boleh kosong")
        return
    }
    isLoading.value = true
    setTimeout(() => {      
        const newUser = {
                id : users.value.length + 1,
                name : formData.name,
                email : formData.email,
                gender : formData.gender,
                address : formData.address
            }  
        console.log(isEdit);
        
        if (!isEdit.value){
            console.log("Test");
            console.log("User : ", newUser)
            users.value.push(newUser)
            
        }else{
            const idx = users.value.findIndex(u => u.id === formData.id)
            users.value[idx] = newUser
            isEdit.value = false
        }
        isLoading.value = false
        clearForm()
    }, 2000);
}



function removeUser(id) {
    users.value = users.value.filter( u => u.id !== id)
}


const filteredUser = computed(() => {
    return users.value.filter(user => {
        return user.name.toLowerCase().includes(search.value.toLowerCase()) ||
        user.email.toLowerCase().includes(search.value.toLowerCase())
    })
})

function clearForm(){
    formData.name = ""
    formData.email = ""    
    formData.gender = ""
    formData.address = ""
}

function filledForm(user){
    formData.id = user.id
    formData.name = user.name
    formData.email = user.email
    formData.gender = user.gender
    formData.address = user.address
    isEdit.value = true
    console.log(users.value);
    
}

</script>


<template>
    <div class="card">
        <h2>Management User</h2>

        <form @submit.prevent="addUser">
            <button @click="clearForm"  >Clear Form</button>
            <input type="text" v-model="formData.name" placeholder="Name" required>
            <input type="text" v-model="formData.email" placeholder="Email" required>
            <select v-model="formData.gender">
                <option disabled value="">Pilih jenis kelamin</option>
                <option v-for="option in genderOptions" :key="option.value" :value="option.value">
                        {{ option.label }}
                </option>
            </select>
            <input v-model="formData.address" placeholder="Alamat" required/>
            <button type="submit">Submit</button>
        </form>


        <hr>
        <div v-if="isLoading">
            <p>Loading dulu boss...</p>
        </div>
        <div v-else>
            <input type="text" v-model="search" placeholder="Cari Data">

            <button @click="() => showList = !showList"  >
                {{ showList ? "sembunyikan" : "tampilkan"}}
            </button>

            <ul v-if="showList">
                <li v-for="user in filteredUser">
                    {{ user.name }} - {{ user.email }}
                    <button @click="removeUser(user.id)">Delete</button>
                    <button @click="filledForm(user)">Edit</button>
                </li>
            </ul>
        </div>
   
</div>
</template> 

<style scoped>
.card {
    max-width: 500px;
    margin: auto;
    padding : 1rem;
    border : 1px solid #ccc;
    border-radius: 1rem;
}

input, select {
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
    padding: 0.5rem;
    box-sizing: border-box;
}

button {
    margin : 0.25rem 0;
}
li {
    margin-bottom: 1rem;
}
</style>

