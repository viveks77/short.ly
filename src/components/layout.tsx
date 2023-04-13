import Footer from "./footer";
import { Nav } from "./nav";

type Props = {
    children: React.ReactNode;
}

export const Layout = ({children}: Props) => {
    return (
        <div className='flex flex-col'>
            <Nav />
            {children}
            <Footer />
        </div>
    )
}
