<script setup>
</script>

<template>
    <div id="app">
        <nav>
            <RouterLink to="/"> Home </RouterLink> | 
            <RouterLink to="/about"> About </RouterLink>
        </nav>
        <RouterView></RouterView>
    </div>
</template>

