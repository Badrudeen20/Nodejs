const WebSocketController = require("../app/controller/WebSocketController");
const {express,io,fs} = require("../app/helper/Socket")
const router = express.Router()
const path = require('path');
const rootDir = path.resolve(__dirname, '..');
const filePath = path.join(rootDir, '/', 'editor.txt');
/* router.get('/',(req,res)=>{
   fs.readFile(filePath,"utf8",(err,data)=>{
      if(err){
            console.error(err)
            return
      }
      
      io.sockets.emit("new message",{msg:data})
   })
   return res.render('editor')
}) */

router.get('/board',WebSocketController.board)

module.exports  = router
   