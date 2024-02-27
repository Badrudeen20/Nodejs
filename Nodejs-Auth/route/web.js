const express = require('express')
const UserController = require('../app/controller/UserController');
const AuthController = require('../app/controller/AuthController');
const  group = require('../app/helper/group');
const { checkAuth, checkGuest } = require('../app/middleware/checkAuth');
const router = express.Router()
router.get('/',(req,res)=>{
      return res.send('Home')
});

router.all('/login',checkGuest,AuthController.login);

router.use("/auth", checkAuth, group((router) => {
      router.get('/user',UserController.view);
      router.get('/list',UserController.list);
      router.post('/add',UserController.addUser);
      router.post('/edit',UserController.editUser);
      router.post('/update',UserController.updateUser);
      router.get('/delete/:id',UserController.deleteUser);
}));




module.exports  = router
   