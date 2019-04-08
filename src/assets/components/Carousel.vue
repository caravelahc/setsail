<template>
  <div class="carousel-container">
    <b-carousel id="carousel-1" v-model="slide" :interval="4000" controls indicators style="text-shadow: 1px 1px 2px #333;" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
      <b-carousel-slide img-src="src/assets/img/bg2.jpg" width="1024"></b-carousel-slide>
      <b-carousel-slide img-src="src/assets/img/carousel1.png" width="1024"></b-carousel-slide>
      <b-carousel-slide img-src="src/assets/img/carousel2.png" width="1024"></b-carousel-slide>
    </b-carousel>
    <div class="wave-1">
        <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill:rgba(255,255,255,1);"></path>
        </svg>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        slide: 0,
        sliding: null
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    }
  }
</script>

<style>
  div.carousel-container{
    width: 100%;
    height: 40vw;
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
</style>