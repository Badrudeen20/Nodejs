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
      item:item
    })
  },
 




 
}