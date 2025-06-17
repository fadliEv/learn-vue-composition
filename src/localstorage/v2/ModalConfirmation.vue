<script setup>
const emits = defineEmits(['confirm'])
function getConfirmation(isAccepted) {
    emits('confirm',isAccepted)
}
</script>


<template>
    <Transition name="slide-fade">
        <div class="modal-overlay">
            <div class="modal">
                <h3>Accepted the value ?</h3>
                <div class="modal-action">
                    <button @click="getConfirmation(true)">Accept</button>
                    <button @click="getConfirmation(false)">Decline</button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.modal-overlay {
    position : fixed;
    top : 0;
    bottom : 0;
    right : 0;
    left : 0;
    background : rgb(0,0,0,0.5);
    display : flex;
    justify-content : center;
    align-items : center;
}
.modal {
    background : white;
    padding : 1rem;
    width : 300px;
    border-radius : 10px;
}
.modal-action {
    display : flex;
    align-items : center;
    justify-content : flex-end;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>