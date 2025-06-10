<script setup>
import EmployeeList from './EmployeeList.vue';
import { ref, onMounted } from "vue"

const employees = ref([])

function initLocalStorage(){
    if(localStorage.getItem("employees")){
        employees.value = JSON.parse(localStorage.getItem("employees"))
    }else{
        const defaultEmployees = [
            { id : 1, name : "Jhon Doe", position : "Manager", salary : 1000},
            { id : 2, name : "Rudi", position : "Bussines Analyst", salary : 2000}
        ]
        employees.value = defaultEmployees
        refreshLs()
    }
}

function refreshLs(){
    localStorage.setItem("employees", JSON.stringify(employees.value))
}

onMounted(() => {
    initLocalStorage()
})

function deleteEmployee(id){
    employees.value = employees.value.filter( e => e.id != id)
    refreshLs()
}
</script>

<template>
    <div>
        <h2>Daftar Employee</h2>
        <p>Total Karyawan {{  employees.length }}</p>
        <EmployeeList :employees="employees" @deleteEmployee="deleteEmployee"/>
    </div>
</template>