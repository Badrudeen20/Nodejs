const express = require('express')
const Controller = require('../controller/fileController')
const router = express.Router()
const fileUpload = require("express-fileupload");
router.use(fileUpload());

module.exports = {
    show:router.get('/',Controller.show),
    folder:router.get('/folder/builder',Controller.folder),
    upload:router.post('/upload/file',Controller.upload),
    files:router.get('/folder/files',Controller.files),
    directory:router.get('/folder/directory',Controller.directory),
    tabFolder:router.get('/tab/folder',Controller.tabFolder),
    delete:router.get('/folder/file/delete',Controller.delete),
  
}