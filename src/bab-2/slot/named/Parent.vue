<script setup>
import MyLayout from './MyLayout.vue';
</script>


<template>
    <MyLayout>
        <template #header>
            <h1>Header dari parent</h1>
        </template>
        <p>Kontent Utama</p>
        <template #footer>
            <p>Footer Dari Parent</p>
        </template>
    </MyLayout>
</template>