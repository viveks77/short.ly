import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/server/api/router/index";
import { prisma } from "@/server/db";
import superjson from "superjson";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma },
    transformer: superjson, 
  });