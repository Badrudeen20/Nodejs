const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../helper/url');
module.exports = {
    adminLogin:async function(req,res,next){
      if (req.method === 'GET') {
            return res.render('auth/admin-login',{layout: 'Auth/layout',url:url(req,res)})
      } else if (req.method === 'POST') {
            const { email,password } = req.body;
            req.body.role= 'admin'
            passport.authenticate('local', {
              successRedirect: '/admin/dashboard',
              failureRedirect: '/admin/login',
              failureFlash: true
            })(req, res, next);
      } else {
        res.status(405).send('Method Not Allowed');
      }
    },
    login:async function(req,res,next){
      if (req.method === 'GET') {
            return res.render('auth/login',{layout: 'Auth/layout',url:url(req,res)})
      } else if (req.method === 'POST') {
            const { email,password } = req.body;
            req.body.role= 'user'
            passport.authenticate('local', {
              successRedirect: '/home',
              failureRedirect: '/login',
              failureFlash: true
            })(req, res, next);
      } else {
        res.status(405).send('Method Not Allowed');
      }
    },
    register:async function(req,res){
      
      if (req.method === 'GET') {
            return res.render('auth/register',{layout: 'Auth/layout',url:url(req,res)})
      } else if (req.method === 'POST') {
            const { email,password,username } = req.body;
            const newUser = await prisma.user.create({
              data: {
                email: email,
                password: password,
                username:username,
                role:'user'
              },
            });
            return res.redirect('/login')
      } else {
        res.status(405).send('Method Not Allowed');
      }
     
    },
  

    
 
}