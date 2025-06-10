<script setup>
</script>

<template>
    <div id="app">
        <h1>Management Employee</h1>
        <nav>
            <RouterLink to="/">List Employee</RouterLink> |
            <RouterLink to="/add">Add Employee</RouterLink>
        </nav>
        <RouterView></RouterView>
    </div>
</template>
