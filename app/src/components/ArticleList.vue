<template>
    <div class="article-list">
        <router-link v-for="article in articles" :key="article.url" :to="'/article/' + article.id">
            <article>
                <div class="cover">
                    <img :src="article.cover || caravela.cover">
                </div>
                <div class="title"> {{ article.content.substring(0, article.content.indexOf('=')) }} </div>
            </article>
        </router-link>
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
    }
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
            }
        } 
        return auxData
    },
    methods: {
        async getArticles() {
            const request = await Axios.get('http://localhost:3000/posts')
            this.articles = await request.data
            for (const article of this.articles) {
                article.content = atob(article.content)
            }
        }
    },
    mounted() {
        this.getArticles()
    }
})

</script>
