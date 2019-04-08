<template>
  <div class="about-section">
        <div class="wave-1">
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill:rgba(255,255,255,1);"></path>
            </svg>
        </div>
        <div class="wave-2">
            <svg viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
                <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style="stroke: none; fill:#003B6F;"></path>
            </svg>
        </div>
        <div class="steps">
            <div class="step-container">
                <div class="step-icon"><i class="fas fa-anchor"></i></div>
                <span class="step-title">Quem somos?</span>
            </div>
            <div class="step-container">
                <div class="step-icon"><i class="fas fa-anchor"></i></div>
                <span class="step-title">O que fazemos?</span>
            </div>
            <div class="step-container">
                <div class="step-icon"><i class="fas fa-anchor"></i></div>
                <span class="step-title">Como participar?</span>
            </div>
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

    }
  }
</script>

<style>
    svg {
        display: inline-block;
        margin-bottom: 400px
    }
    .wave-1 {
        display: inline-block;
        position: relative;
        width: 100%;
        vertical-align: middle;
        overflow: hidden;
        margin-top: -230px;
        height: 250px;
        z-index: 3;
    }
    .wave-2 {
        height: 250px;
        display: inline-block;
        position: relative;
        width: 103%;
        vertical-align: middle;
        overflow: hidden;
        margin-top: -300px;
    }
    div.steps{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    div.step-container{
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
    }
    div.step-icon{
        height: 80px;
        width: 80px;
        background: #003B6F;
        color: white;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        box-shadow: 2px 2px 2px rgba(0,0,0, 0.3);
    }
</style>