import Model from "../Entities/Model"

export default class Images extends Model{

    constructor() {
        super('posts')
    }

    async getDesktop(req: any, res: any) {
        try {
            const query = "SELECT * FROM images WHERE mobile = false"
            const { rows } = await this.pool.query(query)
            res.send(rows)
        } catch (error) {
            console.log(error)
        }
    }

    async getMobile(req: any, res: any) {
        try {
            const query = "SELECT * FROM images WHERE mobile = true"
            const { rows } = await this.pool.query(query)
            res.send(rows)
        } catch (error) {
            console.log(error)
        }
    }
}