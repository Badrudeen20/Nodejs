const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
module.exports = {
   
    cart:async function(req,res){
      const user = res.locals.user
      const order = await prisma.order.findMany({
        include:{product:true},
        where: {
          userId: user.id,
          status:'CART'
        }
      })
      return res.render('Frontend/cart',{
        layout: 'Frontend/layout',
        order:order
      })
    },
    addCart:async function(req,res){
      const user = res.locals.user
      const product = await prisma.product.findUnique({
        where: {
          id:parseInt(req.params.id),
        },
      })
      if(req.method === 'POST'){
        var { quantity } = req.body
      }
      const order = await prisma.order.create({
        data: {
          productId: product.id,
          userId: user.id,
          price:product.price,
          status:'CART',
          quantity:parseInt(quantity) || 1
        },
      });
      return res.redirect('back')
    },
    quantity:async function(req,res){
      const {quantity} = req.body
      const orderId = req.params.id
      const updated = await prisma.order.update({
        where: {
          id: parseInt(orderId),
        },
        data: {
          quantity: parseInt(quantity),
        },
      });
     
      return res.redirect('back')
    },
    coupon:async function(req,res){
      const user = res.locals.user
      const { code } = req.body  

      const orders = await prisma.order.findMany({
        where: { userId: user.id}, // Use the orderId field for the where condition
      });
      const coupon = await prisma.coupon.findUnique({
        where:{
          code:code,
          status:'ACTIVE'
        }
      })

     

      // Update each fetched record with the new data
      const updatedRecords = await Promise.all(
        
        orders.map(async (record) => {
          // Update the record with the new data
          const updatedRecord = await prisma.order.update({
            where: { id: record.id }, // Use the ID of the fetched record
            data: {
              discount:(record.price * (coupon.discount/100)) || 0
            }, // New data to update
          });
          return updatedRecord;
        })
      );
     
      return res.redirect('back')
    },
    checkout:async function(req,res){
      const user = res.locals.user
      const order = await prisma.order.findMany({
        include:{product:true},
        where: {
          userId: user.id,
          status:'CART'
        }
      })
      return res.render('Frontend/checkout',{
        layout: 'Frontend/layout',
        order:order
      })
    },
    delete:async function(req,res){
      const destroy = await prisma.order.delete({
        where: {
          id: +(req.params.id),
        },
      })
      return res.redirect('back')
    },
    success:async function(req,res){
      const user = res.locals.user
      const order = await prisma.order.findMany({
        where:{
          userId:userData.id,
          status:'CART'
        }
      })
     
      if(order.length > 0){
        const cartId = Math.floor(Math.random()*1000000000)
        for (const record of order) {
          const updateOrder = await prisma.order.update({
            where:{
               id:+record.id
            },
            data: {
              cartId:cartId.toString(),
              status:'SHOP'
            },
          });
        }
        const shop = await prisma.shop.create({
          data: {
            userId:userData.id,
            price:order.reduce((acc,cur,ind,arr)=>{ return acc += cur.price * cur.quantity},0),
            discount:order.reduce((acc,cur,ind,arr)=>{ return acc += cur.discount},0),
            cartId:cartId.toString()
          },
        });
        
        return res.render('Frontend/success',{
          layout: 'Frontend/layout',
        })
      }else{
        return res.redirect('back')
      }
      
    }
  
}