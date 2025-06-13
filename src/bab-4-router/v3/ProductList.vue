<script setup>
import { ref, onMounted } from "vue"
import  Modal  from "./Modal.vue"

// state 
const products = ref([])
const isShowModal = ref(false)
const currentProduct = ref()

// lifecycle
onMounted(() => {
    initLocalStorage()
})

// localstorage
function initLocalStorage(){    
    const isExistProducts = localStorage.getItem("products")    
    if (isExistProducts){
        products.value = JSON.parse(isExistProducts)
    }else{
        const defaultData = [
            { id : 1, name : "Keyboard", price : 100000},
            { id : 2, name : "Mouse", price : 20000},
            { id : 3, name : "Hardisk", price : 200000}
        ]    
        products.value = defaultData
        setUpLocalStorage()
    }
}

function setUpLocalStorage(){
    localStorage.setItem("products", JSON.stringify(products.value))
}


// service
function confirmDelete(product){
    isShowModal.value = true
    currentProduct.value = product
}

function handleDeleteConfirmation(isDeleted){
    isShowModal.value = false
    if(isDeleted) {
        products.value = products.value.filter(p => p.id !== currentProduct.value.id)
    }
    setUpLocalStorage()
}

function addProduct(newProduct){
    products.value.push(newProduct)
    setUpLocalStorage()
}
</script>

<template>
    <div>
        <h1>Product List</h1>
        <button>
            <RouterLink to="/products/add">Add Product</RouterLink>
        </button>
        <ul>
            <li v-for="product in products" :key="product.id">
                {{ product.name }}
                <button>Edit</button>
                <button @click="confirmDelete(product)">Remove</button>
                <button>Detail</button>
            </li>
        </ul>
        <footer>
            <h4>Total : {{ products.length }}</h4>            
        </footer>
        <Modal 
            v-model="isShowModal"
            @confirmed="handleDeleteConfirmation"
        />
    </div>
</template>