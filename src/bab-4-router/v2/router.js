import Home from "./Home.vue"
import AddEditEmployee from "./AddEditEmployee.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    { 
        path : "/", 
        name : "home", 
        component : Home
    },
    {
        path : "/add",
        name : "add-employee",
        component : AddEditEmployee,        
    },
    {
        path : "/edit/:id",
        name : "edit-employee",
        component : AddEditEmployee,
        props : true
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router