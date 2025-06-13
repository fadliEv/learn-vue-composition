<script setup>
import { onMounted, useTemplateRef } from "vue"

const inputRefName = useTemplateRef("nameInput")

onMounted(() => {
    inputRefName.value.focus()
})

function addProduct(){
    localStorage.getItem("products")
}

</script>

<template>
    <h1>Product Form</h1>  
    <div>
        <form @submit.prevent="">
            <div>
                <label for="name">Name</label> : 
                <input type="text" ref="nameInput">
            </div>
            <div>
                <label for="price">Price</label>
                <input type="number" name="price" id="price">
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>  
</template>