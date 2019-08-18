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
            <div class="logo mb-5">
                <img :src="'./img/logo_white.png'">
            </div>
            <div class="quote">
                {{getQuote()}}
            </div>
        </div>
    </footer>
</template>

<script>
    import p5 from 'p5'
    import Pacman from '@/assets/js/Pacman.sketch'
    export default {
        data() {
            return {}
        },
        methods:{
            createGame() {
                document.querySelector('div.game').innerHTML = ''
                const game = new p5(Pacman)
            },
            getQuote() {
                return '"The free sharing and teaching of open source is incompatible with the notion of the solitary genius."'
            }
        }
    }
</script>