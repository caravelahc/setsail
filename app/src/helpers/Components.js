import Vue from 'vue'

import Header from '@/components/Header.vue'
import Terminal from '@/components/TerminalFork.vue'
import Mural from '@/components/Mural.vue'
import Footer from '@/components/Footer.vue'
import Projects from '@/components/Projects.vue'
import Menu from '@/components/Menu.vue'
import Sidemenu from '@/components/Sidemenu.vue'
import Article from '@/components/Article.vue'
import ArticleList from '@/components/ArticleList.vue'
import Comments from '@/components/Comment.vue'
import Paginate from 'vue-paginate'

import { Slide } from 'vue-burger-menu'
import { Carousel, Slide as SlideCarousel } from 'vue-carousel'

Vue.component('caravela-header', Header)
Vue.component('caravela-mural', Mural)
Vue.component('caravela-footer', Footer)
Vue.component('caravela-terminal', Terminal)
Vue.component('caravela-carousel', Carousel)
Vue.component('caravela-article-list', ArticleList)
Vue.component('caravela-article-comment', Comments)
Vue.component('caravela-article', Article)
Vue.component('caravela-slide', SlideCarousel)
Vue.component('caravela-projects', Projects)
Vue.component('caravela-menu', Menu)
Vue.component('slide-menu', Slide)
Vue.component('sidemenu-vue', Sidemenu)

Vue.use(Paginate)