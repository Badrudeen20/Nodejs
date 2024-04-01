const { url } = require("../../helper/url");
const { PrismaClient } = require('@prisma/client');
const { user } = require("../../helper/user");
const { category, product } = require("./DashboardController");
const prisma = new PrismaClient();
const path = require('path');
const fs = require('fs')
const rootDir = path.resolve(__dirname, '../../../public/upload/');
module.exports = {
    
  view:async function(req,res){
    return res.render('Backend/product',{ 
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
        include: {categories:true,brand:true},
        where:{
          id:+(req.params.id)
        }
      })
    }
    item.brand = await prisma.brand.findMany()
    
    return res.render('Backend/add-product',{ 
      layout: 'Backend/layout',
      url:url(req,res),
      user:await user(req,res) ,
      item:item
    })
  },

  createUpdate:async function(req,res){
   
      let {name,brand,price,additional,search,status,img,desc,filename} = req.body
      
      if(req.body.id){
      
        const existFileName = await prisma.product.findUnique({
          where:{
            id:+(req.body.id)
          }
        })
        
        if(existFileName.image!==filename){
            if(req.files){
              const file = req.files.img
    
              // Check if the file is an image
              if (!file.mimetype.startsWith('image/')) {
                return res.status(400).send('Only images are allowed.');
              }
              if(!fs.existsSync(rootDir)) {
                fs.mkdirSync(rootDir, { recursive: true });
              }
    
              // Remove existing image file if it exists
              if(existFileName.image){
                const fileExist = path.join(rootDir, existFileName.image);
                if(fs.existsSync(fileExist)) {
                    fs.unlinkSync(fileExist);
                }
              }
              
    
              filename = generateRandomId()+file.name
              const filePath = path.join(rootDir, filename);
              file.mv(filePath,function(err){
                if (err) {
                  return res.status(500).send(err);
                }
              })
    
            }
        }

       

        const update = await prisma.product.update({
          where:{
             id:+(req.body.id)
          },
          data: {
            name: name,
            brand: { connect: { id: +brand } },
            price: +price,
            search: search,
            status: status,
            image: filename,
            description: desc,
            rating:5
          },
        });
      
        const categories = await prisma.category.update({
          where: {
            id: parseInt(req.body.catId) // Assuming catId is a string, convert it to an integer
          },
          data: {
            additional: additional,
            productId: parseInt(req.body.id) // Assuming id is a string, convert it to an integer
          }
        })
      }else{

        if(req.files){
          const file = req.files.img
          // Check if the file is an image
          if (!file.mimetype.startsWith('image/')) {
            return res.status(400).send('Only images are allowed.');
          }
          if(!fs.existsSync(rootDir)) {
            fs.mkdirSync(rootDir, { recursive: true });
          }

          filename = generateRandomId()+file.name
          const filePath = path.join(rootDir, filename);
          file.mv(filePath,function(err){
            if (err) {
              return res.status(500).send(err);
            }
          })

        }

        const product = await prisma.product.create({
          data: {
            name: name,
            brand: { connect: { id: +brand } },
            price: +price,
            search: search,
            status: status,
            image: filename,
            description: desc,
            rating:5
          }
        });
        const categories = await prisma.category.create({
          data:{
            additional:additional,
            productId:product.id
          }
        })
      }
      return res.redirect('products')
  }
  

}

function generateRandomId() {
  const randomNumber = Math.floor(Math.random() * 10000);
  const randomId = randomNumber.toString().padStart(5, '0');
  return randomId;
}