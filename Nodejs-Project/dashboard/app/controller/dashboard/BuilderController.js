const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
      
  builder:async function(req,res){
    const forms = await prisma.form.findMany({})
    return res.render('Backend/builder',{ 
      layout: 'Backend/layout',
      forms
    })
  },
  addForm:async function(req,res){
    const {type} = req.body
    if(type=='add'){
      const {form} = req.body
      const isExist = await prisma.form.findMany({
        where:{name:form}
      })
      if(isExist.length==0){
        const newForm = await prisma.form.create({
          data: { name: form}
        });
      }
    }else if(type=='update'){
      const {json,formId} = req.body
      const update = await prisma.form.update({
        where:{
          id:+formId
        },
        data: {
         form:JSON.stringify(json)
        },
      })
     
      return res.json({status:'success',json:update})
    }
    return res.redirect('back')
  },
  deleteForm:async function(req,res){
    await prisma.form.delete({
      where: { id: +req.params.formId }
    });
    return res.redirect('back')
  }
 
  

}

