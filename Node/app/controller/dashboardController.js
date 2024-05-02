
const path = require('path');
const { createtxt } = require("../../helper/common")
const rootPath = process.cwd();
const fs = require('fs')
module.exports = {
     view:function(req,res){
        const file = 'name.txt'
        const filePath = path.join(rootPath,"upload",file)
       
        createtxt(filePath,(err,data)=>{
           if(err) throw new Error('Something broke!'); 
           console.log(data)
           res.send('done')
        })
    
     },
     buffer:function(req,res){

         const dirPath = path.join(rootPath,"assets")
         fs.readFile(dirPath+"/t4.png",(err,data)=>{
            console.log(data)
            return res.end('done')
         })
         
     }
}