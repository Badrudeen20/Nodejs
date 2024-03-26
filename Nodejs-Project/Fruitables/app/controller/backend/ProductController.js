const { url } = require("../../helper/url");
module.exports = {
    
  view:async function(req,res){
    return res.render('Backend/product',{ layout: 'Backend/layout',url:url(req,res) })
  },
  

}