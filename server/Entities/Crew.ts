import Model from "../Entities/Model"

export default class Crew extends Model{

    constructor() {
        super('crew')
    }

    async upsert(user: Array<string>) {
        try {
            let query = "INSERT INTO crew as c (name, github, pic, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) "
            query += "ON CONFLICT (github) DO UPDATE SET name = $1, github = $2, pic = $3, updated_at = CURRENT_TIMESTAMP "
            query += "WHERE c.github = $2"
            await this.pool.query(query, user)
        }catch(error) {
            console.log(error)
        }
    }
}