import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { isRateLimited } from "@/server/shared/rateLimiter";
import redisClient from "@/server/shared/redis";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { z } from "zod";

export const shortnerRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.string().trim().url())
    .mutation(async ({ input, ctx }) => {
      const ip = ctx.headers.get("x-forwarded-host") ?? '127.0.0.1';

      const isLimited = await isRateLimited(ip);
      if(isLimited){
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests",
        });
      }

      const isExistingUrl = await ctx.db.shortUrl.findFirst({where: {url: input}});

      if(isExistingUrl) return isExistingUrl;

      let alias: string;
      do{
        alias = nanoid(7);
      }while(!!(await ctx.db.shortUrl.count({where: {alias}})));
      
      const expiresIn = new Date();
      expiresIn.setHours(expiresIn.getHours() + Number(env.URL_EXPIRY_IN_HOURS));
      

      const shortUrl = await ctx.db.shortUrl.create({
        data: {
          alias: alias,
          url: input,
          expiresIn: expiresIn,
          clicks: 0,
        },
      });

      await redisClient.set(shortUrl.alias, shortUrl.url);
      await redisClient.expire(shortUrl.alias, 60);
      return shortUrl;
    }),
  get: publicProcedure
    .input(z.object({ alias: z.string().trim() }))
    .query(async ({ input, ctx }) => {

      const urlToRedirect = await redisClient.get(input.alias);
      if(urlToRedirect){
        await redisClient.expire(input.alias, 60);
        return urlToRedirect;
      }

      const shortUrl = await ctx.db.shortUrl.findUnique({
        where: { alias: input.alias },
      });

      if (!shortUrl)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "",
        });


      if (shortUrl.expiresIn.getTime() < Date.now())
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Short Url is expired",
        });

      await redisClient.set(shortUrl.alias, shortUrl.url);
      await redisClient.expire(shortUrl.alias, 60);

      return shortUrl.url;
    }),
    getAll: publicProcedure
      .input(z.array(z.string()))
      .query(async ({ input, ctx }) => {
        const urls = await ctx.db.shortUrl.findMany({
          where: { alias: { in: input } },
        })

        return urls;
      }),
});
