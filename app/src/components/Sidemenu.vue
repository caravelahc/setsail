<template>
    <aside class="sidemenu-vue">
        <ul>
            <li v-for="item of items" :key="item.title">
                <router-link :to="item.url">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
    </aside>
</template>

<script lang="ts">

import Vue from 'vue'

export default Vue.extend({
    data(){
        return {
            menuState: this.$props.state
        }
    },
    props: {
        state: {
            type: Boolean,
            default: false,
            required: false,
        },
        items: {
            type: Array,
            default: [],
            required: true,
        }
    },
    methods: {
        openMenu(){
            const menu = document.querySelector('aside.sidemenu-vue') as HTMLElement
            menu.style.transform = 'translateX(0%)'
            this.$data.menuState = !this.$data.menuState
        },
        closeMenu(){
            const menu = document.querySelector('aside.sidemenu-vue') as HTMLElement
            menu.style.transform = 'translateX(-100%)'
            this.$data.menuState = !this.$data.menuState
        },
        isOpen(){
            return this.$props.state
        }
    }

})

</script>

<style lang="scss" scoped>
    aside {
        height: 100%;
        width: 60vw;
        background: #003b6f;
        transform: translateX(-100%);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 5;
        transition: .25s ease;
        padding-top: 12vh;

        ul {
            padding: 0 !important;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            list-style: none;

            li{
                width: 100%;
                padding: 30px;

                a{
                    text-decoration: none;
                    font-size: 1.6em;
                }
            }
        }
    }

    @media (min-aspect-ratio: 1/1) {
        aside.caravela-menu{
            display: none;
        }   
    }
</style>
