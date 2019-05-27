import Path from 'path'

// Environment
require('dotenv').config({path: Path.resolve(process.cwd(), '../.env')})

// Modules
import Express from 'express'
const Cors = require('cors')

// Models
import Crew from './Entities/Crew'

// Declaration
const crew = new Crew()
const app = Express()

app.use(Express.json())
app.use("/storage", Express.static("../src/assets/img"))
app.use(Express.static("../dist"))

// Uncomment for allow Cors on all routes
// app.use(Cors())

app.get('/', (req, res)=> res.sendFile(Path.join(__dirname + '/../dist/index.html')))
app.get('/projetos', (req, res)=> res.sendFile(Path.join(__dirname + '/../dist/projetos.html')))

// API for Crew entity
app.get('/crew/', Cors() ,(req, res)=> crew.all(req, res))
app.get('/crew/:id', Cors(), (req, res)=> crew.find(req, res))
app.post('/crew', (req, res)=> crew.create(req, res))
app.put('/crew/:id', (req, res)=> crew.update(req, res))
app.delete('/crew/:id', (req, res)=> crew.destroy(req, res))

app.listen(80, ()=> console.log('Server listening at port 80'))