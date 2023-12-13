import { api } from "@/trpc/server";
import type { ShortUrl } from "@prisma/client";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { alias: string } }) => {
  const alias = params.alias;
  let shortUrl: ShortUrl | null = null;
  let isError = false;
  try {
    shortUrl = await api.shortner.get.query({ alias: alias });
  } catch (e) {
    isError = true;
  }
  if (shortUrl) {
    redirect(shortUrl.url);
  } else if (isError) {
    redirect("/?err=NOT_FOUND");
  }

  return null;
};

export default page;
