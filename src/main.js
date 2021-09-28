import { createApp } from 'vue'
import App from './App.vue'
import api from './api'
import './assets/styles/Reset.css'
import './assets/styles/Normalize.css'

const APP = createApp(App)

APP.config.globalProperties.$api = {
    ...api
}

APP.mount('#app')
