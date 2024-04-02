const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
  
    shop:async function(req,res){
      const user = await req.user
      const query = req.query
     
      const brands = await prisma.brand.findMany({
        where: {
          status: 'ACTIVE',
        }
      })
     
      if(query.brand){
        var brandId = brands.filter(item => query.brand.includes(item.name)).map(item=>item.id);
      }else{
        var brandId = brands.map(item=>item.id)
      }

      let product = await prisma.product.findMany({
        select: {
          id: true,
          price:true
        },
        where: {
          status: 'ACTIVE',
          brandId: {
            in: brandId,
          },
          price: {
            gte: parseFloat(0), // Greater than or equal to minimum price
            lte: parseFloat(query.price) || parseFloat(5000)  // Less than or equal to maximum price
          },
          OR: [
            {
              search: {
                contains: query.search || '',
              },
            }
          ]
          
        }
      })
      
      const categories = await prisma.category.findMany({
        where: {
          productId: {
            in:product.map(item=>item.id)
          },
        }
      })
      
      let filter = []
      for(const key in query) {
        if(categories.some(item=>item[key])){
          const array = categories.filter(item=>query[key].includes(item[key])).map(item=>item.productId)
          const uniqueArray = [...new Set(array)];
          product = product.filter(item => uniqueArray.includes(item.id));
          
        }
      }
     
      const productId = [...new Set(product.map(item=>item.id))]
     
      for (let i = 0; i < categories.length; i++) {
        delete categories[i].id
        delete categories[i].productId
        delete categories[i].createdAt
        delete categories[i].updatedAt
        for (const key in categories[i]) {
            if(filter.some(item=>item[key])){
                for(let k = 0; k < filter.length; k++) {
                  if(filter[k][key]){
                    if(!filter[k][key].includes(categories[i][key])){
                      filter[k][key] = [...filter[k][key],categories[i][key]]
                    }
                  }
                }
            }else{
              filter.push({[key]:[categories[i][key]]})
            }
        }
      
      }

      const pageNumber = query.page || 1; // Specify the page number
      const pageSize = 3; // Specify the number of items per page
      const skip = (pageNumber - 1) * pageSize; // Calculate the number of items to skip
   
      const list = await prisma.product.findMany({
          where:{
            id:{
              in: productId || []
            },
          },
          take: pageSize,
          skip: skip
      })
      const totalItems = productId.length; // Total number of items
      const totalPages = Math.ceil(totalItems / pageSize); // Calculate the total number of pages
     
      return res.render('Frontend/shop',{
       layout: 'Frontend/layout',
       url:url(req,res),
       brand:brands,
       query:query,
       filter:filter,
       product:list,
       page:totalPages,
       pageNumber:pageNumber,
       user:user,
      })
    },
    detail:async function(req,res){
    
     const user = await req.user
     const productId = req.params.id
     let product = await prisma.product.findUnique({
        include:{categories:true},
        where:{
          id:parseInt(productId)
        }
     })
    
     const categories = await prisma.category.findMany({
      where: {
        productId: parseInt(productId),
      }
     })
     
     return res.render('Frontend/shop-detail',{
      layout: 'Frontend/layout',
      url:url(req,res),
      user:user,
      product:product,
      categories:categories
      })
    }
    
  
}
