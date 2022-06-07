import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "element-plus/dist/index.css";
import { createPinia } from 'pinia'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
