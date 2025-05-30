<script setup>

import { inject } from 'vue';

const {
    message,
    counter
} = inject('state')
const {
    updateMessage,
    increment
} = inject('emits')

</script>


<template>
    <div>
        <h3>Child Component</h3>
        <p>Pesan dari Parent via Inject : {{  message }}</p>
        <button @click="() => updateMessage('Pesan diubah oleh chidlren vie Inject')">Ubah pesan</button>
        <br>
        <h3>Counter</h3>
        <p>Number : {{ counter }}</p>
        <button @click="increment">increment</button>
    </div>
    
</template>