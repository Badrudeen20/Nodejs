const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
    
      // By ID
      prisma.user.findUnique({
        where: {
          email:email,
        },
      }).then(user=>{
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }
        if(password==user.password){
          return done(null, user);
        }else{
          return done(null, false, { message: 'Password incorrect' });
        }
      })
     /*  User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        if(password==user.passport){
          return done(null, user);
        }else{
          return done(null, false, { message: 'Password incorrect' });
        }

        // bcrypt.compare(password, user.password, (err, isMatch) => {
        //   if (err) throw err;
        //   if (isMatch) {
        //     return done(null, user);
        //   } else {
        //     return done(null, false, { message: 'Password incorrect' });
        //   }
        // });

      }); */
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
