"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const web_1 = __importDefault(require("./router/web"));
const app = (0, express_1.default)();
const port = 9000;
// console.log(path.join(__dirname, 'views'))
// app.set('views',__dirname + '/view')
app.set('view engine', 'ejs');
app.use(web_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
