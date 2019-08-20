"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
class Model {
    constructor(table = null) {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });
        this.table = table;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queryString = 'INSERT INTO ' + this.table;
                let fields = ' (';
                let vals = ' VALUES (';
                let count = 1;
                let body = [];
                for (const key in req.body) {
                    if (req.body.hasOwnProperty(key)) {
                        if (fields == ' (') {
                            fields += key;
                            vals += '$' + count;
                        }
                        else {
                            fields += ' , ' + key;
                            vals += ', $' + count;
                        }
                        body.push(req.body[key]);
                        count++;
                    }
                }
                fields += ')';
                vals += ')';
                let query = queryString + fields + vals + ' RETURNING *';
                let resp = yield this.pool.query(query, body);
                if (resp.rows !== undefined) {
                    res.status(200).json({ data: resp.rows, status: "success" });
                }
                else {
                    res.json({ message: "Can't create member" });
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    all(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this.pool.query('SELECT * FROM ' + this.table);
                if (resp.rows !== undefined) {
                    res.json(resp.rows);
                }
                else {
                    res.json({ message: "Can't find any registers" });
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this.pool.query('SELECT * FROM ' + this.table + ' WHERE id = $1', [req.params.id]);
                if (resp.rows !== undefined) {
                    res.json(resp.rows);
                }
                else {
                    res.json({ message: "Can't find id" });
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let resp = yield this.pool.query('DELETE FROM ' + this.table + ' WHERE id = $1', [req.params.id]);
                if (resp.rows !== undefined) {
                    res.json({ status: true, message: "Destroyed" });
                }
                else {
                    res.json({ message: "Can't find id" });
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = [`UPDATE ${this.table}`];
                let body = [];
                query.push('SET');
                let set = [];
                Object.keys(req.body).forEach(function (key, i) {
                    set.push(key + ' = ($' + (i + 1) + ')');
                    body.push(req.body[key]);
                });
                set.push('updated_at = CURRENT_TIMESTAMP');
                query.push(set.join(', '));
                query.push('WHERE id = ' + req.params.id);
                query.push('RETURNING *');
                let final = query.join(' ');
                let resp = yield this.pool.query(final, body);
                if (resp.rows !== undefined) {
                    res.json({ status: true, message: "Updated", data: resp.rows });
                }
                else {
                    res.json({ message: "Can't update" });
                }
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.default = Model;
