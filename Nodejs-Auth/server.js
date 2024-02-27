var express = require('express');
var app = express();
let PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const web = require('./route/web')
// Passport Config
require('./app/config/passport')(passport);

app.use(expressLayouts);
app.set('views',__dirname + '/view')
app.set('view engine','ejs') 

app.use(express.json());
app.use(express.urlencoded({extended:true}))
// Express session
app.use(
      session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
      })
    );
    
    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
app.use(flash());
app.use(web)

app.listen( PORT, function() {
   console.log( 'server running on ' + PORT );
});