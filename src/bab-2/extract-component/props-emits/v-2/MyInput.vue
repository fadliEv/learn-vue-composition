<script setup>
import { defineProps, watch, ref, defineEmits } from "vue"

const props = defineProps({
    data : {
        type : String,
        default : ''
    },
    maxLengthValid : {
        type : Number,
        default : 20
    }, 
    placeholder : {
        type : String,
        default : "Input Here"
    }
})

const emits = defineEmits(['update:data', 'submit'])

const internalValue = ref(props.data)

watch(() => props.data, newVal => {
    internalValue.value = newVal
})

function onInput(e){
    internalValue.value = e.target.value
    emits('update:data', e.target.value)
}

function onEnter(){
    console.log("Internal Value : ", internalValue.value);
    
    emits('submit', internalValue.value)
}

</script>

<template>
    <input
        :placeholder="placeholder"
        :maxlength="maxLengthValid"
        :value="internalValue"
        @input="onInput"
        @keyup.enter="onEnter"
    />
    <button @click="onEnter">Submit</button>
</template>