/* 
// commonjs
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
// const cluster = require("cluster")
// const os = require("os")
// const cpu = os.cpus().length
const  route  = require("./route/commonModule")
// const con = require("./app/helper/mysql")
// require("./app/helper/mongodb")
const app = express()

/* const fs  = require('fs') */
const port = 4000
/* const path = require("path")
const upload = require("./helper/multer") */
/* const multer = require("multer")
const upload = multer({dest:__dirname+"/upload/"}) */

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)

/* 
const { workerData, parentPort } = require('worker_threads') 
console.log('Worker Threads by ' + cpu);  
*/


/* 
app.get('/',function(req,res){
     res.writeHead(200,{'Content-Type':'text/html'})
     //  const dirname = path.resolve("../")
     fs.readFile(__dirname+"/html/form.html",function(err,data){
            if(err) return new Error("Soming went wrong!")
            res.write(data)
            res.end()
     })
}) 
*/


/* 
app.post("/upload",upload.single("file"),function(req,res){
      console.log(req.file)
      res.redirect("back")
}) 
*/

/* 
if (cluster.isWorker) {
      console.log('I am a worker');
} else {
      console.log('I am a master');
      cluster.fork();
      cluster.fork();
} 
*/


/* Generator */
// function* myGenerator() {
//       const result = yield true;  
// }

/* async function asyncGeneratorWrapper() {
      const gen = myGenerator();
      try {
        const result = await gen.next().value;
       
      } catch (error) {
        // Handle the error
      }
}
asyncGeneratorWrapper() */
// const gen = myGenerator();




/* 
if(cluster.isMaster){
      console.log(`Master ${process.pid} is running`);
      // Fork workers equal to the number of CPU cores
      for (let i = 0; i < cpu; i++) {
           cluster.fork() 
      }

      // Listen for worker exit and fork a new one
      cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died`);
            // cluster.fork();
      });
}else{
      console.log(`Worker ${process.pid} started`);
      app.listen(port,(err)=>{
            if(err) new Error("Somthing went wrong")
            console.log('listing '+port)
      })
}
 */



app.listen(port,(err)=>{
      if(err) new Error("Somthing went wrong")
      console.log('listing '+port)
}) 



