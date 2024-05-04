var express = require('express');
var app = express();
require('dotenv').config()
const path = require('path');
let PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const web = require('./route/web')
const { rootPath, url } = require('./helper/url');
const cluster = require('cluster')
const os = require('os')
const numcpus = os.cpus().length


app.locals.rootPath = rootPath;

app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views',__dirname + '/view')
app.set('view engine','ejs') 


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(async (req,res,next)=>{
  app.locals.url = url(req,res)
  if(req.originalUrl =='/'){
    return res.redirect('/admin/dashboard')
  }
  next()
})

// Express session
app.use(
      session({
        secret: process.env.SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false,expires:60000 }
      })
);

app.use(flash()); 
app.use(web)


if(cluster.isMaster){
  for(let i = 0; i < numcpus; i++) {
   cluster.fork()
  }
}else{
  
app.listen( PORT, function(req,res) {
  console.log( 'server running on ' + PORT );
});

}



