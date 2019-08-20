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
const PostController_1 = __importDefault(require("../Controllers/PostController"));
const CrewController_1 = __importDefault(require("../Controllers/CrewController"));
class GithubCrons {
    constructor() {
        this.crew = new CrewController_1.default();
        this.post = new PostController_1.default();
    }
    run() {
        this.fetchPosts(180000);
        this.fetchPostsNow();
        this.fetchMembers(180000);
        this.fetchMembersNow();
    }
    fetchPosts(time) {
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            this.post.fetch();
        }), time);
    }
    fetchPostsNow() {
        this.post.fetch();
    }
    fetchMembers(time) {
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            this.crew.fetch();
        }), time);
    }
    fetchMembersNow() {
        return __awaiter(this, void 0, void 0, function* () {
            this.crew.fetch();
        });
    }
}
exports.default = GithubCrons;
