const db = require('../models/index')
const { Op } = require('sequelize');
const { validationResult } = require("express-validator")
const xlsx = require("xlsx")
const path = require('path')
const fs = require('fs');

module.exports = {
    
    view:async function(req,res){ 
      const url = `https://${req.get('host')}${req.originalUrl}`;
      const message = req.session.message;
      delete req.session.message; // Clear the message from the session
      return res.render('user/index',{url:url,errors:message})
    },
    list:async function(req,res){
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
       return ele.dataValues['action'] = `<button class="btn btn-sm btn-primary" data-toggle="modal" onclick="editUser(${ele.id})" data-target="#editUserModal" >Edit</button>
       <a class="btn btn-sm btn-danger" href="/delete/${ele.id}">Delete</a>`
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
      const url = `http://${req.get('host')}`;
      //validation
      const errors= validationResult(req);
      if(!errors.isEmpty()){
          req.session.message= errors.mapped();
          return res.redirect('/')
          
      }

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
    importUser:async function(req,res){
       
      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      const data = sheetData.filter(item=> {
        if(item.username && item.email && item.password){
          return item
        }
      })
      const user = await db.Users.bulkCreate(data);

      const rootDir = path.resolve(__dirname, '../..');
      const folderPath = rootDir+"/uploads";
      if (fs.existsSync(folderPath)) {
        
        const files = fs.readdirSync(folderPath);
        for (const file of files) {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isFile()) {
                fs.unlinkSync(curPath);
            }
        }
        // fs.rmdirSync(folderPath); // Delete the folder itself
        console.log(`Deleted folder: ${folderPath}`);
      } else {
          console.error(`Folder not found: ${folderPath}`);
      }
      res.redirect("back")
    },
    downloadSample:async function(req,res){
      //const filePath = path.join(__dirname, 'public', req.url);
      const dirname = path.resolve(__dirname, '../..');
      const filePath = dirname+'/public/sample.xlsx'
      const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('File not found');
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        }
    });  
    }

 
}