const {RedisClient,IoredisClient} = require('../helper/RedisConnection')
module.exports = {
      todo: async function(req,res){
            const DEFAULT_EXPIRATION = 3600
           
            try {
                  const cacheResults = await RedisClient.get('todo');
                  if (cacheResults) {
                        res.json({
                              status: 200,
                              message: JSON.parse(cacheResults)
                        });
                  } else {
                        const url = "https://jsonplaceholder.typicode.com/todos";
                        const response = await fetch(url);
                        const jsonResponse = await response.json();
                        //set data with expiry
                        await RedisClient.setEx('todo',DEFAULT_EXPIRATION, JSON.stringify(jsonResponse));
                        // await RedisClient.set('list', JSON.stringify(jsonResponse));
                        res.json({
                              status: 200,
                              message: jsonResponse,
                        });
                  }
            }catch (error) {
                  console.error(`Error fetching data from API: ${error.message}`);
                  res.status(500).json({
                  status: 500,
                  message: "Internal Server Error",
                  });
            }
            
             
          
      },
      user:async function(req,res){
            try {
                  const cacheResults = await IoredisClient.get('user');
                  if (cacheResults) {
                        res.json({
                              status: 200,
                              message: JSON.parse(cacheResults)
                        });
                  } else {
                        const url = "https://jsonplaceholder.typicode.com/users";
                        const response = await fetch(url);
                        const jsonResponse = await response.json();
                        await IoredisClient.set('user',JSON.stringify(jsonResponse))
                        await IoredisClient.expire('user',20)
                        res.json({
                              status: 200,
                              message: jsonResponse,
                        });
                  }
                 
            } catch (error) {
                  console.error(`Error fetching data from API: ${error.message}`);
                  res.status(500).json({
                        status: 500,
                        message: "Internal Server Error",
                  }); 
            } 
      }
}