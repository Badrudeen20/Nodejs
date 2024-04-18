var fs = require('fs');
var path = require('path')

const folderBuilder =  function(category,fileName){
    var dirname =path.dirname(__dirname)
    var pathName = dirname + '/storage/badru';
     if(fs.existsSync(pathName)) {
         fs.mkdir(path.join(pathName + '/' + category, fileName), (err) => {
            if(err) console.error(err);
         });
    }
}

module.exports = folderBuilder