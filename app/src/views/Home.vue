<template>
    <section class="home">
        <caravela-carousel :per-page="1" loop navigationEnabled navigationNextLabel="}" navigationPrevLabel="{">
            <caravela-slide v-for="slidePic of slidePics" :key="slidePic.url">
                <img :src="slidePic.url">
                <a v-if="slidePic.link" :href="slidePic.link" target="_blank">
                    <button class="more">Saiba mais</button>
                </a>
            </caravela-slide>
        </caravela-carousel>

        <caravela-terminal/>
        <caravela-mural/>
    </section>
</template>

<script>

import Vue from 'vue'
import Axios from 'axios'

export default Vue.extend({
    data() {
        return {
            slidePics: []
        }
    },
    methods:{
        getSlides() {
            const media = window.matchMedia('(max-aspect-ratio: 1/1)')
            if (media.matches) {
                return  [
                    {
                        id: 2,
                        url: "https://i.ibb.co/TR7XGmK/carousel4-mobile-wave.png",
                        link: "https://sympla.com.br/caravela",
                        title: "TaB #4",
                        active: true,
                        mobile: true
                    },
                    {
                        id: 4,
                        url: "https://i.ibb.co/ypfWWHh/carousel3-mobile-wave.png",
                        link: "",
                        title: "Caravela",
                        active: true,
                        mobile: true
                    }
                ]
            } else {
                return [
                    {
                        active: true,
                        id: 3,
                        link: "https://sympla.com.br/caravela",
                        mobile: false,
                        title: "TaB #5",
                        url: "https://i.ibb.co/sw5Y0Ln/carousel4-wave.png",
                    },
                    {
                        id: 1,
                        url: "https://i.ibb.co/6nJmJmt/carousel5-wave.png",
                        link: "",
                        title: "TaB #4",
                        active: true,
                        mobile: false
                    }
                ]
            }
        }
    },
    mounted() {
        this.slidePics = this.getSlides()
    
        window.addEventListener('resize', () => {
            this.slidePics = this.getSlides()
        })
    }
})

</script>
