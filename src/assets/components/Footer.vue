<template>
    <footer>
        <div class="social container">
            <a target="_blank" href="https://github.com/caravelahc/"><span><i class="fab fa-github"></i></span></a>
            <a target="_blank" href="https://www.facebook.com/caravelahc/"><span><i class="fab fa-facebook"></i></span></a>
            <a target="_blank" href="https://t.me/caravelahc"><span><i class="fab fa-telegram"></i></span></a>
            <a target="_blank" href="https://chat.caravela.club/"><span><i class="fab fa-rocketchat"></i></span></a>
            <span class="easter_egg"><i class="fas fa-ghost" v-on:click="createGame()"></i></span>
        </div>
        <div class="game">
            <div class="logo">
                <img src="../img/logo_white.png" alt="">
            </div>
            <div class="quote">
                {{getQuote()}}
            </div>
        </div>
    </footer>
</template>

<script>
    import Pacman from '../js/Pacman.sketch'
    export default {
        data(){
            return {
                cu: ''
            }
        },
        methods:{
            createGame(){
                document.querySelector('div.game').innerHTML = ''
                const game = new p5(Pacman)
            },
            getQuote(){
                return '"The free sharing and teaching of open source is incompatible with the notion of the solitary genius."'
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background: #003b6f;

        div.social{
            width: 30%;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            height: 80px;
            color: white;
            font-size: 2.5em;

            span{
                transition: .2s ease-in-out;
            }

            span:hover{
                transform: scale(1.1)
            }
        }

        div.game{
            height: 250px;
            background: #00203b;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            color: white;
            font-family: Zilla Slab;

            div.quote{
                font-size: 1.7em;
            }

            canvas{
                position: absolute;
                top: 0;
                left: 0;
            }
        }
    }

    span.easter_egg:hover{
        color: #00203b;
    }

    button.primary{
        padding: 10px;
        background: #003b6f;
        color: white;
        border: none;
        border-radius: 5px;
        border-bottom: 5px solid #0e0e3a;
    }
</style>
