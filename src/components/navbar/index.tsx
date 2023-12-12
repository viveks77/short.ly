import Link from "next/link";
import { DarkModeToggle } from "../common/DarkModeToggle";

export const Nav = () => {

    return (
        <header className="flex-0 align-center top-0 flex justify-around p-4 drop-shadow-sm border-slate-100 dark:border-input border-b-[1px]">
            <div className="text-3xl">
                <Link href="/">Short.ly</Link>
            </div>
            <div>
                <DarkModeToggle />
            </div>
        </header>
    );
};
