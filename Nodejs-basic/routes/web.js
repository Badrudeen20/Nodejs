const express = require('express')
const UserController = require('../app/controller/UserController');
const router = express.Router()


router.get('/',UserController.view);
router.get('/list',UserController.list);
router.post('/add',UserController.addUser);
router.post('/edit',UserController.editUser);
router.post('/update',UserController.updateUser);
router.get('/delete/:id',UserController.deleteUser);

module.exports  = router
   