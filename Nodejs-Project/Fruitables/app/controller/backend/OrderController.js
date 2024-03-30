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
    const totalCount = await prisma.order.count()
    const searchCount = await prisma.order.count({
      where: {
        product: {
          name: {
            contains: search || '' // or use 'startsWith' for searching by prefix
          },
        },
        user: {
          username: {
            contains: search || '' // or use 'startsWith' for searching by prefix
          }
        }
      }
    });

    let data = await prisma.order.findMany({
          take: +pageSize,
          skip: +offset,
          include: { product: true,user:true},
          where: {
            product: {
              name: {
                contains: search || '' // or use 'startsWith' for searching by prefix
              }
            },
            user: {
              username: {
                contains: search || '' // or use 'startsWith' for searching by prefix
              }
            }
          }
    
    });  

    data = data.map(item=>{
      return  {
        id:item.id,
        user:item.user.username,
        product:item.product.name,
        price:item.price,
        date:item.createdAt
      }
    })
    
    return res.status(200).json({
          success: true,
          iTotalRecords: totalCount || 0,
          iTotalDisplayRecords: searchCount || 0,
          aaData : data || []
    })

  },
  

}