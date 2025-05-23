<script setup>
import {ref, useShadowRoot} from "vue"
const items = ref(
    [ 
        {id : 1, name : 'Doni'},
        {id : 2, name : 'Ronald'}

    ]
)

function addItem() {
    const newId = items.value.length + 1
    items.value.push({id : newId, name : `Test-${newId}`})
}

</script>


<template>
    <ul>
        <li v-for="item in items">{{ item.name }}</li>
    </ul>
    <button v-on:click="addItem">Tamba Data</button>
</template>