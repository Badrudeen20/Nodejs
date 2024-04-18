const multer = require("multer")
module.exports= {
    upload: multer({ 
            storage: multer.diskStorage({
                // destination: function (req, file, cb) {
                //     cb(null, "storage/post")
                // },
                //  console.log(file)
                //storage/badru/'+select+'/'+uploadFolder
                filename: function (req, file, cb) {
                // console.log(file)
                //  cb(null, file.originalname)
                }
            }),
           
        }).array("files",2),
    
    
}