const express = require('express');
const DashboardController = require('../app/controller/dashboard/DashboardController');
const  group = require('../helper/group');
const ProductController = require('../app/controller/dashboard/ProductController');


const router = express.Router()




router.use("/admin", group((route) => {
      route.get('/dashboard',DashboardController.view); 
      route.get('/products',ProductController.view); 
      route.get('/products/list',ProductController.list); 
      route.get('/add-product',ProductController.addEdit); 
      route.get('/edit-product/:id',ProductController.addEdit); 
      route.post('/create-product',ProductController.createUpdate); 
}));





module.exports  = router
   