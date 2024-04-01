module.exports = {
      user:async function(req,res){
            const user = await req.user
            return user
      }
}