const express = require("express");
const db = require('../models/index')
module.exports = {

    userList:async function(req,res){
      let data = await db.Users.findOne({ where: { id: 1 } });   
      res.json(data)
    },

    addUser:function(req,res){

    },

 
}