<template>
    <aside class="caravela-menu">
        <sidemenu-vue ref="menu" :items="items"></sidemenu-vue>
                
        <button class="hamburger hamburger--spin" type="button" v-on:click="toggleMenu()">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>

        <caravela-header :imgSrc="'./../img/logo_horizontal.png'" :items="items" :bgColor="backgroundColor"></caravela-header>
    </aside>
</template>

<script>

import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            state: false,
            items: [
                { title: 'Início', url: '/', icon: 'fas fa-project-diagram' },
                { title: 'Projetos', url: '/projetos', icon: 'fas fa-project-diagram' },
                { title: 'Blog', url: '/blog', icon: 'fas fa-newspaper' },
            ],
            backgroundColor: this.$props.bgColor
        }
    },
    methods: {
        toggleMenu() {
            const hamburger = document.querySelector('.hamburger')
            if(this.state) {
                this.$refs.menu.closeMenu()
                hamburger.classList.remove('is-active')
                this.state = !this.state
            } else {
                this.$refs.menu.openMenu()
                hamburger.classList.add('is-active')
                this.state = !this.state
            }
        }
    },
    props: {
        bgColor: {
            type: String,
            default: 'transparent'
        },
        scrolledColor: {
            type: String,
            default: '#003b6f'
        }
    }
})

</script>
