<template>
  <section class="carousel-container">
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
      <b-carousel-slide v-if="!mobile" img-src="http://jvm.life/carousel3_wave.png" width="1024"></b-carousel-slide>
      <b-carousel-slide v-if="!mobile" img-src="http://jvm.life/carousel1_wave.png" width="1024"></b-carousel-slide>
      <b-carousel-slide v-if="!mobile" img-src="http://jvm.life/carousel2_wave.png" width="1024"></b-carousel-slide>
      <b-carousel-slide v-if="mobile" img-src="http://jvm.life/carousel3_mobile_wave.png" width="1024"></b-carousel-slide>
      <b-carousel-slide v-if="mobile" img-src="http://jvm.life/carousel1_mobile_wave.png" width="1024"></b-carousel-slide>
      <b-carousel-slide v-if="mobile" img-src="http://jvm.life/carousel2_mobile_wave.png" width="1024"></b-carousel-slide>
    </b-carousel>
  </section>
</template>

<script>
  export default {
    data: ()=> {
      return {
        slide: 0,
        sliding: null,
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    props: {
      mobile: {
        type: Boolean,
        default: window.innerWidth < window.innerHeight
      }
    }
  }
</script>

<style>
    section.carousel-container{
        width: 100%;
        z-index: -1;
    }

    .carousel-control-next,
    .carousel-control-prev{
        z-index: 5;
    }

    .carousel-control-prev-icon,
    .carousel-control-next-icon {
        height: 100px;
        background-size: 100%, 100%;
        background-image: none;
        font-family: Zilla Slab;
        font-weight: 500;
        z-index: 5;
    }
    
    .carousel-control-next-icon:after
    {
        font-size: 4em;
        content: '}';
        color: white;
    }
    
    .carousel-control-prev-icon:after {
        font-size: 4em;
        content: '{';
        color: white;
    }

    svg {
        display: inline-block;
    }

    .wave-1 {
        display: inline-block;
        position: relative;
        width: 100%;
        vertical-align: middle;
        overflow: hidden;
        height: 400px;
        top: -350px;
        z-index: 3;
    }

    div.carousel-inner:focus, .carousel:focus, .carousel-container:focus, div{
        outline: none;
    }

    @media (max-aspect-ratio: 1/1) {
        div.carousel-inner{
            height: 100vh;
        }

        div.carousel-item{
            height: 100vh;
        }

        div.carousel-item > img {
            height: 100%;
            width: auto;
        }
    }
</style>