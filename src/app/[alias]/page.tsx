import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { alias: string } }) => {
  const alias = params.alias;
  let urlToRedirect = "";
  let isError = false;
  try {
    urlToRedirect = await api.shortner.get.query({ alias: alias });
  } catch (e) {
    isError = true;
  }
  if (urlToRedirect) {
    redirect(urlToRedirect);
  } else if (isError) {
    redirect("/?err=NOT_FOUND");
  }

  return null;
};

export default page;
