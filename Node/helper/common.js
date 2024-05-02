const fs  = require("fs")
exports.createtxt = function(path,callback){
      fs.writeFile(path,'',(err,data)=>{
            if(err) return callback(new Error('Something wrong'))
            callback(null,data)
      })   
}