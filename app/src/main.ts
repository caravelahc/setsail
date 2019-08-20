import Vue from 'vue'
import '@/helpers/Components.js'
import App from './App.vue'
import router from './router'
import '@/assets/scss/app.scss'
import Config from './../config.json'

declare global {
    interface Window {
        api_url: string
    }
}

window.api_url = Config.api_url
Vue.config.productionTip = false

new Vue(
    {
        router,
        render: (h) => h(App),
    }
).$mount('#app')
