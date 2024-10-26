const redis = require("redis");

let redisClient;  

(async () => {  
  redisClient = redis.createClient({  
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,  
  });  

  redisClient.on("error", (error) => console.error(`Error : ${error}`));  

  await redisClient.connect();  
  console.log("Redis connected");
})();  

module.exports = redisClient;