const express = require('express');
const DashboardController = require('../app/controller/backend/DashboardController');
const AuthController = require('../app/controller/AuthController');
const { adminForwardAuthenticated,userForwardAuthenticated,adminEnsureAuthenticated,userEnsureAuthenticated } = require('../app/config/auth');
const  group = require('../app/helper/group');
const HomeController = require('../app/controller/frontend/HomeController');
const ProductController = require('../app/controller/frontend/ProductController');


const router = express.Router()


// Backend Controller

router.all('/',HomeController.view);
router.all('/admin/login',adminForwardAuthenticated,AuthController.adminLogin);
router.all('/login',userForwardAuthenticated,AuthController.login);
router.all('/register',userForwardAuthenticated,AuthController.register);
router.use("/admin", adminEnsureAuthenticated, group((router) => {
      router.get('/dashboard',DashboardController.view); 
      router.get('/logout',function(req,res){
            req.logout(function(err){
                  if (err) {
                        console.error('Error occurred while logging out:', err);
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('back'); // Redirect to home page or login page
                  } else {
                        req.flash('success_msg', 'You are logged out');
                        res.redirect('/admin/login'); // Redirect to the login page
                  }
            });
           
      });
}));

router.use("/user", userEnsureAuthenticated, group((router) => {
      router.get('/home',HomeController.home);
      router.get('/shop',ProductController.shop);
      router.get('/shop-detail',ProductController.detail);
      router.get('/contact',HomeController.contact);
      router.get('/logout',function(req,res){
            req.logout(function(err){
                  if (err) {
                        console.error('Error occurred while logging out:', err);
                        req.flash('error_msg', 'Failed to logout');
                        res.redirect('/'); // Redirect to home page or login page
                  } else {
                        req.flash('success_msg', 'You are logged out');
                        res.redirect('/login'); // Redirect to the login page
                  }
            });
            
      });
      
}));






module.exports  = router
   