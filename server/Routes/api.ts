import Crew from "../Entities/Crew";
import Cors from "cors";
import Posts from "../Entities/Posts";

module.exports = function(app:any|Express.Application, crew:Crew, posts:Posts) {
    app.get('/crew/', Cors() ,(req:Express.Request, res:Express.Response)=> crew.all(req, res))
    app.get('/crew/:id', Cors(), (req:Express.Request, res:Express.Response)=> crew.find(req, res))
    app.post('/crew', (req:Express.Request, res:Express.Response)=> crew.create(req, res))
    app.put('/crew/:id', (req:Express.Request, res:Express.Response)=> crew.update(req, res))
    app.delete('/crew/:id', (req:Express.Request, res:Express.Response)=> crew.destroy(req, res))    
    
    app.get('/posts/', Cors() ,(req:Express.Request, res:Express.Response)=> posts.all(req, res))
    app.get('/posts/:id', Cors(), (req:Express.Request, res:Express.Response)=> posts.find(req, res))
    app.post('/posts', (req:Express.Request, res:Express.Response)=> posts.create(req, res))
    app.put('/posts/:id', (req:Express.Request, res:Express.Response)=> posts.update(req, res))
    app.delete('/posts/:id', (req:Express.Request, res:Express.Response)=> posts.destroy(req, res))    
}