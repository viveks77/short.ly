import { ShortUrlInputSchema } from "@/constants/schema";
import { z } from "zod";

export type ShortUrlInputSchema = z.infer<typeof ShortUrlInputSchema>;

