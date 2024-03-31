/* console.log('start')
const myPromise = new Promise((resolve, reject) => {
      resolve("foo");
      for (let i = 0; i < 100000000000; i++) {}
     
});
myPromise.then(item=>{
      console.log(item)
})
console.log('end') */

/* Create Server on nodejs */



//modulejs
/* import {createServer} from "http"
const port = 5000
const server = createServer((req,res)=>{
      res.writeHead(200,{'Content-Type':'text/plane'})
      res.end('Hello')
})
server.listen(port,function(){
      console.log('Listening on port '+port)
}) */


/* CORS */
/* TLS Module */
/* Cluster */
/* Cluster Method */
/* Web Socket */
/* Redis */

/* Upload file in nodejs */

import express from "express"
import fs from "fs"
import {dirname} from "path"
import { fileURLToPath } from 'url';
import upload from "express-fileupload"
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000
app.use(upload())
app.get('/',(req,res)=>{
      res.writeHead(200,{'Content-type':'text/html'})
      
      fs.readFile(__dirname+"/html/form.html",function(err,data){
            if(err) return err
            res.write(data)
            res.end()
      })
 
})

app.post('/upload',(req,res)=>{
      const {name,mv}  = req.files.file
      if(!fs.existsSync(__dirname+"/upload")){
           fs.mkdirSync(__dirname+"/upload",{recursive:true})
      }
      mv(__dirname+"/upload/"+name,function(err){
            if(err) return err
            console.log('uploaded')
            res.redirect('back')
      })
})

app.listen(port,(err)=>{
       if(err) return err
       console.log('server '+port)
})
