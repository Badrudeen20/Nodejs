const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const path = require("path");
const PORT = 5000;
const web = require("./router/web");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "./view"));
app.set("view engine", "ejs");
app.use(web);


// Socket.io 
const rooms = {};
io.on("connection", (socket) => {
      socket.on("join", async (room) => {
            let socketId = socket.id;
            rooms[socketId] = []
            socket.join(socketId)
            io.to(socketId).emit("user", socketId); 
           
      });

      socket.on("latlog", (userData) => {
         const { latitude, longitude, id } = userData
         rooms[id] = [longitude,latitude]
         io.emit("location", rooms); 
      })

      socket.on("disconnect", async () => {
            delete rooms[socket.id];   
      });
}); 


server.listen(PORT, function () {
      console.log(`Server Started at PORT:${PORT}`)
});
