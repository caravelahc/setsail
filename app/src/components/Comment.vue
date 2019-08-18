<template>
    <div class="comment">
        <div class="pic">
            <img :src="comment.user.avatar_url">
        </div>
        <div class="text bubble" v-html="converter.makeHtml(comment.body)"></div>
    </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Showdown from 'showdown'

export default Vue.extend({
    data() {
        return {
            converter: new Showdown.Converter()
        }
    },
    props: {
        comment: {
            type: Object,
            default: {}
        }
    },
    mounted() {
        console.log(this)
    }
})

</script>
