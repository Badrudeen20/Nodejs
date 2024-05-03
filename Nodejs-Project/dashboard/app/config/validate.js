const express = require('express');
const app = express();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
      validate:async function({email,password}){
            const user = await prisma.user.findUnique({
                  where: {email:email},
            })
            if(user && user.password == password) return user
            return false    
      },
      checkUser:async function({email,username}){
            const user = await prisma.user.findUnique({
                  where: {email:email},
            })
            if(user) return user
            return false    
      }
}
