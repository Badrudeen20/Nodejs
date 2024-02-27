const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const passport = require('passport');
module.exports = {
    
    login:async function(req,res,next){ 
      if (req.method === 'GET') {
            return res.render('frontend/login',{ layout: 'frontend/layout' })
      } else if (req.method === 'POST') {
            const { email,password } = req.body;
            passport.authenticate('local', {
              successRedirect: '/dashboard',
              failureRedirect: '/login',
              failureFlash: true
            })(req, res, next);
           
      } else {
        res.status(405).send('Method Not Allowed');
      }
     
    },
    register:async function(req,res){ 
      if (req.method === 'GET') {
            return res.render('frontend/register',{ layout: 'frontend/layout' })
      } else if (req.method === 'POST') {
            const { email,password,username } = req.body;
            const newUser = await prisma.user.create({
              data: {
                email: email,
                password: password,
                username:username
              },
            });
            return res.redirect('/login')
      } else {
        res.status(405).send('Method Not Allowed');
      }
     
    },
  

    
 
}