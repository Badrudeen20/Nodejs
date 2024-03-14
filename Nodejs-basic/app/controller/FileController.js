const fs = require('fs')
const path = require('path');
const rootDir = path.resolve(__dirname, '../..');
module.exports = {
    
    view:async function(req,res){ 
      
      const filePath = path.join(rootDir, 'data', 'test.txt');
      /* const data = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }); */
      const data = ""
      fs.readFile(filePath,'utf8', function(err, file){
            // Display the file content
             data = file
            console.log(data);
      })
      console.log(data)
      return res.render('file/index',{data})
    },
    write:async function(req,res){ 
      const {write} = req.body
      const filePath = path.join(rootDir, 'data', 'test.txt');
      const data = fs.writeFileSync(filePath,write,{flag:'a+'});
      return res.redirect('back');
    },
   
}

