<script setup>
const props = defineProps({
    products : Array
})
const emits = defineEmits(['edit-product','delete-product'])

function onEdit(product){
    emits('edit-product',product)
}

function onDelete(id){
    emits('delete-product',id)
}
</script>


<template>
    <table border="1">
        <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Action</td>
        </tr>
        <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.category }}</td>
            <td>
                <button @click="onEdit(product)">Edit</button>
                <button @click="onDelete(product.id)">delete</button>
            </td>
        </tr>
    </table>

</template>


<style scoped>
td {
    padding : 10px;
}
</style>