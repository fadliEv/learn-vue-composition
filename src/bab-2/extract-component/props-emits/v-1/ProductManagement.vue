<script setup>
import { ref } from "vue"
import ProductForm from "./ProductForm.vue";
import ProductList from "./ProductList.vue";

const products = ref([
    {id : 1, name : "Laptop", price : 12000000, stock : 50, category : "Electronic"},
    {id : 2, name : "Smartphone",price : 2500000, stock : 10, category : "Fashion"}
])

const productCategory = ref([
    { label : "Electronic", value : "Electronic"},
    { label : "Fashion", value : "Fashion"}
])

const editingProduct = ref(null)

function addProduct(newProduct){
    if(editingProduct){
        const idx = products.value.findIndex(product => product.id === editingProduct.value.id)
        console.log("Idx ", idx);
        
        console.log("New Product : ", newProduct);
        
        if (idx != -1) products.value[idx] = {...newProduct}
    }else{
        products.value.push(newProduct)
    }
}

function deleteProduct(id){
    const isConfirmed = confirm("are u sure to delete this data ??")
    if (isConfirmed) {
        products.value = products.value.filter(p => p.id !== id)
    }
}

function startEditingProduct(product) {
    editingProduct.value = {...product}
}
</script>


<template>
    <h2>Product Management</h2>
    <ProductForm 
        :products="products" 
        :categories="productCategory"
        :editing-product="editingProduct"
        @add-product="addProduct" 
        
        />
    <ProductList 
        :products="products"
        @edit-product="startEditingProduct"
        @delete-product="deleteProduct"
    />
</template>