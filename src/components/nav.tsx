import useDarkMode from "@/hooks/useDarkMode";
import Link from "next/link";
import dynamic from "next/dynamic";

const DarkModeButton = dynamic(() => import('./darkModeButton'), {ssr: false});

export const Nav = () => {
    const [theme, setTheme] = useDarkMode();
     
    return (
        <header className="flex-0 top-0 flex align-center justify-around p-4">
            <div className="text-2xl">
                <Link href='/'>Short.ly</Link>
            </div>
            <div>
               <DarkModeButton theme={theme} setTheme={setTheme} /> 
            </div>
        </header>
    );
};
