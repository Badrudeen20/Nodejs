const express = require('express');
const { authUser } = require('../helper/auth');
const app = express();

module.exports = {
  
  userEnsureAuthenticated: async function(req, res, next) {
      if(req.session?.user && req.session?.user.role=='user') {
         const user = req.session.user
         res.locals.user = await authUser(user);
         return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/login');
  },
  adminEnsureAuthenticated: async function(req, res, next) {
      if(req.session?.user && req.session?.user.role=='admin') {
         res.locals.user = req.session.user;
         return next();
      }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/admin/login');
  },
  userForwardAuthenticated: async function(req, res, next) {
    if(req.session?.user && req.session?.user.role=='user') {
      res.redirect('/home');    
    }
    req.flash('error_msg', 'Please log in to view that resource');
    return next();
  },
  adminForwardAuthenticated:async function(req, res, next) {
    if(!req.session?.user || req.session?.user.role!=='admin') {
        return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/admin/dashboard');      
  },
  userCheckAuthenticated:async function(req,res,next){
    console.log(req.session?.user)
    if(req.session?.user && req.session?.user.role=='user') {
      const user = req.session.user
      res.locals.user = await authUser(user);
      
    }else{
      res.locals.user = undefined
    }
    return next();
  }

};
