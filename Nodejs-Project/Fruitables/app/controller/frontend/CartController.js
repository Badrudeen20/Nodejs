const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
   
    cart:function(req,res){
      return res.render('frontend/cart',{layout: 'Frontend/layout',url:url(req,res)})
    },
    addCart:function(req,res){
      console.log(req.params)
      return res.redirect('back')
    }
  
}