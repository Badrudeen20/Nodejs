const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
  
    shop:function(req,res){
     return res.render('frontend/shop',{layout: 'Frontend/layout',url:url(req,res)})
    },
    detail:function(req,res){
     return res.render('frontend/shop-detail',{layout: 'Frontend/layout',url:url(req,res)})
    }
  
}