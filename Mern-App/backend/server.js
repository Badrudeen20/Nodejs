var express = require('express');
var cors = require("cors");
var app = express();
require('dotenv').config()

let PORT = process.env.PORT || 5000;
const auth = require('./routes/auth')
const web = require('./routes/web')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// routes
app.use('/api/workout', auth)
app.use('/api/user', web)
app.listen( PORT, function() {
   console.log( 'server running on ' + PORT );
});