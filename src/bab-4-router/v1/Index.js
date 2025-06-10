import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import About from './About.vue'
import Post from './Post.vue'

const routes = [
    { 
        path : "/", 
        component : Home ,
        name : "home"
    },
    { 
        path : "/about", 
        component : About,
        name : "about"
    },
    { 
        path : "/post/:id", 
        component : Post,
        name : "post",
        props : (route) => ({id : Number(route.params.id) })
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router