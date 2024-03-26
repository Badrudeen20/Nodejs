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

//modulejs
import {createServer} from "http"
const port = 5000
const server = createServer((req,res)=>{
      res.writeHead(200,{'Content-Type':'text/plane'})
      res.end('Hello')
})
server.listen(port,function(){
      console.log('Listening on port '+port)
})