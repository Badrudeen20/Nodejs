var express = require('express');
var app = express();
const PORT = 8080;
const index = require('./routes/web')
var bodyParser =    require("body-parser");

app.set('views',__dirname + '/view')
app.set('view engine','ejs') 
app.use(express.static('public/css'))
app.use(express.static('public/js'))
app.use(express.static('storage'))
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(index.show)

app.listen( PORT, function() {
   console.log( 'server running on ' + PORT );
});

 