import PostController from "../Controllers/PostController"
import CrewController from "../Controllers/CrewController";

export default class GithubCrons {
    
    private crew = new CrewController()
    private post = new PostController()

    run() {
        this.fetchPosts(180000)
        this.fetchPostsNow()
        this.fetchMembers(180000)
        this.fetchMembersNow()
    }
    
    fetchPosts(time: number) {
        setInterval(
            async ()=> {
                this.post.fetch()
            },
            time
        )
    }

    fetchPostsNow() {
        this.post.fetch()
    }

    fetchMembers(time: number) {
        setInterval(
            async ()=> {
                this.crew.fetch()    
            },
            time
        )
    }

    async fetchMembersNow() {
        this.crew.fetch()
    }
}