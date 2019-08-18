"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const portfinder_1 = __importDefault(require("portfinder"));
const Github_1 = __importDefault(require("./Crons/Github"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../.env') });
const Crew_1 = __importDefault(require("./Entities/Crew"));
const express_1 = __importDefault(require("express"));
const Posts_1 = __importDefault(require("./Entities/Posts"));
const crew = new Crew_1.default();
const posts = new Posts_1.default();
const crons = new Github_1.default();
const app = express_1.default();
crons.run();
app.use(express_1.default.json());
app.use("/storage", express_1.default.static("../src/assets/img"));
app.use("/", express_1.default.static("../dist"));
require("./Routes/api")(app, crew, posts);
require("./Routes/web")(app);
if (process.env.MODE === 'production') {
    app.listen(3000, () => console.log('Server listening at port ' + 3000));
}
else {
    portfinder_1.default.getPortPromise().then((port) => {
        app.listen(port, () => console.log('Server listening at port ' + port));
    });
}
