<template>
  <div class="about-section">
        <div class="steps">
            <div class="step-container" v-for="step, index in steps" v-on:click="stepState($event)" :data-id="index">
                <div class="step-icon"><i :class="step.icon"></i></div>
                <span class="step-title">{{step.title}}</span>
            </div>
        </div>
        <div class="about">
        </div>
  </div>
</template>

<script>
  export default {
    
    data() {
        return {
            current: 0,
            steps: [
                {icon: "fas fa-terminal", title:"Quem somos?"},
                {icon: "fas fa-microchip", title:"O que fazemos?"},
                {icon: "fas fa-door-open ", title:"Como participar?"}
            ]
        }
    },
    
    methods: {
      stepState: ev => {
        this.a.data().current = ev.target.parentElement.dataset.id
      }
    },
    
    mounted: ()=>{
        console.log(this.a.data())
    }
  }
</script>

<style>
    div.steps{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        font-family: Ubuntu;
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
    div.about{
        width: 70%;
        margin: auto;
    }
    @media (max-aspect-ratio: 1/1) {
        div.about{
            width: 100%;
        }      
    }

</style>