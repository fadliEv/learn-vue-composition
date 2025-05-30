<script setup>
import { reactive, watch } from "vue"

const emits = defineEmits(["save"])
const props = defineProps({
    modelValue : {
        type : Object,
        defult : null
    }
})

const formData = reactive({
    id : null,
    name : null,
    client : null,
    status : null,
    budget : null
})

const statusOptions = ["Planned", "Ongoing", "Completed", "Cancelled"]

function resetForm() {
    formData.id = null
    formData.name = null
    formData.client = null
    formData.status = null
    formData.budget = null
}

function onSubmit(){
    emits("save", {...formData})
}

watch(() => props.modelValue, newVal => {
    if (newVal) {
        Object.assign(formData,newVal)
    }else{
        resetForm()
    }
})

</script>


<template>
    <form @submit.prevent="onSubmit" class="form" action="">
        <h4>{{  formData.id ? "Update" : "Add" }} Project</h4>
        <label for="name">
            Name : 
            <input type="text" v-model="formData.name" placeholder="Name" required>
        </label>
        <label for="client">
            Client : 
            <input type="text" v-model="formData.client" placeholder="Client" required>
        </label>
        <label for="status">
            Status : 
            <select name="status" id="status" v-model="formData.status" required >
                <option value="" selected  disabled>Select Status</option>
                <option v-for="status in statusOptions" :value="status" >{{ status }}</option>
            </select>
        </label>
        <label for="budget">
            Budget : 
            <input type="number" v-model="formData.budget" min="0" required>
        </label>
        <button v-if="formData.id">Cancel</button>
        <button type="submit">{{ formData.id ? "Update" : "Submit"}}</button>
    </form>
</template>


<style scoped>
.form {
    border : 1px solid #ccc;
    padding : 1rem;
    margin-bottom : 1rem;
    border-radius: 8px;
    background: #f9f9f9;
}
label {
    display: block;
    margin-bottom : 0.5 rem;
}
input, select {
    width: 100%;
    padding : 0.3rem;
    margin-top :0.2rem;
    box-sizing: border-box;
}
button { 
    margin-top : 1rem;
    padding : 0.5rem 1rem;
}
</style>