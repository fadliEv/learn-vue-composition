<script setup>
import { ref, computed, onMounted } from "vue"
const props = defineProps({
    projects : {
        type : Array,
        default : []
    }
})


const emits = defineEmits(['edit'])
const keyword = ref("")

const filteredItems = computed(()=> {
    return props.projects.filter(val => {
        return val.name.toLowerCase().includes(keyword.value.toLowerCase()) || 
            val.status.toLowerCase().includes(keyword.value.toLowerCase()) || 
            val.client.toLowerCase().includes(keyword.value.toLowerCase()) 
    })
})

onMounted(() => {
    console.log("Filtered Items : ", filteredItems);
    
})

function onEdit(project){
    emits("edit",project)
}

</script>


<template>
    <div>
        <input v-model="keyword" class="search" type="text" placeholder="Search by name, client, status...">
    </div>
    <table border="1" cellpadding="8" cellspacing="0" style="width: 100%;">
        <thead> 
            <tr>
                <th>No</th>
                <th>Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(project, idx) in filteredItems" :key="project.id">
                <td>{{ idx + 1 }}</td>
                <td>{{ project.name}}</td>
                <td>{{ project.client }}</td>                
                <td>{{ project.status }}</td>
                <td>{{ project.budget }}</td>                
                <td>
                    <button @click="onEdit(project)" >Edit</button>
                    <button>Delete</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style>
td {
    text-align: center;
}
button {
    margin : 3px;
}
.search{
    width : 97%;
    padding : 9px;
    margin-bottom: 1rem;
    border-radius: 5px;
}
</style>