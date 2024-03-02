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
                  if (Object.keys(rooms).length) {
                   /*  for (const key in rooms) {
                      if (rooms[key] == room.mobile) {
                        if (key !== room.status) {
                          io.emit("user-exist", false);
                        }
                      }
                    } */
                  }else{
                     const user  = await prisma.User.findUnique({  where: {
                        mobile:room.mobile,
                     }})
                     console.log(user,rooms)
                     if (user) {
                        let socketId = socket.id;
                        socket.join(user.mobile);
                        rooms[socketId] = user.id;
                        io.emit("user-connected", user);
                      }
                  }
             
            }
      });

      socket.on("update", async (userData) => {
            console.log(userData)
            if (userData) {
                  const update = await prisma.User.update({
                        where: {id:userData.userId},
                        data: {latitude:userData.latitude,longitude:userData.longitude,status:1},
                  })
                  if (update) {
                    const users = await prisma.User.findMany({
                        where: {status:1}
                    });
                    console.log(users)
                    io.emit("users-location", users);
                  }
                  // io.to(userData.userId).emit("user-coords", update);
            }
      });

}); 

server.listen(PORT, function () {
      console.log(`Server Started at PORT:${PORT}`)
});
