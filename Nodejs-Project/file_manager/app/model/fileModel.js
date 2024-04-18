const db = require('../helper/mysql')

module.exports = {
    show:function(callback){
         var sql = "SELECT * FROM categories"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    file:function(callback){
         var sql = "SELECT * FROM files where user_id = 1"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },
  
    //get files
    docs:function(callback){
         var sql = "SELECT * FROM docs"
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    //insert file
    docsAdd:function(input,callback){
        var sql = 'INSERT INTO docs (file_id,type,name) VALUES ?;';
      //  var sql = "`INSERT INTO docs SET ? ";
        db.query(sql,[input],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data)
            }
        })
    },

    //Select file
    docsGet:function(input,callback){
        var sql = 'SELECT * FROM docs WHERE file_id = ?';
        db.query(sql,[input.file_id],function(err,data,fields){
            if(!!err){
                console.log(err)
            }else{
                return callback(data)
            }
        })
    },

    //inside folder
    inFolder:function(input,callback){
         var sql = `SELECT * FROM files WHERE parent_id =${input.file_id}`
         db.query(sql,function(err,data,fields){
             if(!!err){
                console.log(err)
             }else{
               return callback(data)
             }
         })
    },


    folder:function(input,callback){
        var sql = `INSERT INTO files SET ?`;
         db.query(sql,input,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    directory:function(input,callback){
        var sql = `SELECT * FROM files where categories='${input.dir.name}' and parent_id IS NULL`
       // var sql = `SELECT * FROM files where categories='${input.dir.name}'`
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },
    
    tabFolder:function(input,callback){
        if(input.dir.id){
            var sql = `SELECT * FROM files where categories='${input.dir.name}' and parent_id IS NOT NULL`
        }else{
            var sql = `SELECT * FROM files where categories='${input.dir.name}' and parent_id IS NULL`
        }
         db.query(sql,function(err,data,fields){
             if(!!err){
                 console.log(err)
             }else{
                 return callback(data)
             }
         })
    },

    delete:function(input,callback){
    
        var sql = `DELETE FROM docs where id= ?`;

        db.query(sql,[input.id],function(err,data,fields){
            if(err) throw err
            return callback(data)
        })
    },

    findFolderId:function(input,callback){
        var temp = [input.id]
        function findIds(arr){
        let myPromise = new Promise(function(resolve, reject){ 
            arr.map(id=>{
                    var sql = `SELECT * FROM files where parent_id = ${id}`    
                    db.query(sql,function(err,data,fields){
                      if(err) throw err
                      let map = []
                      data.map(ele=>{
                        map.push(ele.id)
                      })
                        resolve(map)
                    })
                })
            });
            
            myPromise.then(ele=>{
                 if(ele.length){
                     findIds(ele)
                     ele.map(e=>{
                        temp.push(e)
                     })
                 }else{
                    return callback(temp)
                 }
            })
        }   
        findIds([input.id])
    },

    deleteAll:function(input,callback){
        var docs_sql = `DELETE FROM docs WHERE file_id IN  (?)`;
        var file_sql = `DELETE FROM files WHERE id IN  (?)`;
        db.query(docs_sql,[input],function(err,data,fields){
           if(err) throw err
           db.query(file_sql,[input],function(err,data,fields){
              if(err) throw err
              return callback(data)
           })
        })
    },

    findFolderNameById:function(input,callback){
        var sql = `SELECT * FROM files where id IN (${input.join(',')})`   
        db.query(sql,function(err,data,fields){
           if(err) throw err
              return callback(data)
        })
    }

 
}