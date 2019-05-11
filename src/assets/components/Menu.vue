<template>
    <nav>
        <div class="nav desktop-menu" v-if="!mobile">
            <div class="logo"><img src="../img/logo_horizontal.png" alt=""></div>
            <a :href="item.url" :key="item" v-for="item in items" v-on:mouseover="overEffect($event)" v-on:mouseleave="leaveEffect($event)">
                <span>
                  {{item.title}}
                </span>
                <span class="progress"></span>
            </a>
        </div>
        <div class="nav mobile-menu" v-if="mobile">
            <div class="container">
                <div class="logo"><img src="../img/logo_horizontal.png" alt=""></div>
                <button v-on:click="toggleMenu()"><i class="fas fa-bars"></i></button>
            </div>
            
            <div class="drop-menu">
                <a :href="item.url" :key="item" v-for="item in items" v-on:mouseover="overEffect($event)" v-on:mouseleave="leaveEffect($event)">
                    <span>
                      {{item.title}}
                    </span>
                    <span class="progress"></span>
                </a>
            </div>
        </div>
    </nav>
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
      },
      toggleMenu(){
            let menu = document.querySelector('div.drop-menu')
            console.log(this.items)      
            if (menu.offsetHeight > 0) {
                menu.style.height = '0vw'
            }else{
                menu.style.height = (this.items.length * 10) + 'vw'
            }
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

<style lang="scss">

    div.desktop-menu{
        width: 100%;
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

        a {
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
    }

    div.mobile-menu{
        width: 100%;
        height: 20vw;
        color: white;
        z-index: 20;
        font-family: Zilla Slab;
        position: absolute;
        top: 0;
        left: 0;
        display: block;

        div.drop-menu{
            height: 0vw;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
            overflow: hidden;
            transition: .25s ease;

            a{
                font-size: 1.4em;
            }
        }

        div.container{
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            height: 100%;

            div.logo{
                width: 60%;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 90%
                }
            }

            button{
                width: 25%;
                height: 80%;
                background: transparent;
                border: none;
                color: white;
                font-size: 1.5em;
                border-radius: 3px;
            }
        }
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
