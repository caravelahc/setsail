import Path from 'path'
import Portfinder, { getPort } from 'portfinder'
import Crons from './Crons/Github'

require('dotenv').config({path: Path.resolve(__dirname, '../.env')})

import Crew from './Entities/Crew'
import Posts from './Entities/Posts'
import Images from './Entities/Images'
import Events from './Entities/Events'
import Express from 'express'

const crew = new Crew()
const posts = new Posts()
const crons = new Crons()
const images = new Images()
const events = new Events()
const app = Express()

crons.run()
app.use(Express.json())
app.use("/storage", Express.static("../src/assets/img"))
app.use("/", Express.static("../dist"))

require("./Routes/api")(app, crew, posts, images, events)
require("./Routes/web")(app)

if (process.env.MODE === 'production') {
    app.listen(3000, ()=> console.log('Server listening at port ' + 3000))
}else{
    Portfinder.getPortPromise().then(
        (port)=> {
            app.listen(port, ()=> console.log('Server listening at port ' + port))
        }
    )
}