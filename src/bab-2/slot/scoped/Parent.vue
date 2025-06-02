<script setup>
import ItemList from './ItemList.vue';
</script>

<template>
    <ItemList #default="{ item }">
        <!-- <template > -->
                <strong>{{ item.name.toUpperCase() }}</strong>
        <!-- </template> -->
    </ItemList>
</template>