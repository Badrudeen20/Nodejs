var express = require('express');
var app = express();
let PORT = process.env.PORT || 5000;
const web = require('./routes/web')
require('./app/models')


app.set('views',__dirname + '/view')
app.set('view engine','ejs') 


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(web)

app.listen( PORT, function() {
   console.log( 'server running on ' + PORT );
});