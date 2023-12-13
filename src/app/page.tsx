"use client";

import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import UrlCard from "@/components/url-card";
import { useLocalStorage } from "@/lib/hooks/useLocalStorageHook";
import { api } from "@/trpc/react";
import type { ShortUrl } from "@prisma/client";
import { useMemo, useRef, useState } from "react";
import { z } from "zod";


export default function Home() {
  
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const [storedValue, setValue] = useLocalStorage<ShortUrl[]>("urls", []);
  const [isRunOnce, setIsRunOnce] = useState<boolean>(true);

  const {toast} = useToast();

  api.shortner.getAll.useQuery(storedValue.map((v: ShortUrl) => v.alias), {
    refetchInterval: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: storedValue.length > 0 && isRunOnce,
    onSuccess: (res) => {
      setValue(res);
      setIsRunOnce(false)
    }
  });
  
  const urlSchema = z.string().trim().url();
  
  const { mutate, isLoading } = api.shortner.create.useMutation({
    onSuccess: (res) => {
      if(inputRef.current){
        inputRef.current.value = "";
      }
      setValue([...storedValue, res])
    },
    onError: (e) => {
      if(e.data?.httpStatus === 429 && e.data?.code === "TOO_MANY_REQUESTS"){
        toast({ title: "Too many request. Please try again later.", variant: "destructive" })
      }else{
        toast({title: "Something went wrong. Please try again later.", variant: "destructive"})
      }
    },
  });

  const onSubmitHandle = async ($event: React.FormEvent<HTMLFormElement>) => {
    $event.preventDefault();
    if(!inputRef.current) return;

    const url = inputRef.current?.value;
    setIsInvalid(false);
    if (!urlSchema.safeParse(url).success) {
      setIsInvalid(true);
      return;
    }
    
    mutate(url);
  };  


  const sortedUrls = useMemo(() => {
    if(isRunOnce){
      return [];
    }
    return storedValue.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }, [storedValue, isRunOnce])

  return (
    <main>
      <div className="p-4 m-auto mt-14 h-full sm:w-[500px] lg:w-[550px]">
        <div className="w-full text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
          <h1>URL Shortner</h1>
        </div>
        <form
          onSubmit={onSubmitHandle}
          className="mt-10 flex items-start md:space-x-2 space-y-2 md:space-y-0 md:flex-row flex-col"
        >
          <div className="flex-1 w-full">
            <Input
              type="text"
              placeholder="URL to shorten..."
              ref={inputRef}
              className={isInvalid ? "border-red-500" : ""}
            />
            {isInvalid && (
              <p className="mt-2 text-sm text-red-500">Invalid URL format</p>
            )}
          </div>
          <Button type="submit" variant="default" className="md:w-fit w-full" disabled={isLoading}>
            {isLoading && <Loader />} Shorten
          </Button>
        </form>
        {<div className="w-full mt-10 space-y-2">
            {sortedUrls.map((value: ShortUrl) => {
              return <UrlCard key={value.id} shortUrl={value} />
            })}
        </div>}
      </div>
    </main>
  );
}
