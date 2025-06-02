<script setup>
const items = [ 
    {id : 1, name : "apple"},
    {id : 2, name : "Banana"}
]
</script>

<template>
    <ul>
        <li v-for="item in items" :key="item.id">
            <slot :item="item">
                {{ item.name }}
            </slot>
        </li>
    </ul>
</template>