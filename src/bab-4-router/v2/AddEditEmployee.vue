<script setup>

import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import EmployeeForm from './EmployeeForm.vue';

const props = defineProps({
    id : String
})

const router = useRouter()

const employee = ref({
    id : null,
    name : null,
    position : null,
    salary: null
})
const isEditMode = ref(false)

onMounted(() => {  
  if (props.id) {
      isEditMode.value = true
      const employees = JSON.parse(localStorage.getItem('employees'))
      const employeeData = employees.find( e => e.id === Number(props.id))
      if (employeeData) {        
        employee.value = {...employeeData}
    }
  }
})

function saveEmployee(newEmployee){
    console.log("New ", newEmployee);
    
    let employees = JSON.parse(localStorage.getItem("employees")) || []   
    if (isEditMode.value){
        employees = employees.map(e => {
            if (e.id === newEmployee.id){
                return newEmployee
            }
            return e
        })        
    }else {        
        employees.push(newEmployee)
    }
    localStorage.setItem("employees",JSON.stringify(employees))
    console.log(employees);
    
    router.push('/')
}
</script>

<template>
    <div>
        <h2>Ini halaman form</h2>
        <EmployeeForm @save="saveEmployee" v-model="employee" :isEditMode="isEditMode"/>
    </div>
</template>