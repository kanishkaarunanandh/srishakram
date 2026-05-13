import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { registerPlugins } from '@/plugins'
import { startBackendKeepAlive } from '@/utils/keepAlive'

const app = createApp(App)

registerPlugins(app)
app.use(router)  
app.mount('#app')

startBackendKeepAlive()
