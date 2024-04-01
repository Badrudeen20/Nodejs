const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({  
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true 
    }, (req, email, password, done) => {
      // By ID
      
      prisma.user.findUnique({
        where: {
          email:email,
        },
      }).then(user=>{
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        
        if(password==user.password && req.body.role==user.role){
          return done(null, user);
        }else{
          return done(null, false, { message: 'Password incorrect' });
        }
      })
 
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function(id, done) {
    const user = prisma.user.findUnique({
      where: {
        id:id,
      },
    })
    done(null,user);
    
  });
};
