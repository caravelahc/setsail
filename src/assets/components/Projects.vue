<template>
    <div class="container-projetos">
        
        <div v-html="readme" class="readme"></div>

        <div class="search-container">
            <div v-if="!loading" class="search-bar">
                <div class="input-group">
                    <input :id="'search'" type="text" placeholder="Procure por um projeto" v-on:input="search($event)">
                    <label for="search"><i class="fas fa-search"></i></label>
                </div>
                <button v-on:click="filter($event)" class="tags-buttons" :data-id="label.id" v-for="label in labels" :key="label" :style="'background: #' + label.color">
                    {{label.name}}
                </button>
            </div>
        </div>

        <div class="loading" v-if="loading">
            <img src="../img/loading-boat.gif">
            <h2>Carregando</h2>
        </div>

        <div class="sorry" v-if="sorry">
            <img src="../img/404.png">
        </div>

        <div class="projeto" v-for="projeto in projetos" v-if="projeto.status">
            <div class="showcase">
                <div class="showcase-image">
                    <a target="_blank" :href="projeto.assignee.html_url">
                        <img :src="projeto.assignee.avatar_url">
                    </a>
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

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

export default {
    data(){
        return {
            projetos: [],
            loading: false,
            labels: [],
            activeLabels: [],
            readme: '',
            sorry: false
        }
    },
    methods:{
        async getProjects(){
            this.loading = true
            let response = await Axios.get('https://api.github.com/repos/caravelahc/projetos/issues')
            this.projetos = []
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].body = Converter.makeHtml(response.data[i].body)
                response.data[i].status = true

                if (response.data[i].assignee == null){
                    response.data[i].assignee = {}
                    response.data[i].assignee.avatar_url = ''
                }
                
                for (const label of response.data[i].labels) {
                    let aux = 0
                    for (const l of this.labels) {
                        if (l.name == label.name) {
                            aux ++
                        }
                    }
                    if (aux == 0){
                        label.id = this.labels.length
                        label.status = true
                        this.labels.push(label)
                    } 
                }
                this.projetos.push(response.data[i])
            }
            this.loading = false
        },
        filter(ev){
            if (this.labels[ev.target.dataset.id].status) {
                this.labels[ev.target.dataset.id].status = !this.labels[ev.target.dataset.id].status
                ev.target.style.filter = 'grayscale(1)'
            }else{
                this.labels[ev.target.dataset.id].status = !this.labels[ev.target.dataset.id].status
                ev.target.style.filter = 'grayscale(0)'
            }

            for(let i = 0; i < this.projetos.length; i++){
                let aux = 0
                
                this.activeLabels = this.labels.filter((label)=> label.status)

                for(let j = 0; j < this.projetos[i].labels.length; j++){
                    
                    for(let k = 0; k < this.activeLabels.length; k++){
                        if(this.projetos[i].labels[j].name == this.activeLabels[k].name) aux++
                    }
                }
                if (aux == 0) this.projetos[i].status = false
                else this.projetos[i].status = true
            }
        },
        search(ev){
            let searchWord = ev.target.value
            let projetos = 0
            for(let i = 0; i < this.projetos.length; i++){
                if (this.projetos[i].title.toUpperCase().includes(searchWord.toUpperCase())) {
                    projetos++
                    this.projetos[i].status = true
                } 
                else this.projetos[i].status = false
            }
            if (projetos == 0) {
                this.sorry = true
            }else{
                this.sorry = false
            }
        },
        async getReadme(){
            let request = await Axios.get("https://api.github.com/repos/caravelahc/projetos/readme")
            this.readme = await Converter.makeHtml(b64DecodeUnicode(request.data.content))
        }
    },
    created(){
        this.getProjects()
        this.getReadme()
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
        padding-top: 8vw;

        @media (max-aspect-ratio: 1/1) {
            padding-top: 20vw;
        }

        div.projeto{
            width: 100%;
            display: flex;
            margin-bottom: 50px;
            padding: 40px;

            @media (max-aspect-ratio: 1/1) {
                flex-direction: column !important;
            }
            
            * {
                margin-bottom: 15px;
            }
            
            .showcase{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 20%;

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

            @media (max-aspect-ratio: 1/1){
                width: 100%;
            }

            .labels{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                
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

        .loading{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            @media (max-aspect-ratio: 1/1){
                width: 80%;
            }
        }

        div.search-container{
            
            width: 100%;
            background-image: url(../img/topbanner.png);
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            background-position: center;
            padding: 100px;

            @media (max-aspect-ratio: 1/1){
                padding: 30px;
            }

            div.search-bar{
                display: flex;
                align-items: center;
                justify-content: space-around;
                flex-direction: row;
                width: 50%;

                @media (max-aspect-ratio: 1/1){
                    width: 90%;
                    flex-direction: column;
                }

                div.input-group{

                    flex-wrap: nowrap;

                    @media (max-aspect-ratio: 1/1){
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin-bottom: 5px;
                    }

                    input{
                        padding: 10px;
                        border: 2px solid #fff;
                        border-top-left-radius: 8px;
                        border-bottom-left-radius: 8px;
                        border-right: none;
                        background: transparent;
                        color: white;

                        @media (max-aspect-ratio: 1/1) {
                            width: 80%;
                        }
                    }

                    ::placeholder{
                        color: white;
                    }

                    input:focus{
                        outline: none;
                    }

                    label{
                        padding: 10px;
                        border: 2px solid #fff;
                        color: #fff;
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                        border-left: none;
                        margin-bottom: 0;

                        
                        @media (max-aspect-ratio: 1/1) {
                            width: 20%;
                        }
                    }
                }

                .tags-buttons{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-transform: capitalize;
                    margin-right: 10px;
                    border-radius: 6px;
                    padding: 10px;
                    color: white;
                    cursor: pointer;
                    transition: .25s ease;
                    border: none;

                    @media (max-aspect-ratio: 1/1) {
                        margin-bottom: 5px;
                        margin-right: 0px;
                        width: 100%;
                    }
                }
            }
        }
    }

    div.readme{
        padding: 40px;
        h2, h3{
            margin-top: 40px;
        }
    }

    div.sorry{
        padding: 30px;

        img{
            width: 20vw;
            height: auto;
        }
    }
</style>
