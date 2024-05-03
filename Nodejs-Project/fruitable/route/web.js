const express = require('express');
const DashboardController = require('../app/controller/backend/DashboardController');
const AuthController = require('../app/controller/AuthController');
const { adminForwardAuthenticated,
        userForwardAuthenticated,
        adminEnsureAuthenticated,
        userEnsureAuthenticated, 
        userCheckAuthenticated } = require('../app/config/pass');
const  group = require('../helper/group');
const HomeController = require('../app/controller/frontend/HomeController');

const CustomerController = require('../app/controller/backend/CustomerController');
const OrderController = require('../app/controller/backend/OrderController');
const ProductController = require('../app/controller/backend/ProductController');
const ShopController = require('../app/controller/frontend/ShopController');
const CartController = require('../app/controller/frontend/CartController');
const BrandController = require('../app/controller/backend/BrandController');


const router = express.Router()


// Auth Controller
router.all('/admin/login',adminForwardAuthenticated,AuthController.adminLogin);
router.all('/login',userForwardAuthenticated,AuthController.login);
router.all('/register',userForwardAuthenticated,AuthController.register);
// Backend Controller

router.use("/admin",adminEnsureAuthenticated, group((route) => {
      route.get('/dashboard',DashboardController.view); 
      route.get('/customers',CustomerController.view); 
      route.get('/customers/list',CustomerController.list); 
      route.get('/orders',OrderController.view); 
      route.get('/orders/list',OrderController.list); 
      route.get('/products',ProductController.view); 
      route.get('/products/list',ProductController.list); 
      route.get('/add-product',ProductController.addEdit); 
      route.get('/edit-product/:id',ProductController.addEdit); 
      route.post('/create-product',ProductController.createUpdate); 
      route.get('/brands',BrandController.view); 
      route.get('/brands/list',BrandController.list); 
      route.post('/brand',BrandController.add); 
      route.post('/brand/:id',BrandController.edit); 
      route.get('/brand/:id',BrandController.delete); 
      route.get('/logout',function(req,res){

           /*  res.clearCookie('user')
            req.logout(function(err){
                  if (err) {
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('back'); 
                  } else {
                        req.flash('success_msg', 'You are logged out');
                        res.redirect('/admin/login'); 
                  }
            });  */ 

            req.session.destroy((err) => {
                  if (err) {
                      console.error('Error destroying session:', err);
                  } else {
                        res.redirect('/admin/login'); 
                  }
            });
      });
}));


// Frontend Controller


router.use(userCheckAuthenticated,group((route)=>{
      route.all('/',HomeController.home);
      route.get('/home',HomeController.home);
      route.get('/shop',ShopController.shop);
      route.get('/shop-detail/:id',ShopController.detail);
      route.get('/contact',HomeController.contact);
}))


//Auth Frontend Controller


router.use(userEnsureAuthenticated, group((route) => {
      route.get('/cart',CartController.cart);
      route.post('/quantity/:id',CartController.quantity);
      route.post('/coupon',CartController.coupon);
      route.all('/addCart/:id',CartController.addCart);
      route.get('/checkout',CartController.checkout);
      route.get('/delete/:id',CartController.delete);
      route.post('/success',CartController.success);
      route.get('/logout',function(req,res){

            /* res.clearCookie('user')
            req.logout(function(err){
                  if (err) {
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('/'); 
                  } else {
                        res.redirect('/login'); 
                  }
            }); */

            req.session.destroy((err) => {
                  if (err) {
                      console.error('Error destroying session:', err);
                  } else {
                      res.redirect('/login'); 
                  }
            });
            
      });
}));






module.exports  = router
   