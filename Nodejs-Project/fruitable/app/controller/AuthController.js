const { PrismaClient } = require('@prisma/client');
// var express = require('express');
const prisma = new PrismaClient();
// const passport = require('passport');
const { validate,checkUser } = require('../config/validate');

module.exports = {
    adminLogin:async function(req,res,next){
      
      if (req.method === 'GET') {
          const messages = req.flash('error');   
          return res.render('Auth/admin-login',{layout: 'Auth/layout',messages})
      } else if (req.method === 'POST') {
           /*  const { email,password } = req.body;
            req.body.role= 'admin'
            passport.authenticate('local', {
              successRedirect: '/admin/dashboard',
              failureRedirect: '/admin/login',
              failureFlash: true
            })(req, res, next); */
            const user = await validate(req.body);
            if (user && user.role=='admin') {
              /* res.cookie("user", user); */
              req.session.user=user;
              req.body.role= 'admin'
              res.redirect('/admin/dashboard');
            } else {
              req.flash('error', 'Invalied Creditial');
              
              return res.redirect('back');
              // res.render('/admin/login', { error: 'Invalid username or password' });
            }

      } else {
        res.status(405).send('Method Not Allowed');
      }
    },
    login:async function(req,res,next){
      if (req.method === 'GET') {
          const messages = req.flash('error');
          return res.render('Auth/login',{layout: 'Auth/layout',messages:messages})
      } else if (req.method === 'POST') {
            /*  const { email,password } = req.body;
                req.body.role= 'user'
                passport.authenticate('local', {
                  successRedirect: '/home',
                  failureRedirect: '/login',
                  failureFlash: true
                })(req, res, next); */
            
            const user = await validate(req.body);
            if (user && user.role=='user') {
              /* res.cookie("user", user); */
              req.session.user=user;
              req.body.role= 'user'
              res.redirect('/home');
            } else {
              req.flash('error', 'Invalied Creditial');
              return res.redirect('back');
              // res.render('/login', { error: 'Invalid username or password' });
            }
      } else {
        res.status(405).send('Method Not Allowed');
      }
    },
    register:async function(req,res){
      if (req.method === 'GET') {
        const messages = req.flash('error');   
        return res.render('Auth/register',{layout: 'Auth/layout',messages})
      } else if (req.method === 'POST') {
            const { email,password,username } = req.body;
            const check = await checkUser({email,username});
      
            if(check==false){
              const newUser = await prisma.user.create({
                data: {
                  email: email,
                  password: password,
                  username:username,
                  role:'user'
                },
              });
              return res.redirect('/login')
            }
            const messages = req.flash('error','Email Already Registered!');   
            return res.redirect('back')
            
      } else {
        res.status(405).send('Method Not Allowed');
      }
     
    },
  

    
 
}