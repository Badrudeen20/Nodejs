module.exports = {
      url:function(req,res){
           return `${req.protocol}://${req.get('host')}/`; 
      }
}