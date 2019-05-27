"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../Entities/Model"));
class Crew extends Model_1.default {
    constructor() {
        super('crew');
    }
}
exports.default = Crew;
