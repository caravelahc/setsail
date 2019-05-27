"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// Environment
require('dotenv').config({ path: path_1.default.resolve(process.cwd(), '../.env') });
// Modules
const express_1 = __importDefault(require("express"));
const Cors = require('cors');
// Models
const Crew_1 = __importDefault(require("./Entities/Crew"));
// Declaration
const crew = new Crew_1.default();
const app = express_1.default();
app.use(express_1.default.json());
app.use("/storage", express_1.default.static("../src/assets/img"));
app.use(express_1.default.static("../dist"));
// Uncomment for allow Cors on all routes
// app.use(Cors())
app.get('/', (req, res) => res.sendFile(path_1.default.join(__dirname + '/../dist/index.html')));
app.get('/projetos', (req, res) => res.sendFile(path_1.default.join(__dirname + '/../dist/projetos.html')));
// API for Crew entity
app.get('/crew/', Cors(), (req, res) => crew.all(req, res));
app.get('/crew/:id', Cors(), (req, res) => crew.find(req, res));
app.post('/crew', (req, res) => crew.create(req, res));
app.put('/crew/:id', (req, res) => crew.update(req, res));
app.delete('/crew/:id', (req, res) => crew.destroy(req, res));
app.listen(80, () => console.log('Server listening at port 80'));
