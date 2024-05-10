var express = require('express');
var app = express();
require('dotenv').config()
const path = require('path');
let PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const web = require('./route/web')
const { rootPath, url } = require('./helper/url');


app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',__dirname + '/view')
app.set('view engine','ejs') 
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(async (req,res,next)=>{
  app.locals.url = url(req,res)
  next()
})



app.use(cors());
app.use('/api',web)

app.listen( PORT, function(req,res) {
  console.log( 'server running on ' + PORT );
});