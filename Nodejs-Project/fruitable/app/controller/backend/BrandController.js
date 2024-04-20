const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    
  view:async function(req,res){
    return res.render('Backend/brand',{ 
      layout: 'Backend/layout',  
    })
  },
  list:async function(req,res){
    
    const page = req.query.start || 1;
    const pageSize = req.query.length || 10; // Default page size
    const offset = (page - 1) * pageSize;
    const search = req.query.search || '';
    const totalCount = await prisma.brand.count()
    const searchCount = await prisma.brand.count({
      where: {
        name: {
          contains: search || '',
        }, 
      }
    });

    let data = await prisma.brand.findMany({
          take: +pageSize,
          skip: +offset,
          where: {
            name: {
              contains: search || '',
            }
          },
    });  
    
    data = data.map(item=>{
       return  {
        id:item.id,
        name:item.name,
        status:item.status,
        date:item.createdAt,
        action:`<button type="button" class="btn btn-success" onclick="formModal(${item.id},'${item.name}')">Edit</button>
                <a href="brand/${item.id}" class="btn btn-warning" onclick="formAlert(${item.id})">Delete</a>
               `
       }
    })
   
   
    return res.status(200).json({
          success: true,
          iTotalRecords: totalCount || 0,
          iTotalDisplayRecords: searchCount || 0,
          aaData : data || []
    })

  },

  add:async function(req,res){
    const { brand } = req.body
    const newBrand = await prisma.brand.create({
      data: {
        name:brand
      },
    });
    return res.redirect('back')
  },
  edit:async function(req,res){
    const { brand } = req.body
    const brandId = req.params.id
    const updateBrand = await prisma.brand.update({
      where:{
         id:+brandId
      },
      data: {
        name:brand
      },
    });
    return res.redirect('back')
  },
  delete:async function(req,res){
    const deleteBrand = await prisma.brand.delete({
      where: {
        id: +(req.params.id),
      },
    })
    return res.redirect('back')
  }
  

}