const express = require('express');
const DashboardController = require('../app/controller/backend/DashboardController');
const AuthController = require('../app/controller/AuthController');
const { adminForwardAuthenticated,userForwardAuthenticated,adminEnsureAuthenticated,userEnsureAuthenticated } = require('../app/config/auth');
const  group = require('../app/helper/group');
const HomeController = require('../app/controller/frontend/HomeController');

const CustomerController = require('../app/controller/backend/CustomerController');
const OrderController = require('../app/controller/backend/OrderController');
const ProductController = require('../app/controller/backend/ProductController');
const ShopController = require('../app/controller/frontend/ShopController');
const { TableController } = require('../app/controller/backend/TableController');
const CartController = require('../app/controller/frontend/CartController');


const router = express.Router()


// Auth Controller
router.all('/admin/login',adminForwardAuthenticated,AuthController.adminLogin);
router.all('/login',userForwardAuthenticated,AuthController.login);
router.all('/register',userForwardAuthenticated,AuthController.register);
// Backend Controller

router.use("/admin", adminEnsureAuthenticated, group((router) => {
      router.get('/dashboard',DashboardController.view); 
      router.get('/customer',CustomerController.view); 
      router.get('/order',OrderController.view); 
      router.get('/product',ProductController.view); 


      
      router.post('/:table/column',TableController.tableColumn)
      router.post('/:table/delete',TableController.tableColumnDelete)
      router.post('/:table/rename',TableController.tableColumnRename)
      router.post('/:table/modify',TableController.tableColumnModify)
      router.post('/:table/create',TableController.tableCreate)
      /* router.post('/:table/update',ProductController.productUpdate) */


      router.get('/logout',function(req,res){
            req.logout(function(err){
                  if (err) {
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('back'); 
                  } else {
                        req.flash('success_msg', 'You are logged out');
                        res.redirect('/admin/login'); 
                  }
            });  
      });
}));


// Frontend Controller
router.all('/',HomeController.view);
router.get('/home',HomeController.home);
router.get('/shop',ShopController.shop);
router.get('/shop-detail',ShopController.detail);
router.get('/contact',HomeController.contact);

router.use("/user", userEnsureAuthenticated, group((router) => {
      router.get('/cart',CartController.cart);
      router.get('/addCart/:id',CartController.addCart);
      router.get('/logout',function(req,res){
            req.logout(function(err){
                  if (err) {
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('/'); 
                  } else {
                        res.redirect('/login'); 
                  }
            });
            
      });
      
}));






module.exports  = router
   