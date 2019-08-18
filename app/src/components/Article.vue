<template>
    <article class="blog-article">
        <div class="cover" :style="'background: url(' + article.cover + ')'">
            <h1> {{ article.name.replace(/-/g, ' ').replace(/.md/g, '') }} </h1>
        </div>
        <section class="text" v-html="article.content"></section>
        <!-- <section class="comments">
            <h2>O que os outros tão falando?</h2>
            <caravela-article-comment v-for="comment in comments" :key="comment.id" :comment="comment"></caravela-article-comment>
        </section> -->
    </article>    
</template>

<script lang="ts">

import Vue from 'vue'
import Axios from 'axios'
import Showdown from 'showdown'
const Converter = new Showdown.Converter()

export default Vue.extend({
    data() {
        return {
            article: {},
            comments: []
        }
    },
    methods: {
        async getArticle() {
            const articleId = this.$route.params.id
            const request = await Axios.get('http://localhost:3000/posts/' + articleId)
            request.data = request.data[0]
            request.data.content = this.b64DecodeUnicode(request.data.content)
            request.data.content = Converter.makeHtml(request.data.content)
            this.article = request.data
            console.log(this.article)
        },
        async getComments() {
            const articleId = this.$route.params.id
            const request = await Axios.get('https://api.github.com/gists/' + articleId + '/comments')
            this.comments = request.data
        },
        b64DecodeUnicode(str: string) {
            return decodeURIComponent(atob(str).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    },
    created() {
        this.getArticle()
        this.getComments()
    }
})

</script>
