import { z } from "zod";

export const ShortUrlInputSchema = z.object({
    url: z.string().trim().url({message: "URL does not have a valid format"})
})
