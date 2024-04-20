
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    
  view:async function(req,res){
    return res.render('Backend/customer',{ 
      layout: 'Backend/layout',
    })
  },
  list:async function(req,res){
   
    const page = req.query.start || 1;
    const pageSize = req.query.length || 10; // Default page size
    const offset = (page - 1) * pageSize;
    const search = req.query.search || '';
    const totalCount = await prisma.user.count({
      where:{
        role:'user'
      }
    })
    const searchCount = await prisma.user.count({
      where: {
        role:'user',
        username: {
          contains: search || '',
        },
        email: {
          contains: search || '',
        },
       
      }
    });

    let data = await prisma.user.findMany({
          take: +pageSize,
          skip: +offset,
          where: {
            role:'user',
            username: {
              contains: search || '',
            },
            email: {
              contains: search || '',
            },
          },
    });  

   
   
    return res.status(200).json({
          success: true,
          iTotalRecords: totalCount || 0,
          iTotalDisplayRecords: searchCount || 0,
          aaData : data || []
    })

  },
  

}