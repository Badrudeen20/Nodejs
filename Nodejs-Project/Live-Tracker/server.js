const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");
const PORT = 5000;
const web = require("./router/web");
const cookieParser = require("cookie-parser");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
      secret: 'your-secret-key',
      resave: true,
      saveUninitialized: true,
})); 
app.use(flash());
app.set("views", path.join(__dirname, "./view"));
app.set("view engine", "ejs");
app.use(web);
const rooms = {};
// Socket.io 
io.on("connection", (socket) => {
      socket.on("join", async (room) => {
            if (room.mobile) {
                  const user  = await prisma.User.findUnique({  where: {
                     mobile:room.mobile,
                  }})
                  let socketId = socket.id;
                  socket.join(room.mobile);
                  if (user) {
                        rooms[socketId] = user.id;
                        io.emit("user-connected", user); 
                  }else{
                        rooms['admin'] = room.mobile;
                        updateLocation(room.mobile)
                  }
            }
      });

      socket.on("update", async (userData) => {
            
            if (userData) {
                  const update = await prisma.User.update({
                        where: {id:userData.id},
                        data: {
                              latitude:userData.latitude.toString(),
                              longitude:userData.longitude.toString(),
                              status:1
                        },
                  })
                  if (update) {
                     updateLocation(rooms['admin'])
                  }
                 
            }
      });

     
      socket.on("disconnect", async () => {
            if(rooms[socket.id]){
                  const user = await prisma.User.update({
                        where:{id:rooms[socket.id]},
                        data: {status:0},
                  });
                  socket.broadcast.emit("user-disconnect", user);
            } 
            delete rooms[socket.id];   
      });


}); 


async function updateLocation(room){
      const users = await prisma.User.findMany({
            where: {status:1}
      });
      io.to(room).emit("users-location", users);  
}

server.listen(PORT, function () {
      console.log(`Server Started at PORT:${PORT}`)
});
