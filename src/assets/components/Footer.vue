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
    import Pac from '../js/Pac.js'
    export default {
        data(){
            return {
                cu: ''
            }
        },
        methods:{
            createGame(){
                const sketch = (p)=>{
                    let pac = new Pac(20, p)
                    p.setup = function(){
                        let canvasContent = document.querySelector('div.game')
                        let elt = p.createCanvas(canvasContent.offsetWidth, canvasContent.offsetHeight)
                        canvasContent.childNodes.forEach(child => {
                            child.remove()
                        })
                        canvasContent.appendChild(elt.canvas)
                    }
    
                    p.draw = function(){
                        p.clear()
                        p.background(255)
                        pac.show()
                    }
    
                }
    
                const game = new p5(sketch)
            }
        },
        created(){
            // this.createGame()
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
