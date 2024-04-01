const express = require('express');
/* const DashboardController = require('../app/controller/backend/DashboardController'); */
const AuthController = require('../app/controller/AuthController');
const { adminForwardAuthenticated,userForwardAuthenticated,adminEnsureAuthenticated,userEnsureAuthenticated } = require('../app/config/auth');
const  group = require('../app/helper/group');
const HomeController = require('../app/controller/frontend/HomeController');

/* const CustomerController = require('../app/controller/backend/CustomerController');
const OrderController = require('../app/controller/backend/OrderController');
const ProductController = require('../app/controller/backend/ProductController');
const ShopController = require('../app/controller/frontend/ShopController');
const CartController = require('../app/controller/frontend/CartController');
const BrandController = require('../app/controller/backend/BrandController'); */


const router = express.Router()


// Auth Controller
router.all('/admin/login',adminForwardAuthenticated,AuthController.adminLogin);
router.all('/login',userForwardAuthenticated,AuthController.login);
router.all('/register',userForwardAuthenticated,AuthController.register);
// Backend Controller

/* router.use("/admin",adminEnsureAuthenticated, group((router) => {
      router.get('/dashboard',DashboardController.view); 
      router.get('/customers',CustomerController.view); 
      router.get('/customers/list',CustomerController.list); 
      router.get('/orders',OrderController.view); 
      router.get('/orders/list',OrderController.list); 
      router.get('/products',ProductController.view); 
      router.get('/products/list',ProductController.list); 
      router.get('/add-product',ProductController.addEdit); 
      router.get('/edit-product/:id',ProductController.addEdit); 
      router.post('/create-product',ProductController.createUpdate); 
      router.get('/brands',BrandController.view); 
      router.get('/brands/list',BrandController.list); 
      router.post('/brand',BrandController.add); 
      router.post('/brand/:id',BrandController.edit); 
      router.get('/brand/:id',BrandController.delete); 
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
})); */


// Frontend Controller
router.all('/',HomeController.home);
/* router.get('/home',HomeController.home);
router.get('/shop',ShopController.shop);
router.get('/shop-detail/:id',ShopController.detail);
router.get('/contact',HomeController.contact); */

//Auth Frontend Controller


/* router.use("/user", userEnsureAuthenticated, group((router) => {
      router.get('/cart',userEnsureAuthenticated,CartController.cart);
      router.post('/quantity/:id',userEnsureAuthenticated,CartController.quantity);
      router.post('/coupon',userEnsureAuthenticated,CartController.coupon);
      router.all('/addCart/:id',userEnsureAuthenticated,CartController.addCart);
      router.get('/checkout',userEnsureAuthenticated,CartController.checkout);
      router.get('/delete/:id',userEnsureAuthenticated,CartController.delete);
      router.post('/success',userEnsureAuthenticated,CartController.success);
      router.get('/logout',userEnsureAuthenticated,function(req,res){
            req.logout(function(err){
                  if (err) {
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('/'); 
                  } else {
                        res.redirect('/login'); 
                  }
            });
            
      });
})); */






module.exports  = router
   