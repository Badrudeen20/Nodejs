/* // commonjs
const http = require('http')
const port = 3000
const server = http.createServer((req,res)=>{
      res.writeHead(200,{'Content-Type':'text/plane'})
      res.end('Done')
})

server.listen(port,()=>{
      console.log('Listening on port '+port)
}) */

const express = require("express")
const app = express()
const fs  = require('fs')
const port = 4000
const path = require("path")
const upload = require("./helper/multer")
/* const multer = require("multer")
const upload = multer({dest:__dirname+"/upload/"}) */

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',function(req,res){
     res.writeHead(200,{'Content-type':'text/html'})
//      const dirname = path.resolve("../")
     fs.readFile(__dirname+"/html/form.html",function(err,data){
            if(err) return err
            res.write(data)
            res.end()
     })
     
})


app.post("/upload",upload.single("file"),function(req,res){
      console.log(req.file)
      res.redirect("back")
})


app.listen(port,(err)=>{
      if(err) return err
      console.log('listing '+port)
})