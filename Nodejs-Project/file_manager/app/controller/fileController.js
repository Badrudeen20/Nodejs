const express = require("express");

const model = require('../model/fileModel');
const folderBuilder = require('../helper/folderBuilder')
var fs = require('fs');
var path = require('path');


module.exports = {

    //index
    show:function(req,res){
        model.show(function(categories){
            model.file(function(folder){
                model.docs(function(doc){
                    res.render('index',{categories:categories,folder:folder,doc:doc})
                })
            })
         })
    },

    //folder builder
    folder:function(req,res){
        const input = {
            user_id:req.query.userId,
            categories:req.query.category,
            folder_name:req.query.name,
            parent_id:req.query.parentId ?? null
        }
        folderBuilder(req.query.category,req.query.name)
        model.folder(input,function(data){
            res.redirect('back')
        })

    },

    //folder builder
    upload:async function(req,res){
        var store = []
        if(req.files && Object.keys(req.files).length !== 0) {
            var dirname =path.dirname(__dirname);
           
            //array push promise method
            const tOut = (t) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    resolve(t)
                  },1000)
                })
            }

        if(Array.isArray(req.files.files)){
            req.files.files.map(async ele => {
                const input = [req.body.folderID,'file',ele.name]
                store.push(tOut(input))
                var pathName = dirname + '/storage/badru/'+req.body.category+'/'+req.body.folderName+'/'+ele.name;
                ele.mv(pathName, function (err) {
                    if(err) throw err
                    console.log('success')
                });
            })
          
            Promise.all(store).then(response =>{
                model.docsAdd(response,function(check){
                    res.redirect('back')
                })
            })
        }else{
            const input = [req.body.folderID,'file',req.files.files.name]
            store.push(tOut(input))
            var pathName = dirname + '/storage/badru/'+req.body.category+'/'+req.body.folderName+'/'+req.files.files.name;
            req.files.files.mv(pathName, function (err) {
                if(err) throw err
                console.log('success')
            });
            Promise.all(store).then(response =>{
                model.docsAdd(response,function(check){
                    res.redirect('back')
                })
            })
           
        }

        }
        
    },



    files:async function(req,res){
        //  console.log(req.query)
       const input = {
         file_id:req.query.folderId
       }
        let dir = new Promise(function(resolve) {
            model.inFolder(input,function(data){
               resolve(data)
            })
        });    

        let file = new Promise(function(resolve) {
            model.docsGet(input,function(data){
               resolve(data)
            })
        });   
        
        const inFolder = [...await dir, ...await file]
        res.json({
            inside:inFolder
        })
    },

    directory:function(req,res){
        // console.log(req.query)
       const input = {
         dir:req.query.dir
       }
       model.directory(input,function(dir){
        res.json({
            dir:dir
         })
       })
       
    },
    tabFolder:async function(req,res){
       const dirInput = {
         dir:req.query.dir
       }

       const fileInput = {
        file_id:req.query.dir.id
       }
       let dir = new Promise(function(resolve) {
            model.tabFolder(dirInput,function(dir){
                resolve(dir)
               
            })
        });  

        let file = new Promise(function(resolve) {
            model.docsGet(fileInput,function(data){
               resolve(data)
            })
        });  

        const inFolder = [...await dir, ...await file]
            res.json({
                    dir:inFolder
            })
       
    },

    //delete folder
    delete: function(req,res){
     try{
       
         if(req.query.deleteId){
            const id = req.query.deleteId;
            const input = {}
            if(id.folderId){
                input.id = id.folderId  
                const folderId = new Promise(function(resolve, reject){ 
                    model.findFolderId(input,function(data){
                        resolve(data)
                    })
                })
                folderId.then(ele=>{
                    model.findFolderNameById(ele,function(data){
                       var dirname =path.dirname(__dirname)
                       
                       data.map(function(f){
                        var pathName = dirname + '/storage/badru/'+f.categories+'/'+f.folder_name;
                            fs.rmdir(pathName, () => {
                                console.log('folder deleted successfully!');
                            });
                       })
                        
                    })
                    // console.log(ele.join(','))
                    model.deleteAll(ele,function(data){
                        res.json({
                            success:data
                        })
                    })
                })

            }

            if(id.fileId){
                input.id = id.fileId  
                model.delete(input,function(data){
                    res.json({
                        success:data
                    })
                })
            } 
         }



        }catch(err) {
           res.send('something went wrong')
        }

    }


   
}