<template>
    <section class="mural">
        <h2>Nossa tripulação</h2>
        <p class="subtitle mt-5">Um navio não sai do lugar sozinho, sem nossos marujos estariamos completamente perdidos. O Caravela é um espaço construido e mantido por aqueles que amam o sentimento de participar de uma comunidade assim.</p>
        <div class="crew">
            <div class="member" v-for="member in crew" :key="member">
                <a :href="member.github" target="_blank">
                    <img :src="member.pic" :alt="member.name">
                </a>
            </div>
        </div>
        <div class="container d-flex justify-content-center py-5">
            <button v-on:click="join" class="join">
                Junte-se!
            </button>
        </div>
    </section>
</template>

<script>

const Axios = require('axios')

export default {
    data(){
        return { 
            crew: []
        }
    },
    methods: {
        async getCrew(){
            let response = await Axios.get('http://jvm.life:3000/crew')
            this.crew = []
            for (let i = 0; i < response.data.length; i++) {
                this.crew.push(response.data[i])
            }
        },
        async join(){
            Swal.fire(
                {
                    title: 'Qual seu usuário no Github?',
                    input: 'text',
                    inputAttributes: {
                        autocapitalize: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Ahoy!',
                    cancelButtonText: 'Not ahoy!',
                    showLoaderOnConfirm: true,
                    preConfirm: (login) => {
                        return fetch(`//api.github.com/users/${login}`).then(
                            response => {
                                if (!response.ok) {
                                    throw new Error(response.statusText)
                                }
                                return response.json()
                            }
                        )
                        .catch(
                            error => {
                                Swal.showValidationMessage(`Deu ruim: ${error}`)
                            }
                        )
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then(
                    (result) => {
                        if (result.value) {
                            Swal.fire({
                                title: `É você ai?`,
                                imageUrl: result.value.avatar_url,
                                showCancelButton: true,
                                confirmButtonText: 'Ahoy!',
                                cancelButtonText: 'Not ahoy!',
                                showLoaderOnConfirm: true,
                                preConfirm: () =>{
                                    // Campos precisam estar em ordem, isso precisa de um fix futuramente
                                    return Axios.post('http://jvm.life:3000/crew',
                                        {
                                            name: result.value.login,
                                            github: result.value.html_url,
                                            pic: result.value.avatar_url,
                                            description: result.value.bio
                                        }
                                    )
                                }
                            }).then(
                                (result)=>{
                                    this.getCrew()
                                    if (result.value !== undefined) {
                                        Swal.fire({
                                            title: "Bem vindo ao Caravela!",
                                            type: "success"
                                        })
                                    }else{
                                        Swal.fire({
                                            title: ":(",
                                            imageUrl: 'src/assets/img/toobad.jpg'
                                        })
                                    }
                                }
                            )
                        }
                    }
                )
        }
    },
    created(){
        this.getCrew(this)
    }
}
</script>

<style lang='scss'>

    section.mural{

        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        p.subtitle{
            text-align: justify;
            width: 50%;
        }
        
        div.crew{
        
            display: flex;
            padding: 40px;
            flex-wrap: wrap;

            @media (max-aspect-ratio: 1/1) {
                padding: 40px 0;
            }

            div.member{
                width: 80px;
                height: 80px;
                
                @media (max-aspect-ratio: 1/1) {
                    width: 25%;
                    height: auto;
                }
            
                a{
            
                    width: 100%;
                    height: 100%;

                    img{

                        filter: grayscale(100%);
                        height: 100%;
                        width: 100%;
                        transition: .25s ease;     
                    
                    }

                    img:hover{
                        filter: grayscale(0%)
                    }
                }
            }
        }

        div.container{
            button.join{
                padding: 10px;
                background: #003b6f;
                color: white;
                border: none;
                border-radius: 5px;
                border-bottom: 5px solid #0e0e3a;
            }
        }
    }
</style>
