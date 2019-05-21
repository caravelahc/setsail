"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Entities/Model"));
class Crew extends Model_1.default {
    constructor(Pool) {
        super('crew');
        this.connection = 'postgresql://leviosar:j#124578369@45.79.209.58/setsail';
        this.pool = new Pool({
            user: 'leviosar',
            host: '45.79.209.58',
            database: 'setsail',
            password: 'j#124578369',
            port: 5432,
        });
    }
    create(req, res) {
        const body = [];
        for (let el in req.body) {
            body.push(req.body[el]);
        }
        this.pool.query('INSERT INTO crew (name, github, pic, description, created_at) VALUES($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *', body, (err, resp) => {
            res.json({ data: resp.rows, status: "success" });
        });
    }
    all(req, res) {
        this.pool.query('SELECT * FROM crew', (err, resp) => {
            if (!err) {
                res.send(resp.rows);
            }
            else {
                res.send(err);
            }
        });
    }
    show(req, res) {
        this.pool.query('SELECT * FROM crew WHERE id = $1', [req.params.id], (err, resp) => {
            if (!err) {
                res.send(resp.rows);
            }
            else {
                res.send(err);
            }
        });
    }
    update(req, res) {
        const body = [];
        for (let el in req.body) {
            body.push(req.body[el]);
        }
        this.pool.query(this.getUpdateString(req.params.id, req.body, true), body, (err, resp) => {
            res.json({ data: resp.rows, status: "success" });
        });
    }
    delete(req, res) {
        this.pool.query('DELETE FROM crew WHERE id = $1', [req.params.id], (err, resp) => {
            if (!err) {
                res.send({ status: "success" });
            }
            else {
                res.send(err);
            }
        });
    }
}
exports.default = Crew;
