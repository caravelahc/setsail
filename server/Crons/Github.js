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
const Github_1 = __importDefault(require("../Auth/Github"));
exports.default = {
    run(crew) {
        setInterval((crew) => __awaiter(this, void 0, void 0, function* () {
            try {
                const repos = yield Github_1.default.get("orgs/caravelahc/repos");
                for (const repo of repos.data) {
                    const contributors = yield Github_1.default.get(repo.contributors_url);
                    for (const contributor of contributors.data) {
                        const body = [contributor.login, contributor.html_url, contributor.avatar_url];
                        crew.upsert(body);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }), 1800000, crew);
    },
    imediateRun(crew) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repos = yield Github_1.default.get("orgs/caravelahc/repos");
                for (const repo of repos.data) {
                    const contributors = yield Github_1.default.get(repo.contributors_url);
                    for (const contributor of contributors.data) {
                        const body = [contributor.login, contributor.html_url, contributor.avatar_url];
                        crew.upsert(body);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
