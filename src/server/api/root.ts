import { createTRPCRouter } from "@/server/api/trpc";
import { shortnerRouter } from "./routers/shortner";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  shortner: shortnerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
