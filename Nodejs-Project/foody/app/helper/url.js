module.exports = {
      url:function(req,res){
           return `https://${req.get('host')}/`; 
      }
}