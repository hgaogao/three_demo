import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
//全局异常处理
app.config.errorHandler = (err, vm, info) => {
	console.error('[全局异常]', err, vm, info)
}
