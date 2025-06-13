import Home from "./Home.vue"
import ProductList from "./ProductList.vue"
import ProductForm from "./ProductForm.vue"
import ProductDetail from "./ProductDetail.vue"
import Contact from "./Contact.vue"
import { createRouter, createWebHistory } from "vue-router"

const routes = [
    {
        path : "/",
        name : "home",
        component : Home
    },
    {
        path :"/contact",
        name : "contact",
        component : Contact
    },
    {
        path :"/products",
        name : "product-list",
        component : ProductList
    },
    {
        path : "/products/add",
        name : "product-add",
        component : ProductForm
    },
    {
        path : "/products/edit/:id",
        name : "product-edit",
        component : ProductForm,
        props : true
    },
    {
        path : "/products/:id",
        name : "product-detail",
        component : ProductDetail
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router