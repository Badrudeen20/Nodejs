const { url } = require("../../helper/url");
const { user } = require("../../helper/user");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
    
  view:async function(req,res){
    const item = {}
    item.order = await prisma.shop.count()
    item.customer = await prisma.user.count({
      where:{
        role:'user'
      }
    })
   
    return res.render('Backend/dashboard',{ 
      layout: 'Backend/layout',
      url:url(req,res),
      user: await user(req,res),
      item:item
    })
  },
 




 
}