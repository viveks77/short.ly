// import { env } from '@/env';
import { getRedisConfig } from '@/trpc/shared';
import Redis from 'ioredis';
import type { RedisOptions } from 'ioredis';

const config = getRedisConfig();

const globalForRedis = global as unknown as {_redisClient: Redis}

let redis: Redis;


const options: RedisOptions = {
  host: config.host,
  port: config.port,
  password: config.password,
  lazyConnect: true,
  showFriendlyErrorStack: true,
  enableAutoPipelining: true,
  maxRetriesPerRequest: 0,
  retryStrategy: (times: number) => {
    if (times > 3) {
      throw new Error(`[Redis] Could not connect after ${times} attempts`);
    }

    return Math.min(times * 200, 1000);
  },
};

if(!globalForRedis._redisClient){
  redis = new Redis(options);
  
  redis.on("error", (err) => {
    console.log("[REDIS] ", err);
  })

  globalForRedis._redisClient = redis;
}
const redisClient = globalForRedis._redisClient;

// if(env.NODE_ENV === 'development'){
// }else{
//   redis = new Redis(options);
  
//   redis.on("error", (err) => {
//     console.log("[REDIS] ", err);
//   })
//   redisClient = redis;
// }

export default redisClient;
 