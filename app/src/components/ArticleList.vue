<template>
    <div class="article-list">
        <div class="loading" v-if="loading">
            <img src="./../assets/img/loading-boat.gif">
            <h2>Carregando</h2>
        </div>
        <paginate name="articles" :per="9" :list="articles" class="articles">
            <router-link v-if="!loading" v-for="article in paginated('articles')" :key="article.url" :to="'/article/' + article.id">
                <article>
                    <div class="cover">
                        <img :src="article.cover || caravela.cover">
                    </div>
                    <div class="title"> {{ article.content.substring(0, article.content.indexOf('=')) }} </div>
                </article>
            </router-link>
        </paginate>
        <paginate-links :show-step-links="true" :async="true" for="articles"></paginate-links>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Axios from 'axios'

interface ArticleListData {
    articles: [
        {
            id: number,
            content: string,
            sha: string,
            name: string,
            cover: string,
            created_at: string,
            updated_at: string,
        }
    ],
    caravela: {
        cover: string
    },
    loading: boolean,
    sorry: boolean,
    paginate: string[]
}

export default Vue.extend({
    data() {
        const auxData: ArticleListData = {
            articles: [
                {
                    id: 0,
                    content: '',
                    sha: '',
                    name: '',
                    cover: '',
                    created_at: '',
                    updated_at: '',
                }
            ],
            caravela: {
                cover: ''
            },
            loading: false,
            sorry: false,
            paginate: ['articles']
        } 
        return auxData
    },
    methods: {
        async getArticles() {
            try {
                this.loading = true
                const request = await Axios.get('http://localhost:3000/posts')
                this.articles = await request.data
                
                for (const article of this.articles) {
                    article.content = atob(article.content)
                }

                this.loading = false
                this.sorry = false
            } catch (error) {
                this.loading = true
                this.sorry = true
                setTimeout(this.getArticles, 3000)
            }
        }
    },
    mounted() {
        this.getArticles()
    }
})

</script>
