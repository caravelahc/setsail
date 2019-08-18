import Model from "../Entities/Model"

export default class Auth extends Model{

    constructor() {
        super('auth')
    }
    
    async verifyToken(token: String):Promise<Boolean>{
        const rows = await this.pool.query('SELECT * FROM auth WHERE token = $1 LIMIT 1', [token])
        
        if (rows.rowCount != 0) {
            return true
        }else{
            return false
        }
    }
}