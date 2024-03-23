const express = require("express");
const fs = require('fs') 
// const expressLayouts = require("express-ejs-layouts"); 
// const bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");
// var session = require("express-session"); 
const app = express(); 
const server = require("http").createServer(app); 
const io = require("socket.io")(server); 

module.exports = {
      app,
      io,
      server,
      express,
      fs
}