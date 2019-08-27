import Path from "path";

module.exports = function(app:any|Express.Application) {
    app.get('/', (req:Express.Request, res:Express.Response|any)=> res.sendFile(Path.join(__dirname + './../../app/dist/index.html')))
}