import { Fragment, useState } from "react";
import { api } from "@/utils/api";
import ResultCard from "@/components/resultCard";
import Loader from "@/components/loader";

export default function Home() {
    const [shortly, setShortly] = useState<string>("");

    const { mutate, isLoading } = api.shortUrlRouter.create.useMutation({
        onSuccess: (res) => {
            setShortly(res.alias);
        },
        onError: (e) => {
            console.log(e);
        },
    });

    const [url, setUrl] = useState<string>("");

    const handleUrlSubmit = () => {
        if (url == "") return;
        mutate({ url: url });
    };

    return (
        <main className="flex-1 sm:w-[500px] lg:w-[550px] m-8 lg:m-auto sm:m-auto flex flex-col items-center">
            <div className="my-20 text-5xl font-poppins text-center">URL shortner</div>
            <div className="m-5 w-full flex-col lg:flex md:flex lg:flex-row">
                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter the link here.."
                    type="url"
                    pattern="https://.*"
                    name="url"
                    className="w-full lg:w-3/4 sm:w-full block mb-2 lg:mb-auto p-4 border border-gray-300 dark:border-border-gray dark:focus:border-black dark:ring-black rounded-md bg-[#f7f7f7] sm:text-md  dark:bg-bg-secondary dark:border-red"
                    required
                />
                <button
                    disabled={isLoading}
                    onClick={handleUrlSubmit}
                    className="w-full sm:w-full lg:w-1/4 lg:ml-2 p-2 flex items-center justify-center dark:disabled:bg-bg-secondary disabled:bg-gray-100 font-bold border rounded-md dark:border-border-gray hover:bg-gray-50 dark:hover:bg-bg-secondary transition-all"
                    type="submit">
                    {isLoading ? <Fragment><Loader /> <span className="ml-2">Loading</span></Fragment> : "Shorten"}
                </button>
            </div>
            {shortly && <ResultCard url={url} shortUrl={shortly} />}
        </main>
    );
}
