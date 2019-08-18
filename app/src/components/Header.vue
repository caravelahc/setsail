<template>
    <header class="caravela-header">
        <div class="logo">
            <img :src="imgSrc">    
        </div>
        <div class="items">
            <router-link class="item" v-for="item of items" :key="item.tile" :to="item.url" @mouseover.native="hoverEnter($event)" @mouseleave.native="hoverLeave($event)">
                {{ item.title }}
                <span class="outter-bar">
                    <span class="inner-bar"></span>
                </span>
            </router-link>
        </div>
    </header>    
</template>

<script lang="ts">

import Vue from 'vue'

interface EvObject {
    target: HTMLSpanElement
}

export default Vue.extend({
    data() {
        return {
            scrolled: false,
        }
    },
    props:{
        imgSrc: {
            type: String,
            default: ''
        },
        bgColor: {
            type: String,
            default: '#003b6f'
        },
        scrolledColor: {
            type: String,
            default: '#003b6f'
        },
        items: {
            type: Array,
            default: [],
            required: true,
        }
    },
    mounted() {
        const header = document.querySelector('header.caravela-header') as HTMLElement
        header.style.background = this.bgColor
        if(window.scrollY > 10) {
            header.style.background = this.scrolledColor
        }
        this.attachEvents()
    },
    methods: {
        attachEvents() {
            window.addEventListener('scroll', (ev)=> {

                if(!this.$data.scrolled && window.scrollY > 10) {
                    
                    const header = document.querySelector('header.caravela-header') as HTMLElement
                    const button = document.querySelector('.hamburger') as HTMLElement

                    header.classList.add('scrolled')
                    button.classList.add('hamburger-scrolled')
                    header.style.background = this.$props.scrolledColor

                    this.$data.scrolled = true
                } else if(this.$data.scrolled && window.scrollY < 10) {
                    
                    const header = document.querySelector('header.caravela-header') as HTMLElement
                    const button = document.querySelector('.hamburger') as HTMLElement

                    header.classList.remove('scrolled')
                    button.classList.remove('hamburger-scrolled')
                    header.style.background = this.$props.bgColor
                
                    this.$data.scrolled = false
                }

            })
        },
        hoverEnter(ev: EvObject) {
            const target = ev.target.querySelector('span.inner-bar') as HTMLElement 
            target.style.width = '100%';
        },
        hoverLeave(ev: EvObject) {
            const target = ev.target.querySelector('span.inner-bar') as HTMLElement 
            target.style.width = '0%';
        }
    }
})

</script>
