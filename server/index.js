"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Crew_1 = __importDefault(require("./Entities/Crew"));
const { Pool } = require('pg');
const Cors = require('cors');
const crew = new Crew_1.default(Pool);
const app = express_1.default();
app.use(express_1.default.json());
app.use(Cors());
// API Interface for Crew entity
app.post('/crew', (req, res) => crew.create(req, res));
app.get('/crew/', (req, res) => crew.all(req, res));
app.get('/crew/:id', (req, res) => crew.show(req, res));
app.put('/crew/:id', (req, res) => crew.update(req, res));
app.delete('/crew/:id', (req, res) => crew.delete(req, res));
app.listen(3000, () => console.log('Ta rodando'));
