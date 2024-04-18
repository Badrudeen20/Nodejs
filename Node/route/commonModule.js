const express = require("express")
const group = require("../app/helper/group")
const fileController = require("../app/controller/fileController")
const clusterController = require("../app/controller/clusterController")
const route = express.Router()
clusterController
route.get('/fileAsync',fileController.fileAsync)
route.get('/fileSync',fileController.fileSync)
route.get('/calculate',clusterController.view)


/* 
route.use('/file',group((rou)=>{

}))
*/

module.exports = route