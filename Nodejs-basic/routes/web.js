const express = require('express')
const UserController = require('../app/controller/UserController');
const FileController = require('../app/controller/FileController');
const ClassController = require('../app/controller/ClassController');

const router = express.Router()


//user router
router.get('/',UserController.view);
router.get('/list',UserController.list);
router.post('/add',UserController.addUser);
router.post('/edit',UserController.editUser);
router.post('/update',UserController.updateUser);
router.get('/delete/:id',UserController.deleteUser);


//file router
router.get('/file',FileController.view)
router.post('/write',FileController.write)



module.exports  = router
   