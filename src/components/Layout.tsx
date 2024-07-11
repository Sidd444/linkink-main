"use client";
import Footer from "./Footer";
import { NavbarDemo} from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode; }) {
    return (
        <>
            <NavbarDemo />
            <main>
                {children}
            </main>
        </>
    )
}