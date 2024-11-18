import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import SeedData from './seedData'

if (localStorage.getItem('app_version') !== __APP_VERSION__) {
  localStorage.clear()
  localStorage.setItem('app_version', __APP_VERSION__)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)
app.use(pinia)
app.use(router)

SeedData.initialSeed()

app.mount('#app')
