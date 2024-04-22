const express = require('express');
const { authUser } = require('../helper/auth');
const app = express();

module.exports = {
  
  userEnsureAuthenticated: async function(req, res, next) {
      if(req.cookies?.user && req.cookies.user.role=='user') {
         const user = req.cookies.user
         res.locals.user = await authUser(user);
         return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
  },
  adminEnsureAuthenticated: async function(req, res, next) {
      if(req.cookies?.user && req.cookies.user.role=='admin') {
         res.locals.user = req.cookies.user;
         return next();
      }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/admin/login');
  },
  userForwardAuthenticated: async function(req, res, next) {
    if(!req.cookies?.user || req.cookies.user.role!=='user') {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/home');      
  },
  adminForwardAuthenticated:async function(req, res, next) {
    if(!req.cookies?.user || req.cookies.user.role!=='admin') {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/admin/dashboard');      
  },
  userCheckAuthenticated:async function(req,res,next){
    if(req.cookies?.user && req.cookies.user.role=='user') {
      const user = req.cookies.user
      console.log(user)
      res.locals.user = await authUser(user);
      
    }else{
      res.locals.user = undefined
    }
    return next();
  }



 

};
