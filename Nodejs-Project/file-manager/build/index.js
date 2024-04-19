"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web_1 = __importDefault(require("./route/web"));
// const rootDir  = path.resolve(__dirname,'../')
const app = (0, express_1.default)();
const port = 9000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
app.set('views', __dirname + '/../view');
app.set('view engine', 'ejs');
app.use(web_1.default);
// app.locals.formatDate = formatDate;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
