const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
  
    home:async function(req,res){
      const brands = await prisma.brand.findMany({
            where: {
              status: 'ACTIVE',
            }
      })
     
      const user = await req.user
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
        user:user
      })
    },
    contact:async function(req,res){
        const user = await req.user
        return res.render('Frontend/contact',{layout: 'Frontend/layout',url:url(req,res),user:user})
    }
  
}