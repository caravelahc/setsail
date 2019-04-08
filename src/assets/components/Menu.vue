<template>
    <div class="nav">
        <div class="logo"><img src="../img/logo_white.png" alt=""></div>
        <a :href="item.url" v-for="item in items">{{item.title}}</a>
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

    div.logo{
        width: 30%
    }

    a{
        text-decoration: none !important;
        color: white;
    }

    a:hover{
        text-decoration: none !important;
        color: white;
    }

</style>
