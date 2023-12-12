import { env } from "@/env";
import redis from "./redis";
const windowSize = env.RATELIMITER_LIMIT_SIZE;
const timeFrame = env.RATELIMITER_FRAME_SIZE; // in seconds

type Window = Array<Date>;

export const isRateLimited = async (key: string): Promise<boolean> => {
  const currentDate = Date.now();
  let index = Number(await redis.lindex(key, 0));
  
  // Remove timestamps older than the timeFrame
  while (index != 0 && index < currentDate - timeFrame * 1000) {
    await redis.lpop(key);
    index = Number(await redis.lindex(key, 0));
  }

  if ((await redis.llen(key)) < windowSize) {
    await redis.rpush(key, currentDate.toString());
    await redis.expire(key, timeFrame + (1 * 10));
    return false;
  }

  return true;
};
