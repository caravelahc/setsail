import Model from "../Entities/Model"

export default class Events extends Model{

    constructor() {
        super('posts')
    }

    async upsert(post: PostResponse, content: string, cover: string) {
        try {
            let query = "INSERT INTO posts as p (sha, name, content, cover, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) "
            query += "ON CONFLICT (sha) DO UPDATE SET name = $2, content = $3, cover = $4, updated_at = CURRENT_TIMESTAMP "
            query += "WHERE p.sha = $2"
            await this.pool.query(query, [post.sha, post.name, content, cover])
        } catch(error) {
            console.log(error)
        }
    }
}