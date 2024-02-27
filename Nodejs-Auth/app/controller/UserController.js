const express = require("express");
const db = require('../models/index')
const { Op } = require('sequelize');

module.exports = {
    
    view:async function(req,res){ 
      const url = `https://${req.get('host')}${req.originalUrl}`;
      return res.render('user/index',{url:url})
    },
    list:async function(req,res){
      const url = `https://${req.get('host')}${req.originalUrl}`;
      const page = req.query.start || 1;
      const pageSize = req.query.length || 10; // Default page size
      const offset = (page - 1) * pageSize;
      const search = req.query.search || '';
      const totalCount = await db.Users.count()
      const searchCount = await db.Users.count({ where: {
            [Op.or]: [
              { username: { [Op.like]: `%${search}%` } },
              { email: { [Op.like]: `%${search}%` } },
            ],
      }});
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
      const updateData =  data.map((ele)=>{
       return ele.dataValues['action'] = `<button class="btn btn-primary" data-toggle="modal" onclick="editUser(${ele.id})" data-target="#editUserModal" >Edit</button>
       <a class="btn btn-danger" href="/delete/${ele.id}">Delete</a>`
      })
     
      return res.status(200).json({
            success: true,
            iTotalRecords: totalCount,
            iTotalDisplayRecords: searchCount,
            aaData : data
      })
    },

    addUser:async function(req,res){
      const { username, email,password } = req.body;
      const user = await db.Users.create({ username, email,password });
      return res.redirect('back');
    },
    editUser:async function(req,res){
      const { id } = req.body;
      const user = await db.Users.findByPk(id);
      return res.json(user)
    },
    updateUser:async function(req,res){
      const { id,username,email } = req.body;
      const user = await db.Users.findByPk(id);
      user.username = username;
      user.email = email;
      await user.save();
      return res.redirect('back');
    },
    deleteUser:async function(req,res){
      const { id } = req.params;
      const user = await db.Users.findByPk(id);
      await user.destroy();
      return res.redirect('back');
    },

 
}