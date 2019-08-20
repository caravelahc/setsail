"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Entities/Model"));
class Crew extends Model_1.default {
    constructor() {
        super('crew');
    }
    upsert(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = "INSERT INTO crew as c (name, github, pic, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) ";
                query += "ON CONFLICT (github) DO UPDATE SET name = $1, github = $2, pic = $3, updated_at = CURRENT_TIMESTAMP ";
                query += "WHERE c.github = $2";
                yield this.pool.query(query, user);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Crew;
