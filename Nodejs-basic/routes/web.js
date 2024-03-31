const express = require('express')
const multer = require('multer');
const UserController = require('../app/controller/UserController');
/* const FileController = require('../app/controller/FileController');
const ClassController = require('../app/controller/ClassController'); */
const { validate,validateFile } = require('../app/helper/validation');

const upload = multer({ dest: 'uploads/' })
const router = express.Router()


//user router
router.get('/',UserController.view);
router.get('/list',UserController.list);
router.post('/add',validate,UserController.addUser);
router.post('/edit',UserController.editUser);
router.post('/update',UserController.updateUser);
router.get('/delete/:id',UserController.deleteUser);
router.post('/import',upload.single('file'),UserController.importUser);
router.get('/downloadSample',UserController.downloadSample);

//file router
/* router.get('/file',FileController.view)
router.post('/write',FileController.write) */



module.exports  = router
   