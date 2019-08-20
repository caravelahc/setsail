import Posts from '../Entities/Posts'
import { AxiosInstance } from 'axios'
import Axios from 'axios'
import atob from 'atob'

export default class PostController {
    private model:Posts
    private api:AxiosInstance

    constructor() {
        this.model = new Posts()
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
            let summary = await this.api.get('/repos/caravelahc/blog-posts/contents/src/SUMMARY.md')
            summary = await summary.data.content
            let content = summary.toString()
            content = await atob(content)

            let needle = 0
            const files = []

            while(content.indexOf('(./', needle) > 0) {
                let start = content.indexOf('(./', needle)
                let end = content.indexOf(')', start)
                let path = content.substring(start + 3, end)
                if (path.split('/').length > 2 && path.split('/')[2] != 'index.md') {
                    files.push(path)
                }
                needle = end
            }

            this.store(files)
        } catch (error) {
            console.log(error)
        }
    }

    async store(files: Array<string>) {
        try {
            for (const file of files) {
                let request = await this.api.get('/repos/caravelahc/blog-posts/contents/src/' + file)
                let content = atob(request.data.content)
                
                let imageIndexStart = content.indexOf('![')
                imageIndexStart = content.indexOf('(', imageIndexStart)
                let imageIndexEnd = content.indexOf(')', imageIndexStart)
                let imageUrl = content.substring(imageIndexStart + 1, imageIndexEnd)

                this.model.upsert(request.data, request.data.content, imageUrl)
            }
        } catch (error) {
            
        }
    }
}