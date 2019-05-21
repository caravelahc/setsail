export default class Model{
    protected table:string|null

    constructor(table:string|null = null){
        this.table = table
    }

    getUpdateString(id:any, data:Object, timestamps:boolean){

        let query = [`UPDATE ${this.table}`]
        query.push('SET')

        // Create another array storing each set command
        // and assigning a number value for parameterized query
        let set:Array<string> = []

        Object.keys(data).forEach(function (key, i) {
            set.push(key + ' = ($' + (i + 1) + ')')
        })

        if (timestamps) set.push('updated_at = CURRENT_TIMESTAMP')

        query.push(set.join(', '));

        // Add the WHERE statement to look up by id
        query.push('WHERE id = ' + id );

        query.push('RETURNING *')

        // Return a complete query string
        return query.join(' ');
    }
}