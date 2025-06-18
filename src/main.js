import { createApp } from 'vue'
import './style.less'
import '../style/font/iconfont.less'
import App from './App.vue'
import router from './router/router'

createApp(App).use(router).mount('#app')
