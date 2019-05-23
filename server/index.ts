import Express from 'express'
import Crew from './Entities/Crew'
import Path from 'path'

const { Pool } = require('pg')
const Cors = require('cors')

const crew = new Crew(Pool)
const app = Express()

app.use(Express.json())
app.use(Express.static("../dist"))
app.use(Cors())

app.get('/', (req, res)=> res.sendFile(Path.join(__dirname + '/../dist/index.html')))
app.get('/projetos', (req, res)=> res.sendFile(Path.join(__dirname + '/../dist/projetos.html')))

// API Interface for Crew entity
app.post('/crew', (req, res)=> crew.create(req, res))
app.get('/crew/', (req, res)=> crew.all(req, res))
app.get('/crew/:id', (req, res)=> crew.show(req, res))
app.put('/crew/:id', (req, res)=> crew.update(req, res))
app.delete('/crew/:id', (req, res)=> crew.delete(req, res))

app.listen(3000, ()=> console.log('Ta rodando'))