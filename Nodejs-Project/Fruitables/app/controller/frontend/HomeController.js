const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
    view:function(req,res){
     return res.render('frontend/index',{layout: 'Frontend/layout',url:url(req,res)})
    },
    home:async function(req,res){
        const brands = await prisma.brand.findMany({
            where: {
              status: 1,
            }
        })

        
      const products = await prisma.product.findMany({
        where: {
          status: 1,
          brandId:{
            in:brands.map(item=>item.id)
          }
        },
        take: 8,
      })
        
        return res.render('frontend/index',{layout: 'Frontend/layout',url:url(req,res),brand:brands,products:products})
    },
    contact:function(req,res){
        return res.render('frontend/contact',{layout: 'Frontend/layout',url:url(req,res)})
    }
  
}