<template>
    <section class="mural">
        <h2>Nossa tripulação</h2>
        <p class="subtitle mt-5">Um navio não sai do lugar sozinho, sem nossos marujos estariamos completamente perdidos. O Caravela é um espaço construido e mantido por aqueles que amam o sentimento de participar de uma comunidade assim.</p>
        <div class="crew">
            <div class="member" v-for="member in crew" :key="member.github">
                <a :href="member.github" target="_blank">
                    <img :src="member.pic" :alt="member.name">
                </a>
            </div>
        </div>
    </section>
</template>

<script>

import Axios from 'axios'

export default {
    data() {
        return { 
            crew: []
        }
    },
    methods: {
        async getCrew() {
            const response = await Axios.get(window.api_url + '/crew')
            this.crew = []
            for (let i = 0; i < response.data.length; i++) {
                this.crew.push(response.data[i])
            }
        },
    },
    created() {
        this.getCrew(this)
    }
}
</script>