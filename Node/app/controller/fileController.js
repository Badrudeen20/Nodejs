const fs = require("fs")
const path = require("path")
rootDir = path.resolve("")
module.exports = {
      fileAsync:function(req,res){
          fs.readFile(rootDir+"/html/form.html",(err,data)=>{
             if(err) new Error("Somthing went wrong")
             res.write(data)
             res.end()
          })
          
      },
      fileSync:function(req,res){
          const html = fs.readFileSync(rootDir+"/html/form.html")
          res.write(html)
          res.end()
      }
}