<template>
    <nav>
        <div :style="'background: ' + this.bgColor" class="nav desktop-menu" v-if="!mobile">
            <a href="/" class="home">
                <div class="logo"><img src="http://jvm.life/storage/logo_horizontal.png"></div>
            </a>
            <a :href="item.url" :key="item" v-for="item in items" v-on:mouseover="overEffect($event)" v-on:mouseleave="leaveEffect($event)">
                <span>
                  {{item.title}}
                </span>
                <span class="progress"></span>
            </a>
        </div>
        <div :style="'background: ' + this.bgColor" class="nav mobile-menu" v-if="mobile">
            <div class="container">
                <a href="/" class="home">
                    <div class="logo"><img src="http://jvm.life/storage/logo_horizontal.png"></div>
                </a>
                <button v-on:click="toggleMenu()" class="hamburger hamburger--slider">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
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
          ],
          offsetMenu: undefined
      }
  },
  methods:{
        overEffect: ev => {
            if (ev.target.download !== undefined) {   
                let span = ev.target.querySelector('span.progress')
                span.style.width = '100%'
            }
        },
        leaveEffect: ev => {
            if (ev.target.download !== undefined) {   
                let span = ev.target.querySelector('span.progress')
                span.style.width = '0%'
            }
        },
        toggleMenu(){
            let menu = document.querySelector('div.drop-menu')
            let button = document.querySelector('button.hamburger')

            if (menu.offsetHeight > 0){
                menu.style.height = '0vw'
                button.classList.remove('is-active')
            }else{
                menu.style.height = (this.items.length * 11) + 'vw'            
                button.classList.add('is-active')
            } 
        },
        scrolling(){
            if (window.scrollY > 200) {
                if (this.mobile) {
                    document.querySelector('.nav').style.height = '20vw'
                    document.querySelector('.drop-menu').style.background = '#003b6f'
                }else{
                    document.querySelector('.nav').style.height = '6vw'
                }
                document.querySelector('.nav').style.background = '#003b6f'
            }else{
                if (this.mobile) {
                    document.querySelector('.nav').style.height = '20vw'
                    document.querySelector('.drop-menu').style.background = this.bgColor
                }else{
                    document.querySelector('.nav').style.height = '8vw'
                }
                document.querySelector('.nav').style.background = this.bgColor
            }
        }
  },
  props: {
      mobile: {
          type: Boolean,
          default: window.innerWidth < window.innerHeight
      },
      bgColor: {
          type: String,
          default: 'transparent'
      }
  },
  computed: {
      offsetMenu: function () {
          return document.querySelector('.nav').offsetTop
      }
  },
  created(){
      window.addEventListener('scroll', ()=> this.scrolling())
  }
}
</script>

<style lang="scss" scoped>

    @import './../../../node_modules/hamburgers/dist/hamburgers.css';

    div.desktop-menu{
        width: 100%;
        height: 8vw;
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        z-index: 20;
        font-family: Zilla Slab;
        font-size: 1.3em;

        a {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        a.home{
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            div.logo{
                height: 80%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        
            div.logo > img{
                height: 100%;
            }
        }

    }

    div.mobile-menu{
        width: 100%;
        height: 20vw;
        color: white;
        z-index: 20;
        font-family: Zilla Slab;
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

                .hamburger-inner, .hamburger-inner::after, .hamburger-inner::before{
                    background: white;
                }
            }

            button:focus{
                outline: none;
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

    .nav{
        position: fixed;
        top: 0;
        left: 0;
        transition: .5s ease;
    }

</style>
