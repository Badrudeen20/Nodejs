const express = require("express");
const db = require('../models/index')
const { Op } = require('sequelize');
module.exports = {
    
    view:async function(req,res){ 
      const url = `https://${req.get('host')}${req.originalUrl}`;
      return res.render('user/index',{url:url})
    },
    list:async function(req,res){
      const page = req.query.start || 1;
      const pageSize = req.query.length || 10; // Default page size
      const offset = (page - 1) * pageSize;
      const search = req.query.search || '';
      let data = await db.Users.findAll({
            limit: pageSize,
            offset: offset,
            where: {
                  [Op.or]: [
                    { username: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                  ],
            },
      });   
      return res.status(200).json({
            success: true,
            iTotalRecords: data.length,
            iTotalDisplayRecords: data.length,
            aaData : data
      })
    },

    addUser:function(req,res){

    },

 
}