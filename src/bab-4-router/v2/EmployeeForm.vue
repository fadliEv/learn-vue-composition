<script setup>
import { onMounted, useTemplateRef, watch, ref } from "vue"

const props = defineProps({    
    isEditMode : Boolean,
    modelValue : Object
})

const emits = defineEmits(['save'])
const inputName = useTemplateRef("nameField")
const formData = ref({
    id: null,
    name : null,
    position : null,
    salary : null
})
const positions = [
    { label : "Manager", value : "Manager"},
    { label : "CEO", value : "Chief Executive Officer" },
    { label : "Business Analyst", value : "Business Analyst"}
]
function handleSubmit(){
    const objEmployee = {
        id : props.isEditMode ? formData.value.id : Date.now(),
        name : formData.value.name,
        position : formData.value.position,
        salary : formData.value.salary
    }
    emits('save',objEmployee)
}

onMounted(() => {
    inputName.value.focus()        
})

watch(() => props.modelValue, newVal => {
    if(newVal){
        console.log(newVal);
        
        formData.value = {...newVal}
    }
})

</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div>
            <label for="Name">Name</label>
            <input type="text" v-model="formData.name" ref="nameField">
        </div>
        <div>
            <label for="position">Position</label>
            <select name="position" id="position" v-model="formData.position">
                <option value="" disabled> Select Position</option>
                <option v-for="position in positions" :key="position.value" :value="position.value">
                    {{ position.label }}
                </option>
            </select>
        </div>
        <div>
            <label for="salary">Salary</label>
            <input type="number" v-model="formData.salary">
        </div>
        <button type="submit">Submit</button>
    </form>
</template>