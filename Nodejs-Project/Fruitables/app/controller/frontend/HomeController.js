const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
    view:function(req,res){
     return res.render('frontend/index',{layout: 'Frontend/layout',url:url(req,res)})
    },
    home:function(req,res){
     return res.render('frontend/index',{layout: 'Frontend/layout',url:url(req,res)})
    },
    contact:function(req,res){
        return res.render('frontend/contact',{layout: 'Frontend/layout',url:url(req,res)})
    }
  
}