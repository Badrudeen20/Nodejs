const express = require("express");
const db = require('../models/index')
const { Op } = require('sequelize');
const { setUser } = require("../helper/auth");
const { v4: uuidv4 } = require("uuid");
module.exports = {
    
    login:async function(req,res){ 
      if (req.method === 'GET') {
            return res.render('auth/login')
      } else if (req.method === 'POST') {
            const { email,password } = req.body;
            const user = await db.Users.findOne({ where: { email } });
            if (user) {
                  // const isPasswordValid = await bcrypt.compare(providedPassword, user.password);
                  if (user.password==password) {
                    const sessionId = uuidv4();
                    setUser(sessionId, user);
                    res.cookie("uid", sessionId);
                    return res.redirect('auth/user');
                  } else {
                    return res.redirect('back')
                  }
                } else {
                  return res.redirect('back')
                }

      } else {
        res.status(405).send('Method Not Allowed');
      }
     
    },
  

    
 
}