import { createTRPCRouter, publicProcedure } from "../trpc";
import {z} from 'zod';
import { shortUrlRouter } from "./shortUrlRouter";


export const appRouter = createTRPCRouter({
    shortUrlRouter,
});

export type AppRouter = typeof appRouter;