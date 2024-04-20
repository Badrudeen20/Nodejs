const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
      authUser:async function(user){
            // let user = await req.user
            if(user){
                  user = await prisma.user.findUnique({
                        include:{ orders: {
                              where: {
                                  status: "CART" // Specify the status here
                              }
                          }
                        },
                        where:{
                          id:user.id,
                          
                        }
                  })
                  
            }
            
            return user
      }
}