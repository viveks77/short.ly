import { Nav } from "@/components/nav";
import { api } from "@/utils/api";

export default function Home() {
    const {data} = api.shortUrlRouter.get.useQuery({alias: 'hi'});
    
    return (
        <main className="flex-1 m-auto flex flex-col item-center">
            <div className="my-20 text-5xl font-poppins text-center">URL shortner</div>
            <div className="m-5 flex md:w-[490px] sm:w-96">
                <input placeholder="Enter the link here.." type="text" name="url" className="w-3/4 block p-4 border border-gray-300 dark:border-border-gray dark:focus:border-black dark:ring-black rounded-lg bg-[#f7f7f7] sm:text-md  dark:bg-bg-secondary dark:border-red"/>
                <button className="w-1/4 mx-2 p-2 border rounded-md dark:border-border-gray hover:bg-gray-50 dark:hover:bg-bg-secondary transition-all" type="submit">Create Link</button>
            </div>
        </main>
    );
}
