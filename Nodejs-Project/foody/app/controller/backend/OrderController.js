const { url } = require("../../helper/url");
const { PrismaClient } = require('@prisma/client');
const { user } = require("../../helper/user");
const prisma = new PrismaClient();
module.exports = {
    
  view:async function(req,res){
    return res.render('Backend/order',{ 
      layout: 'Backend/layout',
      url:url(req,res),
      user:await user(req,res) 
    })
  },
  list:async function(req,res){
   
    const page = req.query.start || 1;
    const pageSize = req.query.length || 10; // Default page size
    const offset = (page - 1) * pageSize;
    const search = req.query.search || '';
    const totalCount = await prisma.shop.count()
    const searchCount = await prisma.shop.count({
      where: {
        user: {
          username: {
            contains: search || '' // or use 'startsWith' for searching by prefix
          }
        }
      }
    });

    let shop = await prisma.shop.findMany({
          take: +pageSize,
          skip: +offset,
          include: { user:true},
          where: {
            user: {
              username: {
                contains: search || '' // or use 'startsWith' for searching by prefix
              }
            }
          }
    
    });  

    const product = await prisma.order.findMany({
      select: {
        product: true,
        cartId:true
      },
      where:{
        cartId:{
          in: shop.map(item=>item.cartId)
        },
        status:'SHOP'
      }
    })
   
    

    shop = shop.map(item=>{
      
      return  {
        id:item.id,
        user:item.user.username,
        product:product.filter(i=>(item.cartId==i.cartId)).map(i=>i.product.name).join(","),
        price:item.price,
        date:item.createdAt
      }
    })
    
    return res.status(200).json({
          success: true,
          iTotalRecords: totalCount || 0,
          iTotalDisplayRecords: searchCount || 0,
          aaData : shop || []
    })

  },
  

}