class TableController {
   

      static tableCreate = async(req,res)=>{
         const post = req.body
         const table = req.param("table")
         const field = {}
   
         field.data =  post.map((item,index)=>{
            let temp = []
            for (let x in item) {
               temp.push(item[x])
            }
            return  temp
         })
   
         let temp = []
         for (let x in post[0]) {
            temp.push(x)
         }
         field.column = temp.join(',')
      
         const data = await TableModel.tableCreate(field,table)
         res.json(data)
      }
   
      static tableColumn = async(req,res)=>{
         const post = req.body
         const table = req.param("table")
         const data = await TableModel.tableColumn(post,table)
         res.json(data)
      }
      
      static tableColumnDelete = async(req,res)=>{
         const post = req.body
         const table = req.param("table")
         const data = await TableModel.tableColumnDelete(post,table)
         res.json(data)
      }
   
      static tableColumnRename = async(req,res)=>{
         const post = req.body
         const table = req.param("table")
         const data = await TableModel.tableColumnRename(post,table)
         res.json(data)
      }
   
      static tableColumnModify = async(req,res)=>{
         const post = req.body
         const table = req.param("table")
         const data = await TableModel.tableColumnModify(post,table)
         res.json(data)
      }
   
}
module.exports  = { TableController }