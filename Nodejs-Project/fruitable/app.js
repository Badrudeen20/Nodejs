var express = require('express');
var app = express();
require('dotenv').config()
const path = require('path');
let PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const web = require('./route/web')
const upload = require('express-fileupload');
const { rootPath, url } = require('./app/helper/url');
const { adminEnsureAuthenticated } = require('./app/config/auth');
app.locals.rootPath = rootPath;
// Passport Config
require('./app/config/passport')(passport);
app.use(expressLayouts);
app.use(upload());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views',__dirname + '/view')
app.set('view engine','ejs') 



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(async (req,res,next)=>{
  app.locals.url = url(req,res)
  next()
})

// Express session
app.use(
      session({
        secret: process.env.SECRET || 'secret',
        resave: true,
        saveUninitialized: true
      })
);
    
// Passport middleware

app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());

app.use(web)
app.listen( PORT, function(req,res) {
   console.log( 'server running on ' + PORT );
});