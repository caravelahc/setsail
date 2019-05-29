import Crew from "../Entities/Crew";
import Cors from "cors";

module.exports = function(app:any|Express.Application, crew:Crew){
    app.get('/crew/', Cors() ,(req:Express.Request, res:Express.Response)=> crew.all(req, res))
    app.get('/crew/:id', Cors(), (req:Express.Request, res:Express.Response)=> crew.find(req, res))
    app.post('/crew', (req:Express.Request, res:Express.Response)=> crew.create(req, res))
    app.put('/crew/:id', (req:Express.Request, res:Express.Response)=> crew.update(req, res))
    app.delete('/crew/:id', (req:Express.Request, res:Express.Response)=> crew.destroy(req, res))    
}