import Path from 'path'
import Portfinder, { getPort } from 'portfinder'

require('dotenv').config({path: Path.resolve(__dirname, '../.env')})

import Crew from './Entities/Crew'
const crew = new Crew()

import Express from 'express'
const app = Express()

app.use(Express.json())
app.use("/storage", Express.static("../src/assets/img"))
app.use("/", Express.static("../dist"))

require("./Routes/api")(app, crew)
require("./Routes/web")(app)

if (process.env.MODE === 'production') {
    app.listen(80, ()=> console.log('Server listening at port ' + 80))
}else{
    Portfinder.getPortPromise().then(
        (port)=>{
            app.listen(port, ()=> console.log('Server listening at port ' + port))
        }
    )
}