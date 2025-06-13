<script setup>
const props = defineProps({
    modelValue : {
        type : Boolean,
        default : false,
        required : true
    }
})

const emits = defineEmits(['udpate:modelValue','confirmed'])

function handleResponse(response){
    emits('update:modelValue', false)
    emits('confirmed',response)
}
</script>

<template>
    <div v-if="modelValue" class="modal-overlay">
        <div class="modal">
            <h4>Are you sure to delete this data ? </h4>
            <div class="modal-action">
                <button @click="handleResponse(false)">No</button>
                <button @click="handleResponse(true)">Yes</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top : 0;
    bottom : 0;
    right : 0;
    left : 0;
    background: rgb(0,0,0,0.5);
    display : flex;
    justify-content : center;
    align-items: center;
}
.modal-action {
    display : flex;
    justify-content : space-between;
    align-items: center;    
}
.modal {
    background: white;
    padding : 1rem;
    border-radius: 9px;
}
</style>