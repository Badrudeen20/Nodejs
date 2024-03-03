const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')
const redis = require("redis");

let redisClient;
(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

app.use(express.urlencoded({extended:true}))
app.use(cors())
const DEFAULT_EXPIRATION = 3600
app.get("/", async (req, res) => {
     try {
            const cacheResults = await redisClient.get('list');
            if (cacheResults) {
                  res.json({
                        status: 200,
                        message: JSON.parse(cacheResults)
                  });
            } else {
                  const url = "https://jsonplaceholder.typicode.com/todos";
                  const response = await fetch(url);
                  const jsonResponse = await response.json();
                  await redisClient.set('list',DEFAULT_EXPIRATION, JSON.stringify(jsonResponse));
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

 
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
