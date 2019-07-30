<template>
    <section class="home">
        <caravela-menu></caravela-menu>
        
        <caravela-carousel :per-page="1" loop navigationEnabled navigationNextLabel="}" navigationPrevLabel="{">
            <caravela-slide v-for="slidePic of slidePics" :key="slidePic.url">
                <img :src="slidePic.url">
            </caravela-slide>
        </caravela-carousel>

        <caravela-terminal/>
        <caravela-mural/>
        <caravela-footer/>
    </section>
</template>

<script>

import Vue from 'vue'

export default Vue.extend({
    data() {
        return {
            slidePics: [
                { url: './img/carousel1_wave.png' },
                { url: './img/carousel2_wave.png' },
                { url: './img/carousel3_wave.png' },
            ]
        }
    },
    methods:{},
})

</script>
