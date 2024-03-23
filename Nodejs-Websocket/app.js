const {app,server} = require("./app/helper/Socket")

const web = require('./router/web')
const path = "editor.txt"
app.set('views',__dirname + '/view')
app.set("view engine", "ejs"); 
app.use(web)
const port = process.env.PORT || 3000 

server.listen(port,function(){
      console.log("server running at ", port); 
}); 


/* 
io.sockets.on("connection", socket => { 
     
      socket.on("disconnect", data => { })
      socket.on('send message', data => { 
            write_file(path, data) 
      }); 

}) 
*/


/* 
fs.watchFile(path, { interval: 100 }, async(curr, prey) => {
      
      fs.readFile(path, 'utf8', (err, data) => { 
            if (err) { 
                  console.error( err) 
                  return 
            } 
            io.sockets.emit('new message', { msg: data }); 
      }) 
});  
*/
      

/* 
function write_file(path, data) { 
      fs.writeFile(path, data, function(err) { 
            if (err) throw err; 
      });
}  
*/
      