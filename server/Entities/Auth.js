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
class Auth extends Model_1.default {
    constructor() {
        super('auth');
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.pool.query('SELECT * FROM auth WHERE token = $1 LIMIT 1', [token]);
            if (rows.rowCount != 0) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = Auth;
