const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
      
  builder:async function(req,res){
    // const forms = await prisma.dynamicform.findMany({
    //   where:{status:'ACTIVE'}
    // })
    // return res.render('Backend/builder',{ 
    //   layout: 'Backend/layout',
    //   forms
    // })
    try {
      const forms = await prisma.dynamicform.findMany({});
      console.log(forms)
      return res.render('Backend/builder',{ 
      layout: 'Backend/layout',
      forms
    })
    } catch (error) {
      console.error('Error:', error);
    }
  },
  
  addForm:async function(req,res){
    const {type} = req.body
    if(type=='add'){
      const {form} = req.body
      const isExist = await prisma.dynamicform.findMany({
        where:{name:form}
      })
     
      if(isExist.length==0){
        await prisma.dynamicform.create({
          data: { name: form}
        });
      }
    }else if(type=='update'){
      const {json,formId} = req.body
      const update = await prisma.dynamicform.update({
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
    await prisma.dynamicform.delete({
      where: { id: +req.params.formId }
    });
    return res.redirect('back')
  }
 
  

}

