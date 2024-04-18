module.exports = {
      view:function(req,res){
           for (let i = 0; i < 10000000000; i++) {}
           const randomString = generateRandomString(10);
           res.send(randomString)
      }
}


function generateRandomString(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
}