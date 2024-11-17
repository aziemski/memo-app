import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import SeedData from './seedData'

SeedData.initialSeed()

const app = createApp(App)

app.use(router)
app.mount('#app')
