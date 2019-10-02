<template>
    <div class="container-projetos">
        
        <div v-html="readme" class="readme"></div>

        <div class="search-container">
            <div v-if="!loading" class="search-bar">
                <div class="input-group">
                    <input :id="'search'" type="text" placeholder="Procure por um projeto" v-on:input="search($event)">
                </div>
                <button v-on:click="filter($event)" class="tags-buttons" :data-id="label.id" v-for="label in labels" :key="label.name" :style="'background: #' + label.color">
                    {{label.name}}
                </button>
            </div>
        </div>

        <div class="loading" v-if="loading">
            <img src="./../assets/img/loading-boat.gif">
            <h2>Carregando</h2>
        </div>

        <paginate name="projects" :per="5" :list="projetos" class="projects">
            <div class="projeto" v-for="projeto in paginated('projects')" :key="projeto.name" v-if="projeto.status">
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
                        <div v-for="label in projeto.labels" class="label" :key="label.name">
                            <div class="label-title" :style="'background: #' + label.color">{{label.name}}</div>
                        </div>
                    </div>
                    <p v-html="projeto.body"></p>
                </div>
            </div>
        </paginate>
        <paginate-links :show-step-links="true" :async="true" for="projects" @change="paginateChange()"></paginate-links>
    </div>
</template>

<script>

import Axios from 'axios'
import Showdown from 'showdown'
const Converter = new Showdown.Converter()

const b64DecodeUnicode = (str) => {
    return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

export default {
    data() {
        return {
            projetos: [],
            loading: false,
            labels: [],
            activeLabels: [],
            readme: '',
            sorry: false,
            paginate: ['projects']
        }
    },
    methods:{
        async getProjects() {
            this.loading = true
            const response = await Axios.get('https://api.github.com/repos/caravelahc/projetos/issues')
            this.projetos = []
            for (let i = 0; i < response.data.length; i++) {
                response.data[i].body = Converter.makeHtml(response.data[i].body)
                response.data[i].status = true

                if (response.data[i].assignee == null) {
                    response.data[i].assignee = {}
                    response.data[i].assignee.avatar_url = './../img/icon.png'
                }
                
                for (const label of response.data[i].labels) {
                    let aux = 0
                    for (const l of this.labels) {
                        if (l.name === label.name) {
                            aux ++
                        }
                    }
                    if (aux === 0) {
                        label.id = this.labels.length
                        label.status = true
                        this.labels.push(label)
                    } 
                }
                this.projetos.push(response.data[i])
            }
            this.loading = false
        },
        filter(ev) {
            if (this.labels[ev.target.dataset.id].status) {
                this.labels[ev.target.dataset.id].status = !this.labels[ev.target.dataset.id].status
                ev.target.style.filter = 'grayscale(1)'
            } else {
                this.labels[ev.target.dataset.id].status = !this.labels[ev.target.dataset.id].status
                ev.target.style.filter = 'grayscale(0)'
            }

            for(let i = 0; i < this.projetos.length; i++) {
                let aux = 0
                
                this.activeLabels = this.labels.filter((label)=> label.status)

                for(let j = 0; j < this.projetos[i].labels.length; j++) {
                    
                    for(let k = 0; k < this.activeLabels.length; k++) {
                        if (this.projetos[i].labels[j].name === this.activeLabels[k].name) {
                            aux++
                        }
                    }
                }
                if (aux === 0) {
                    this.projetos[i].status = false
                } else {
                    this.projetos[i].status = true
                }
            }
        },
        search(ev) {
            const searchWord = ev.target.value
            let projetos = 0
            for(let i = 0; i < this.projetos.length; i++) {
                if (this.projetos[i].title.toUpperCase().includes(searchWord.toUpperCase())) {
                    projetos++
                    this.projetos[i].status = true
                } else {
                    this.projetos[i].status = false
                }
            }
            if (projetos === 0) {
                this.sorry = true
            } else {
                this.sorry = false
            }
        },
        async getReadme() {
            const request = await Axios.get("https://api.github.com/repos/caravelahc/projetos/readme")
            this.readme = await Converter.makeHtml(b64DecodeUnicode(request.data.content))
        },
        paginateChange() {
            const el = document.querySelector('ul.projects')
            window.scrollTo(0, el.offsetTop - 100)
        }
    },
    created() {
        this.getProjects()
        this.getReadme()
    }
}
</script>