<template>
    <div class="nav">
        <div class="logo"><img src="../img/logo_horizontal.png" alt=""></div>
        <a :href="item.url" v-for="item in items" v-on:mouseover="overEffect($event)" v-on:mouseleave="leaveEffect($event)">
          <span>
            {{item.title}}
          </span>
          <span class="progress"></span>
        </a>
    </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      items: [
        {title: "Projetos", url: "/projetos"},
        {title: "Eventos", url: "/eventos"},
        {title: "Sobre nós", url: "/sobre"},
        {title: "Contato", url: "/contato"},
      ]
    }
  },
  methods:{
    overEffect: ev => {
      let span = ev.target.parentElement.querySelector('span.progress')
      console.log(span)
      span.style.width = '100%'
    },
    leaveEffect: ev => {
      let span = ev.target.parentElement.querySelector('span.progress')
      console.log(span)
      span.style.width = '0%'
    }
  }
}
</script>

<style lang="scss">
    div.nav{
        width: 100vw;
        height: 8vw;
        color: white;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        z-index: 20;
        font-family: Zilla Slab;
        font-size: 1.3em;
        position: absolute;
        top: 0;
        left: 0;
    }

    div.nav > a{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    div.logo{
        width: 30%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    div.logo > img{
      width: 60%
    }

    a{
        text-decoration: none !important;
        color: white;
    }

    a:hover{
        text-decoration: none !important;
        color: white;
    }

    span.progress{
      transition: .25s ease;
      width: 0%;
      height: 2px;
      margin-top: 5px;
      background: #fff;
    }

</style>
