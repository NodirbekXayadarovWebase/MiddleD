import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from '@/App.vue'
import { logger } from '@/plugins/pinia/logger'
import { persist } from '@/plugins/pinia/persist'
import router from '@/router'
import '@/style.css'

const pinia = createPinia()

pinia.use(persist)
pinia.use(logger)

createApp(App).use(pinia).use(router).mount('#app')
