module.exports = {
      url:function(req,res){
           return `http://${req.get('host')}/`; 
      }
}