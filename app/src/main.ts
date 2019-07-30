import Vue from 'vue'
import '@/helpers/Components.js'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/assets/scss/app.scss'

Vue.config.productionTip = false

new Vue(
    {
        router,
        store,
        render: (h) => h(App),
    }
).$mount('#app')
