module.exports = {
      auth:function(req,res,next){
            if(true){
                  console.log('middleware')
                  return next()
            }else{
                  throw new Error('Something broke!'); 
            }
      }
}