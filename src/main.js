import Vue from 'vue'

// Boostratp Vue register
import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue)

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "./assets/css/main.css"

import p5 from 'p5'
import Swal from 'sweetalert2'
window.p5 = p5
window.Swal = Swal

// Homebrew components
import Carousel from './assets/components/Carousel.vue'
import Menu from './assets/components/Menu.vue'
import About from './assets/components/About.vue'
import Terminal from './assets/components/Terminal.vue'
import Mural from './assets/components/Mural.vue'
import Footer from './assets/components/Footer.vue'
import Projects from './assets/components/Projects.vue'
import MainProjetos from './assets/components/MainProjetos.vue'
import Main from './assets/components/Main.vue'

Vue.component('vue-carousel', Carousel)
Vue.component('vue-menu', Menu)
Vue.component('vue-footer', Footer)
Vue.component('vue-about', About)
Vue.component('vue-mural', Mural)
Vue.component('vue-terminal', Terminal)
Vue.component('vue-projects', Projects)

new Vue({
  el: 'div.main',
  render: h => h(Main)
})

new Vue({
  el: 'div.projetos',
  render: h => h(MainProjetos)
})