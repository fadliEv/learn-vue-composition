<script setup>
const props = defineProps({
    modelValue : {
        type : Boolean,
        default : false,
        required : true
    }    
})

const emits = defineEmits(['update:modelValue', 'confirmed'])

function handleResponse(response){
    emits('update:modelValue',false)
    emits('confirmed',response)
}
</script>

<template>
    <Transition name="slide-fade">
    
        <div v-if="modelValue" class="modal-overlay">
            <div class="modal">
                <h4>Are u sure to delete this data ?</h4>
                <div class="modal-action">
                    <button @click="handleResponse(false)">No</button>
                    <button @click="handleResponse(true)">Yes</button>
                </div>
            </div>
        </div>
    </Transition>    
</template>

<style scoped>che
.modal-overlay {
    position : fixed;
    top : 0;
    bottom : 0;
    right : 0;
    left : 0;
    background: rgb(0,0,0,0.5);
    display: flex;
    justify-content : center;
    align-items : center;
}

.modal-action {
    display : flex;
    justify-content : space-between;
    align-items : center;
}
.modal {
    background : white;
    padding : 1rem;
    border-radius : 9px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>