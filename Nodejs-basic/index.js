var express = require('express');
const cluster = require('node:cluster');
const os = require('node:os')
const numCPUs = require('node:os').availableParallelism()
var app = express();
let PORT = process.env.PORT || 9000;
const web = require('./routes/web')
require('dotenv').config()
require('./app/models')

// console.log(os.cpus().length,os.availableParallelism())

app.set('views',__dirname + '/view')
app.set('view engine','ejs') 


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(web)


/* Cluster */
if (cluster.isPrimary) {
   console.log(`Primary ${process.pid} is running`);
 
   // Fork workers.
   for (let i = 0; i < numCPUs; i++) {
     cluster.fork();
   }
 
   cluster.on('exit', (worker, code, signal) => {
     console.log(`worker ${worker.process.pid} died`);
   });
 } else {
   app.listen( PORT, function() {
      console.log( 'server running on ' + PORT );
   });
   console.log(`Worker ${process.pid} started`);
 }



