const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    
  view:async function(req,res){
    
    return res.render('dashboard/home',{ layout: 'dashboard/layout',user: req.user })
  }

 
}