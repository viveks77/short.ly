import { ShortUrlInputSchema } from "@/constants/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {z} from 'zod';
import {nanoid} from "nanoid";
import {ShortUrlConsts} from "@/constants/constants";
import { TRPCError } from "@trpc/server";

export const shortUrlRouter = createTRPCRouter({
    create: publicProcedure
        .input(ShortUrlInputSchema)
        .mutation(async ({input, ctx}) => {
            let alias = nanoid(7);
            let expiresIn = new Date();
            expiresIn.setHours(expiresIn.getHours() + ShortUrlConsts.URL_EXPIRY_IN_HOURS);
            const shortUrl = await ctx.prisma.shortUrl.create({
                data: {
                    alias: alias,
                    url: input.url,
                    expiresIn: expiresIn
                }
            })

            return shortUrl;
        }),
    get: publicProcedure
        .input(z.object({alias: z.string()}))
        .query(async ({input, ctx}) => {
            let alias = input.alias;
            const shortUrl = await ctx.prisma.shortUrl.findFirst({
                where: {alias: alias}
            });

            if(!shortUrl) throw new TRPCError({
                code: "NOT_FOUND",
                message: ""
            });

            if(shortUrl.expiresIn.getTime() < Date.now()) throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Short Url is expired"
            })

            return shortUrl;
        })
})