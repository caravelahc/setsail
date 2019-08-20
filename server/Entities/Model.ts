const { Pool } = require('pg')

export default class Model{

    protected table:string|null

    protected pool = new Pool({
        user    : process.env.DB_USER,
        host    : process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port    : process.env.DB_PORT,
    })

    constructor(table:string|null = null) {
        this.table = table
    }

   async create(req: Request|any, res: Response|any) {
        try {
            let queryString:string = 'INSERT INTO ' + this.table
            let fields:string = ' ('
            let vals:string = ' VALUES ('
            let count:number = 1
            let body:Array<any> = []
    
            for (const key in req.body) {
                if (req.body.hasOwnProperty(key)) {
                    if (fields == ' (') {
                        fields += key
                        vals += '$' + count
                    } 
                    else{
                        fields += ' , ' + key
                        vals += ', $' + count
                    }
                    body.push(req.body[key])
                    count++
                }
            }
            
            fields += ')'
            vals += ')'
    
            let query = queryString + fields + vals + ' RETURNING *'
            let resp = await this.pool.query(query, body)
            if (resp.rows !== undefined) {
                res.status(200).json({ data: resp.rows, status: "success" })
            }else{
                res.json({message: "Can't create member"})
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }

    async all(req: Request|any, res: Response|any) {
        try {
            let resp = await this.pool.query('SELECT * FROM ' + this.table)
            if (resp.rows !== undefined) {
                res.json(resp.rows)
            }else{
                res.json({message: "Can't find any registers"})
            }
        }catch(error) {
            res.status(400).json(error)   
        }
    }

    async find(req: Request|any, res: Response|any) {
        try {
            let resp = await this.pool.query('SELECT * FROM ' + this.table + ' WHERE id = $1', [req.params.id])
            if (resp.rows !== undefined) {
                res.json(resp.rows)
            }else{
                res.json({message: "Can't find id"})
            }
        }catch (error) {
            res.status(400).json(error)
        }
    }

    async destroy(req: Request|any, res: Response|any) {
        try {
            let resp = await this.pool.query('DELETE FROM ' + this.table + ' WHERE id = $1', [req.params.id])
            if (resp.rows !== undefined) {
                res.json({status: true, message: "Destroyed"})
            }else{
                res.json({message: "Can't find id"})
            }
        }catch (error) {
            res.status(400).json(error)
        }
    }

    async update(req: Request|any, res: Response|any) {
        try {
            let query = [`UPDATE ${this.table}`]
            let body:Array<any> = []
            query.push('SET')
    
            let set:Array<string> = []
    
            Object.keys(req.body).forEach(function (key, i) {
                set.push(key + ' = ($' + (i + 1) + ')')
                body.push(req.body[key])
            })
    
            set.push('updated_at = CURRENT_TIMESTAMP')
            query.push(set.join(', '))
            query.push('WHERE id = ' + req.params.id)
            query.push('RETURNING *')
            let final = query.join(' ')

            let resp = await this.pool.query(final, body)    
            if (resp.rows !== undefined) {
                res.json({status: true, message: "Updated", data: resp.rows})
            }else{
                res.json({message: "Can't update"})
            }
        } catch (error) {
            res.status(400).json(error)
        }
    }
}