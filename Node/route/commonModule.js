const express = require("express")
const group = require("../helper/group")
const fileController = require("../app/controller/fileController")
const clusterController = require("../app/controller/clusterController")
const dashboardController = require("../app/controller/dashboardController")
const { auth } = require("../middleware/auth")

const route = express.Router()

route.get('/fileAsync',fileController.fileAsync)
route.get('/fileSync',fileController.fileSync)
route.get('/calculate',clusterController.view)
route.get('/dashboard', auth, dashboardController.view)
route.get('/buffer', dashboardController.buffer)


/* 
route.use('/file',group((rou)=>{

}))
*/

module.exports = route