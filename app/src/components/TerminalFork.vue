<template>
    <section class="about">
        <div class="steps">
            <div class="step-container" v-bind:key="step.tile" v-for="step in steps" v-on:click="openFile(step.command)" :data-id="step.id">
                <div class="step-icon"><i :class="step.icon"></i></div>
                <span class="step-title">{{step.title}}</span>
            </div>
        </div>
        <vue-terminal ref="term" :showHelpMessage="false" :showInitialCd="false" :title="'caravela-hc'" :greeting="''" :prompt="'[ user@caravela-hc $ /]'" :task-list="taskList" :command-list="commandList" style="margin:0 auto"></vue-terminal>
    </section>    
</template>

<script>

import Vue from 'vue'
import Terminal from './Terminal'

Vue.component('vue-terminal', Terminal)

function generateTime() {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const seconds = timeNow.getSeconds();
    let timeString = '' + hours;
    timeString += (minutes < 10 ? ':0' : ':') + minutes;
    timeString += (seconds < 10 ? ':0' : ':') + seconds;
    return timeString
}

const mockData = [
    { 
        time: generateTime(),
        type: 'system',
        label: 'System',
        message: 'Bem vindo ao Caravela, um espaço colaborativo independente dentro da UFSC!' 
    }
]

export default Vue.extend({
    data() {
        return {
            current: 0,
            steps: [
                {id: 1, icon: "fas fa-terminal", title:"Quem somos?", command:'quemsomos.txt'},
                {id: 2, icon: "fas fa-microchip", title:"O que fazemos?", command: 'oquefazemos.txt'},
                {id: 3, icon: "fas fa-door-open ", title:"Como participar?", command: 'join.txt'}
            ],
            taskList: {
                cat:{
                    description: "Open a file",
                    cat: (pushToList, input)=> {
                        
                        if (input.includes('cat')) {
                            input = input.split(' ')
                            input.splice(0, 1)
                            input = input[0]
                        }
                        const p = new Promise(resolve => {
                            switch (input) {
                                case 'quemsomos.txt':
                                    resolve({ type: 'success', label: '', message: 'Criado a partir da iniciativa de alunos da graduação de Ciências da Computação, no ano de 2017, o Caravela HackerClub é uma entidade estudantil que visa a divulgação, conscientização e capacitação para desenvolvimento e uso de software livre, tendo seu espaço físico aberto para pessoas que querem desenvolver e aprender coisas na aréa.' })
                                    break
                                case 'oquefazemos.txt':
                                    resolve({ type: 'success', label: '', message: 'Atualmente, o Caravela promove minicursos e eventos de ensino, buscando levar a computação para outros cursos e espaços dentro da UFSC. Além disso, dentro do nosso espaço físico são desenvolvidos projetos de hardware, trazidos ao Caravela pelos próprios membros.' })
                                    break
                                case 'join.txt':
                                    resolve({ type: 'success', label: '', message: 'A participação de novas pessoas é muito bem-vinda e incentivada. Venha nos fazer uma visita na sala INE 418. :^)' })
                                default:
                                    resolve({ type: 'success', label: '', message: 'File not found' })
                                    break
                            }
                        })
                        this.$refs.term.handleFocus()
                        return p
                    }
                },
                ls:{
                    description: 'List files',
                    ls(pushToList) {
                        const p = new Promise(resolve => {
                            pushToList({ time: '', label: 'Files', type: 'info', message: 'quemsomos.txt \t oquefazemos.txt \t join.txt' });
                            resolve({ type: 'success', label: '', message: '' })
                        })
                        return p
                    }
                },
                echo: {
                    description: 'Echoes input',
                    echo: (pushToList, input)=> {
                        input = input.split(' ')
                        input.splice(0, 1)
                        const p = new Promise(resolve => {
                            pushToList({ time: generateTime(), label: 'Echo', type: 'success', message: input.join(' ') });
                            resolve({ type: 'success', label: '', message: '' })
                        })
                        return p
                    }
                },
                defaultTask: {
                    description: 'Runs at boot',
                    defaultTask(pushToList) {
                    let i = 0;
                    const p = new Promise(resolve => {
                        const interval = setInterval(() => {
                        mockData[i].time = generateTime()
                        pushToList(mockData[i]);
                        i++
                        if (!mockData[i]) {
                            clearInterval(interval)
                            resolve({ type: 'info', label: 'Info', message: 'Digite help para descobrir mais sobre nós.' })
                        }
                        }, 1000);
                    })
                    return p
                    }
                },
                open: {
                    description: 'Open a specified url in a new tab.',
                    open(pushToList, input) {
                    const p = new Promise((resolve, reject) => {
                        let url = input.split(' ')[1]
                        if (!url) {
                        reject({ type: 'error', label: 'Error', message: 'a url is required!' })
                        return
                        }
                        pushToList({ type: 'success', label: 'Success', message: 'Opening' })

                        if (input.split(' ')[1].indexOf('http') === -1) {
                        url = 'http://' + input.split(' ')[1]
                        }
                        window.open(url, '_blank')
                        resolve({ type: 'success', label: 'Done', message: 'Page Opened!' })
                    })
                    return p;
                    }
                },
                locate: {
                    description: "MUAHAHA",
                    locate: async (pushToList) => {
                        let request = await fetch('https://api.ipify.org')
                        let response = await request.text()
                        request = await fetch('https://geo.ipify.org/api/v1?apiKey=at_GKhIci3hvXUpnAkRVoWaiccKewy2v&ipAddress='+response)
                        response = await request.json()
                        const p = new Promise((resolve, reject)=> {
                            resolve({ type: 'success', label: 'Gotcha!', message: "IPv4: "+ response.ip+ " "+ response.location.country + ", " + response.location.region+ ", " + response.location.city })
                        })
                        return p
                    }
                }
            },
            commandList: {
                whoami: {
                    description: "Returns who you are",
                    messages: [
                        {message: 'User'}
                    ]
                }
            }
        }
    },
    methods: {
        stepState: ev => {
            this.a.data().current = ev.target.parentElement.dataset.id
        },
        openFile: function(file) {
            const terminal = document.querySelector('div.terminal')
            window.scrollTo(0, terminal.offsetTop)
            this.$refs.term.handleRun('cat', file)
            this.$refs.term.handleFocus()
        }
    },
})

</script>
