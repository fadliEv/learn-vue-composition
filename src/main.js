import { createApp } from 'vue'
import './style.css'
// import App from './App.vue'
// import App from './bab-4-router/v1/App.vue'
// import router from './bab-4-router/v1/Index'
// import App from './bab-4-router/v2/App.vue'
// import router from "./bab-4-router/v2/router"

import router from "./bab-4-router/v3/router"
import App from "./bab-4-router/v3/App.vue"

createApp(App)
    .use(router)
    .mount('#app')
