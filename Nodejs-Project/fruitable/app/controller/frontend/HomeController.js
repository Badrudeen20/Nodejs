const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
const { user } = require('../../helper/user');

module.exports = {
  
    home:async function(req,res){
      const brands = await prisma.brand.findMany({
            where: {
              status: 'ACTIVE',
            }
      })
     
      
      const products = await prisma.product.findMany({
        where: {
          status: 'ACTIVE',
          brandId:{
            in:brands.map(item=>item.id)
          }
        },
        take: 8,
      })
        
      return res.render('Frontend/index',{
        layout: 'Frontend/layout',
        url:url(req,res),
        brand:brands,
        products:products,
        user:await user(req,res)
      })
    },
    contact:async function(req,res){
        
        return res.render('Frontend/contact',{
          layout: 'Frontend/layout',
          url:url(req,res),
          user:await user(req,res)
        })
    }
  
}