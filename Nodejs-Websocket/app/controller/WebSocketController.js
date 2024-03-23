const WebSocket = require('ws');
const { server } = require('../helper/Socket');
const wss = new WebSocket.Server({ server });
let str = ''
module.exports = {
      board:function(req,res){
            wss.on('connection', function connection(ws) {

                  // Send a message to the client when the connection is established
                  ws.send(str);

                  // Handle messages received from the client
                  ws.on('message', function incoming(message) {
                    // Broadcast message to all clients
                    str = message.toString('utf-8')
                    wss.clients.forEach(function each(client) {
                      if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(str);
                      }
                    });
                  });

                  // Handle closing of the connection
                  ws.on('close', function close() {
                        console.log('Client disconnected');
                  });
            });

            res.render("board")
      }
}