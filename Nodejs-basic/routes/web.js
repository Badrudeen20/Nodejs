const express = require('express')
const UserController = require('../app/controller/UserController')
const router = express.Router()

router.get('/list',UserController.userList);



module.exports  = router
   