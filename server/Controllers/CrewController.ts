import Crew from '../Entities/Crew'
import { AxiosInstance } from 'axios'
import Axios from 'axios'

export default class CrewController {
    private model:Crew
    private api:AxiosInstance

    constructor() {
        this.model = new Crew()
        this.api = Axios.create({
            baseURL: 'https://api.github.com',
            auth: {
                username: process.env.GIT_USER || '',
                password: process.env.GIT_PASS || ''
            }
        })
    }

    async fetch() {
        try {
            const repos = await this.api.get("orgs/caravelahc/repos")
            
            for (const repo of repos.data) {
                const contributors = await this.api.get(repo.contributors_url)
            
                for (const contributor of contributors.data) {
                    const body = [contributor.login, contributor.html_url, contributor.avatar_url]
                    this.model.upsert(body)
                }
            }
        }catch(error) {
            console.log(error)   
        }
    }
}