const express = require("express");
const app = express();
const port = 8000;
const web = require('./routes/web')
const cors = require('cors')
const worker = require('./app/helper/WorkerQueue')


app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(web)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
