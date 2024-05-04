const { PrismaClient } = require('@prisma/client');
const { category, product } = require("./DashboardController");
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs');
const { rootPath } = require('../../../helper/url');
// const rootDir = path.resolve(__dirname, '../../../public/upload/');
const rootDir = path.join(rootPath, 'public/upload/');

module.exports = {
      
  view:async function(req,res){
    return res.render('Backend/product',{ 
      layout: 'Backend/layout',
    })
  },
  list:async function(req,res){
   
    const page = req.query.start || 1;
    const pageSize = req.query.length || 10; // Default page size
    const offset = (page - 1) * pageSize;
    const search = req.query.search || '';
    const totalCount = await prisma.product.count()
    const searchCount = await prisma.product.count({
      where: {
        name: {
          contains: search || '',
        },
        search: {
          contains: search || '',
        },
       
      }
    });

    let data = await prisma.product.findMany({
          take: +pageSize,
          skip: +offset,
          where: {
            name: {
              contains: search || '',
            },
            search: {
              contains: search || '',
            },
          },
    });  

    data = data.map(item=>{
      return  {
       id:item.id,
       name:item.name,
       price:item.price,
       status:item.status,
       action:`<a href="edit-product/${item.id}" class="btn btn-success">Edit</a>`
      }
   })
   
    return res.status(200).json({
          success: true,
          iTotalRecords: totalCount || 0,
          iTotalDisplayRecords: searchCount || 0,
          aaData : data || []
    })

  },
  addEdit:async function(req,res){
    const item = {}
    if(req.params.id){
      item.product = await prisma.product.findUnique({
        where:{
          id:+(req.params.id)
        }
      })
    }
    
    return res.render('Backend/add-product',{ 
      layout: 'Backend/layout',
      item:item
    })
  },

  createUpdate:async function(req,res){
   
      let {name,price,search,status,desc,filename} = req.body
     
      if(req.body.id){
        await prisma.product.update({
          where:{
             id:+(req.body.id)
          },
          data: {
            name: name,
            price: +price,
            search: search,
            status: status,
            image: filename,
            description: desc,
            rating:5
          },
        });
      
      }else{
         await prisma.product.create({
          data: {
            name: name,
            price: +price,
            search: search,
            status: status,
            image: filename,
            description: desc,
            rating:5
          }
        });
       
      }
      return res.redirect('products')
  }
  

}

