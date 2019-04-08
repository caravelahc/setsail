<template>
  <div class="carousel-container">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >

      <b-carousel-slide img-src="src/assets/img/bg2.jpg" width="1024"></b-carousel-slide>

      <b-carousel-slide img-src="src/assets/img/bg2.jpg" width="1024"></b-carousel-slide>

    </b-carousel>
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
    background: rgba(0, 59, 111, 0.4);
    z-index: -1;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
      height: 100px;
      /* width: 100px;
      outline: black; */
      background-size: 100%, 100%;
      background-image: none;
      font-family: Zilla Slab;
      font-weight: 500;
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
</style>