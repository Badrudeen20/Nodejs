/* import './assets/main.css'
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './compositions/App.vue'
import router from './compositions/router'


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
