const { url } = require("../../helper/url");
module.exports = {
    
  view:async function(req,res){
    
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
  order:async function(req,res){
   
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
  customer:async function(req,res){
   
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
  product:async function(req,res){
    
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
  category:async function(req,res){
   
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
  profile:async function(req,res){
   
    return res.render('Backend/dashboard',{ layout: 'Backend/layout',url:url(req,res) })
  },
 
}