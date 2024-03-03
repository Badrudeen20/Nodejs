const redis = require("redis");
const { Redis } = require('ioredis')
const IoredisClient = new Redis()
let RedisClient;
(async () => {
      RedisClient = redis.createClient();
      RedisClient.on("error", (error) => console.error(`Error : ${error}`));
      await RedisClient.connect();
})();

module.exports = {
      RedisClient,
      IoredisClient

}