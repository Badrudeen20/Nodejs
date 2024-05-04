const express = require('express');
const DashboardController = require('../app/controller/dashboard/DashboardController');
const  group = require('../helper/group');
const BuilderController = require('../app/controller/dashboard/BuilderController');


const router = express.Router()




router.use("/admin", group((route) => {
      route.get('/dashboard',DashboardController.view); 
      route.get('/form-builder',BuilderController.builder); 
      route.post('/add-form',BuilderController.addForm); 
      route.get('/:formId/delete-form',BuilderController.deleteForm); 
}));





module.exports  = router
   