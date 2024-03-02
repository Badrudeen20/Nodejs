const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
async function checkAuth(req, res, next) {
      const mobile = req.cookies?.uid;
    
      if (!mobile) return res.redirect("/login");
      const user = await prisma.User.findUnique({
            where:{mobile:mobile}
      })
      if (!user) return res.redirect("/login");
      req.user = user;
      next();
}
async function checkNotAuth(req, res, next) {
      const mobile = req.cookies?.uid;
      if (mobile){
            const user = await prisma.User.findUnique({
                  where:{mobile:mobile}
            })
            if (user) return res.redirect("/user");
      }
      next();
}
module.exports = {
      checkAuth,
      checkNotAuth
};