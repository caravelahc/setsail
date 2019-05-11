import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"

// Components
import Carousel from './assets/components/Carousel.vue'
import Menu from './assets/components/Menu.vue'
import About from './assets/components/About.vue'
import Terminal from './assets/components/Terminal.vue'
import Mural from './assets/components/Mural.vue'

import Swal from 'sweetalert2'
window.Swal = Swal

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

Vue.use(BootstrapVue)
Vue.component('vue-terminal', Terminal)

new Vue({
  el: '#carousel-showcase',
  render: h => h(Carousel)
})

new Vue({
  el: '#menu-desktop',
  render: h => h(Menu)
})

new Vue({
  el: '#about',
  render: h => h(About)
})

new Vue({
  el: '#mural',
  render: h => h(Mural)
})