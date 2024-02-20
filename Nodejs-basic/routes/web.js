const express = require('express')
const UserController = require('../app/controller/UserController')
const router = express.Router()

router.get('/',UserController.view);
router.get('/list',UserController.list);



module.exports  = router
   