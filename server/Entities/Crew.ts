import Model from "../Entities/Model"

export default class Crew extends Model{
    private pool:any
    private connection:string

    constructor(Pool:any){
        super('crew')

        this.connection = 'postgresql://leviosar:j#124578369@45.79.209.58/setsail'
        
        this.pool = new Pool({
            user: 'leviosar',
            host: '45.79.209.58',
            database: 'setsail',
            password: 'j#124578369',
            port: 5432,
        })
    }

    create(req: Request|any, res: Response|any){
        const body = []

        for(let el in req.body){
            body.push(req.body[el])
        }
        this.pool.query('INSERT INTO crew (name, github, pic, description, created_at) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *', body, 
            (err:any, resp:Response|any) => {
                res.json({ data: resp.rows, status: "success" })
            }
        )
    }
    
    all(req: Request|any, res: Response|any){
        this.pool.query('SELECT * FROM crew', (err:any, resp:Response|any)=>{
            if (!err) {
                res.send(resp.rows)
            }else{
                res.send(err)
            }
        })
    }

    show(req: Request|any, res: Response|any){
        this.pool.query('SELECT * FROM crew WHERE id = $1', [req.params.id] , 
            (err:any, resp:Response|any)=>{
                if (!err) {
                    res.send(resp.rows)
                }else{
                    res.send(err)
                }
            }
        )
    }

    update(req: Request|any, res: Response|any){
        const body = []

        for(let el in req.body){
            body.push(req.body[el])
        }

        this.pool.query(this.getUpdateString(req.params.id, req.body, true), body, 
            (err:any, resp:Response|any) => {
                res.json({ data: resp.rows, status: "success" })
            }
        )
    }

    delete(req: Request|any, res: Response|any){
        this.pool.query('DELETE FROM crew WHERE id = $1', [req.params.id], 
            (err:any, resp:Response|any) => {
                if (!err) {
                    res.send({ status: "success" })
                }else{
                    res.send(err)
                }
            }
        )
    }
}