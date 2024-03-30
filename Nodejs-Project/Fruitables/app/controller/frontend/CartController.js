const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
const { url } = require('../../helper/url');
module.exports = {
   
    cart:async function(req,res){
      const user = await req.user
      const order = await prisma.order.findMany({
        where: {
          userId: user.id,
        }
      })
      return res.render('frontend/cart',{
        layout: 'Frontend/layout',
        url:url(req,res),
        user:user,
        order:order
      })
    },
    addCart:async function(req,res){
      const user = await req.user
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
          quantity:parseInt(quantity) || 0
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
      const user = await req.user
      const {code} = req.body  

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
      const user = await req.user
      const order = await prisma.order.findMany({
        where: {
          userId: user.id,
        }
      })
      return res.render('frontend/checkout',{
        layout: 'Frontend/layout',
        url:url(req,res),
        user:user,
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
    }
  
}