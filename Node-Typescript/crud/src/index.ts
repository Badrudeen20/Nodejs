import express from "express";
import router from "./router/web";
import formatDate from "./helper/date";
// const rootDir  = path.resolve(__dirname,'../')
const app = express();
const port = 9000;
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static("public"));
app.set('views',__dirname + '/../view');
app.set('view engine','ejs');
app.use(router)
app.locals.formatDate = formatDate;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});