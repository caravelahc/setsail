import Cors from "cors"
import Crew from "../Entities/Crew"
import Posts from "../Entities/Posts"
import Images from "../Entities/Images"
import Events from "../Entities/Events"

module.exports = function(app:any|Express.Application, crew:Crew, posts:Posts, images:Images, events:Events) {
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

    app.get('/events/', Cors() ,(req:Express.Request, res:Express.Response)=> events.all(req, res))
    app.get('/events/:id', Cors(), (req:Express.Request, res:Express.Response)=> events.find(req, res))
    app.post('/events', (req:Express.Request, res:Express.Response)=> events.create(req, res))
    app.put('/events/:id', (req:Express.Request, res:Express.Response)=> events.update(req, res))
    app.delete('/events/:id', (req:Express.Request, res:Express.Response)=> events.destroy(req, res))    
    
    app.get('/images/', Cors() ,(req:Express.Request, res:Express.Response)=> images.all(req, res))
    app.get('/images/:id', Cors(), (req:Express.Request, res:Express.Response)=> images.find(req, res))
    app.get('/images_mobile/', Cors(), (req:Express.Request, res:Express.Response)=> images.getMobile(req, res))
    app.get('/images_desktop/', Cors(), (req:Express.Request, res:Express.Response)=> images.getDesktop(req, res))
    app.post('/images', (req:Express.Request, res:Express.Response)=> images.create(req, res))
    app.put('/images/:id', (req:Express.Request, res:Express.Response)=> images.update(req, res))
    app.delete('/images/:id', (req:Express.Request, res:Express.Response)=> images.destroy(req, res))    
}