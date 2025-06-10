<script setup>
const props = defineProps({
    id : Number
})
</script>

<template>
    <div>
        <h2>Detail Artikel - {{ id }} </h2>
        <p>ini adalah artikel dengan ID : {{ id }}</p>
    </div>
</template>