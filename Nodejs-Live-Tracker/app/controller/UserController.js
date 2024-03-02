const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = {
  user: async function (req, res) { 
      res.render("user");
  },
  login: async function (req, res) { 
      if (req.method === 'GET') {
        const messages = req.flash('info');
        res.render("user/login",{ messages });
      }
      if (req.method === 'POST') {
         const { mobile } = req.body
         const user = await prisma.User.findUnique({  where: {
          mobile:mobile,
         }})
         if(user){
           res.cookie("uid", mobile);
           return res.redirect("/user")
         }
         req.flash('info', 'This number is not registered');
         return res.redirect("back")
      }
  },
  register: async function (req, res) { 
    if (req.method === 'GET') {
      const messages = req.flash('info');
      res.render("user/register",{ messages });
    }
    if (req.method === 'POST') {
       const {mobile,username} = req.body
       let emptyFields = []
       if(!mobile) {
         emptyFields.push('mobile')
       }
       if(!username) {
         emptyFields.push('username')
       }
       if(emptyFields.length > 0) {
         req.flash('info', 'Please fill in all the fields');
         return res.redirect("back");
       }
       const isExist = await prisma.user.count({
        where:{
          mobile:mobile
        }
       })
      if(isExist==0){
        const user = await prisma.User.create({
          data: {
            username:username,
            mobile: mobile,
            latitude: '',
            longitude: '',
            status: 0,
          },
        })
        res.redirect("/");
      }else{
        req.flash('info', 'This number is already exist!');
        return res.redirect("back");
      }
       
    }
      
  }
};
