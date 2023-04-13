import React from "react";

type Props = {};

const Footer = (props: Props) => {
    return (
        <footer className="flex-0 top-0 flex align-center justify-around p-4">
            <div className="mx-auto p-4 md:flex md:items-center md:justify-between text-slate-400">
                shortened URLs will be active for 1 hour only
            </div>
        </footer>
    );
};

export default Footer;
