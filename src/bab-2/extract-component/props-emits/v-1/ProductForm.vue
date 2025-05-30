<script setup>
import { onMounted, reactive, ref, watch } from "vue"
const emit = defineEmits(['add-product'])
const props = defineProps({
    categories : Array,
    products : Array,
    editingProduct : Object
})
const formData = reactive({
    id : null,
    name : null,
    price : null,
    category : null,
    stock : null
})

watch(() => props.editingProduct, newVal => {
    if (newVal) {
        formData.id = newVal.id
        formData.name = newVal.name
        formData.price = newVal.price
        formData.category = newVal.category
        formData.stock = newVal.stock
    }else{
        clearForm()
    }
})

// onMounted(() => {
//     console.log("Categories : ", props.categories );
//     console.log("Products : ", props.products);
    
// })

function submitProduct(){    
    const payload = {
        id : formData.id || props.products.length + 1,
        name : formData.name.trim(),
        price : formData.price,
        category : formData.category,
        stock : formData.stock
    }
    emit('add-product',payload)
    clearForm()
}

function clearForm(){
    formData.name = null
    formData.price = null
    formData.category = null
    formData.stock = null
}
</script>

<template>
    <form @submit.prevent="submitProduct">
        <div>
            <label for="name">Product Name</label>
            <input type="text" v-model="formData.name" required placeholder="Name">
        </div>
        <div>
            <label for="price">Price</label>
            <input type="number" v-model="formData.price">
        </div>
        <div>
            <label for="category">Category</label>
            <select name="category" id="category" v-model="formData.category">
                <option value="" disabled>Select Category</option>
                <option
                 v-for="category in categories"
                 :value="category.value"
                 >
                    {{ category.label }}
                </option>
            </select>
        </div>
        <div>
            <label for="stock">Stock</label>
            <input type="number" v-model="formData.stock">
        </div>
        <button type="submit">Submit</button>
    </form>

</template>