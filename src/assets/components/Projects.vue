<template>
    <div class="container-projetos">
        <div class="projeto" v-for="projeto in projetos" :key="projeto">
            <div class="showcase">
                <div class="showcase-image"></div>
                <div class="labels">
                    <div v-for="label in projeto.labels" class="label" :key="label">
                        <div class="label" :style="'background: #' + label.color">{{label.name}}</div>
                    </div>
                </div>
            </div>
            <div class="description">
                <h2>{{projeto.title}}</h2>
                <p>{{projeto.body}}</p>
            </div>
        </div>
    </div>
</template>

<script>

const Axios = require('axios')

export default {
    data(){
        return {
            projetos: {}
        }
    },
    methods:{
        async getProjects(){
            let response = await Axios.get('https://api.github.com/repos/caravelahc/projetos/issues')
            this.projetos = []
            for (let i = 0; i < response.data.length; i++) {
                this.projetos.push(response.data[i])
            }
        },
    },
    created(){
        this.getProjects()
    }
}
</script>

<style lang="scss">
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

            .showcase{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 30%;

                .showcase-image{
                    height: 100px;
                    width: 100px;
                    border-radius: 100vw;
                    border: 2px solid #003b6f;
                }

                .labels{
                    width: 100%;
                    display: flex;
                    flex-direction: column;

                    .label{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: white;
                        padding: 10px;
                        border-radius: 6px;
                        width: 100%;
                        text-transform: capitalize;
                    }
                }
            }
        }

        div.projeto:nth-child(2n-1){
            flex-direction: row-reverse
        }
    }
</style>
