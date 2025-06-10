<script setup>
import Modal from "./Modal.vue"
import { ref } from "vue"

const props = defineProps({
    employees : {
        type : Array,
        default : []
    }
})

const emits = defineEmits(['deleteEmployee'])
const currentEmployee = ref(null)

const isShowModal = ref(false)

function handleDelete(){
    emits('deleteEmployee', currentEmployee.value.id)
    isShowModal.value = !isShowModal.value
}

function showModal(employee){
    isShowModal.value = !showModal.value
    currentEmployee.value = employee
}


</script>

<template>
    <div>
        <div>
            <Modal 
                :showModal="isShowModal" 
                :employee="currentEmployee"
                @cancel="() => isShowModal = !isShowModal" 
                @confirm="handleDelete"
            />
        </div>
        <ul>
            <li v-for="employee in employees" :key="employee.id">
                <span>{{ employee.name }}</span>                
                <button>
                    <RouterLink :to="'/edit/' + employee.id">Edit</RouterLink>
                </button>
                <button @click="showModal(employee)" >Delete</button>
            </li>
        </ul>
    </div>
</template>