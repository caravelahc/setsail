<template>
    <div class="container-projetos">
        <div class="loading" v-if="loading">
            <img src="../img/loading-boat.gif">
        </div>
        <div class="projeto" v-for="projeto in projetos" :key="projeto">
            <div class="showcase">
                <div class="showcase-image">
                    <img :src="projeto.user.avatar_url">
                </div>
            </div>
            <div class="description">
                <h2>{{projeto.title}}</h2>
                <div class="labels">
                    <div v-for="label in projeto.labels" class="label" :key="label">
                        <div class="label-title" :style="'background: #' + label.color">{{label.name}}</div>
                    </div>
                </div>
                <p v-html="projeto.body"></p>
            </div>
        </div>
    </div>
</template>

<script>

const Axios = require('axios')
const Showdown  = require('showdown')
const Converter = new Showdown.Converter()

export default {
    data(){
        return {
            projetos: {},
            loading: false
        }
    },
    methods:{
        async getProjects(){
            this.loading = true
            let response = await Axios.get('https://api.github.com/repos/caravelahc/projetos/issues')
            this.projetos = []
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].body = Converter.makeHtml(response.data[i].body)
                this.projetos.push(response.data[i])
            }
            this.loading = false
        },
    },
    created(){
        this.getProjects()
    }
}
</script>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    div.container-projetos{
        
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding: 40px;
        padding-top: 200px;

        div.projeto{
            width: 100%;
            display: flex;
            margin-bottom: 50px;
            padding: 40px;

            @media (max-aspect-ratio: 1/1) {
                flex-direction: column !important;
                padding: 0;
            }
            
            * {
                margin-bottom: 15px;
            }
            
            .showcase{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 30%;

                @media (max-aspect-ratio: 1/1) {
                    width: 100%;
                }

                .showcase-image{

                    height: 10vw;
                    width: 10vw;
                    border-radius: 100vw;
                    border: 2px solid #003b6f;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;

                    @media (max-aspect-ratio: 1/1) {
                        width: 80vw;
                        height: 80vw;
                    }

                    img{
                        width: 100%;
                        height: auto;
                        margin: 0 !important;
                    }
                }
            }
        }

        div.description{
            width: 70%;

            .labels{
                width: 100%;
                display: flex;

                .label{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: capitalize;
                    margin-right: 10px;

                    @media (max-aspect-ratio: 1/1) {
                        flex-wrap: wrap;
                    }

                    .label-title{
                        border-radius: 6px;
                        padding: 10px;
                        color: white;
                    }
                }
            }
        }

        div.projeto:nth-child(2n-1){
            flex-direction: row-reverse
        }
    }
</style>
