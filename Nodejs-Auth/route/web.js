const express = require('express')
const UserController = require('../app/controller/UserController');
const AuthController = require('../app/controller/AuthController');
const  group = require('../app/helper/group');
const  auth  = require('../app/middleware/auth');
const { forwardAuthenticated,ensureAuthenticated } = require('../app/config/auth');

const router = express.Router()
router.get('/',AuthController.view);

router.all('/login',forwardAuthenticated,AuthController.login);
router.all('/register',forwardAuthenticated,AuthController.register);
router.use("/dashboard", ensureAuthenticated, group((router) => {
      router.get('/',UserController.view); 
      
}));
router.get('/logout',ensureAuthenticated, (req, res) => {
      req.logout();
      req.flash('success_msg', 'You are logged out');
      res.redirect('/login');
});




module.exports  = router
   