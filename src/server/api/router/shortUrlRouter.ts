import { createTRPCRouter, publicProcedure } from "../trpc";
import {z} from 'zod';

export const shortUrlRouter = createTRPCRouter({
    get: publicProcedure
        .input(z.object({alias: z.string()}))
        .query(({input, ctx}) => {
            return "";
        })
})