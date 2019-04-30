<template>
    <section class="mural">
        <h2>Nossa tripulação</h2>
        <div class="crew">
            <div class="member" v-for="member in crew" :key="member">
                <a :href="member.url">
                    <img :src="member.pic" alt="">
                </a>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data: ()=>{
        return {
            crew: [
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
                {url: 'https://www.google.com', pic: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Windows_live_square.JPG'},
            ]
        }
    },
    methods: {
        getCrew: async ()=>{
            let request = await fetch('http://api.caravela.club')
        }
    }
}
</script>

<style>
    section.mural{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    div.crew{
        display: flex;
        padding: 40px;
        flex-wrap: wrap;
    }

    div.member{
        width: 80px;
        height: 80px;
    }

    div.member > a{
        width: 100%;
        height: 100%;
    }

    div.member > a > img{
        filter: grayscale(100%);
        height: 100%;
        width: 100%;
        transition: .25s ease;
    }

    div.member > a > img:hover{
        filter: grayscale(0%);
    }
</style>
