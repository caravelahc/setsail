<template>
    <section class="mural">
        <h2>Nossa tripulação</h2>
        <p class="subtitle mt-5">Um navio não sai do lugar sozinho, sem nossos marujos estariamos completamente perdidos. O Caravela é um espaço construido e mantido por aqueles que amam o sentimento de participar de uma comunidade assim.</p>
        <div class="crew">
            <div class="member" v-for="member in crew" :key="member">
                <a :href="member.github" target="_blank">
                    <img :src="member.pic" :alt="member.name">
                </a>
            </div>
        </div>
    </section>
</template>

<script>

const Axios = require('axios')

export default {
    data(){
        return { 
            crew: []
        }
    },
    methods: {
        async getCrew(){
            let response = await Axios.get('http://jvm.life:3000/crew')
            this.crew = []
            for (let i = 0; i < response.data.length; i++) {
                this.crew.push(response.data[i])
            }
        },
    },
    created(){
        this.getCrew(this)
    }
}
</script>

<style lang='scss'>

    @mixin flex-wrap-fix($flex-basis, $max-viewport-width: 2000px) {
        flex-grow: 1;
        flex-basis: $flex-basis;
        max-width: 100%;

        $multiplier: 1;
        $current-width: 0px;

        @while $current-width < $max-viewport-width {
            $current-width: $current-width + $flex-basis;
            $multiplier: $multiplier + 1;

            @media(min-width: $flex-basis * $multiplier) {
                max-width: percentage(1/$multiplier);
            }
        }
    }

    section.mural{

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        p.subtitle{
            text-align: justify;
            width: 50%;
            @media (max-aspect-ratio: 1/1) {
                width: 90%;
            }
        }
        
        div.crew{
        
            display: flex;
            padding: 40px 0;
            flex-wrap: wrap;

            @media (max-aspect-ratio: 1/1) {
                padding: 40px 0;
            }

            div.member{
                flex-grow: 1;
                width: 80px;
                height: auto;
                @include flex-wrap-fix(90px);

                @media (max-aspect-ratio: 1/1) {
                    width: 25%;
                    height: auto;
                }
            
                a{
            
                    width: 100%;
                    height: 100%;

                    img{

                        filter: grayscale(100%);
                        height: 100%;
                        width: 100%;
                        transition: .25s ease;     
                    
                    }

                    img:hover{
                        filter: grayscale(0%)
                    }
                }
            }
        }

        div.container{
            button.join{
                padding: 10px;
                background: #003b6f;
                color: white;
                border: none;
                border-radius: 5px;
                border-bottom: 5px solid #0e0e3a;
            }
        }
    }
</style>
