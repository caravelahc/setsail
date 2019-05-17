<template>
    <footer>
        <div class="social container">
            <span><i class="fab fa-github"></i></span>
            <span><i class="fab fa-facebook"></i></span>
            <span><i class="fab fa-telegram"></i></span>
        </div>
        <div class="game">
            <button class="primary" v-on:click="createGame()">Jogar joguinhos</button>
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
                const game = new p5(Pacman)
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
            background: #000000;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            canvas{
                position: absolute;
                top: 0;
                left: 0;
            }
        }
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
