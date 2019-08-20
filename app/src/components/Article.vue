<template>
    <article class="blog-article">
        <div class="cover" :style="'background: url(' + article.cover + ')'">
            <h1> {{ article.name }} </h1>
        </div>
        <section class="text" v-html="article.content"></section>
    </article>    
</template>

<script lang="ts">

import Vue from 'vue'
import Axios from 'axios'
import Showdown from 'showdown'
const Converter = new Showdown.Converter()

interface ArticleData {
    article: {
        name: string,
        content: string,
        cover: string
    }
}

export default Vue.extend({
    data() {
        return {
            article: {
                name: '',
                content: '',
                cover: ''
            },
        }
    },
    methods: {
        async getArticle() {
            const articleId = this.$route.params.id
            const request = await Axios.get(window.api_url + '/posts/' + articleId)
            request.data = request.data[0]
            request.data.content = this.b64DecodeUnicode(request.data.content)
            request.data.content = Converter.makeHtml(request.data.content)
            this.article = request.data
            this.article.name = this.article.name.replace(/-/g, ' ').replace(/.md/g, '')
        },
        b64DecodeUnicode(str: string) {
            return decodeURIComponent(atob(str).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    },
    created() {
        this.getArticle()
    }
})

</script>
