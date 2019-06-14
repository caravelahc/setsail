import Crew from "../Entities/Crew"
import Auth from '../Auth/Github'

export default {
    run(crew:Crew){
        setInterval(
            async (crew:Crew)=>{
                try {
                    const repos = await Auth.get("orgs/caravelahc/repos")
                    for (const repo of repos.data) {
                        const contributors = await Auth.get(repo.contributors_url)
                        for (const contributor of contributors.data) {
                            const body = [contributor.login, contributor.html_url, contributor.avatar_url]
                            crew.upsert(body)
                        }
                    }
                }catch(error) {
                    console.log(error)   
                }
            },
            1800000,
            crew
        )
    },
    async imediateRun(crew:Crew){
        try {
            const repos = await Auth.get("orgs/caravelahc/repos")
            for (const repo of repos.data) {
                const contributors = await Auth.get(repo.contributors_url)
                for (const contributor of contributors.data) {
                    const body = [contributor.login, contributor.html_url, contributor.avatar_url]
                    crew.upsert(body)
                }
            }
        }catch(error) {
            console.log(error)   
        }
    }
}