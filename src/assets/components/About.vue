<template>
  <div class="about-section">
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