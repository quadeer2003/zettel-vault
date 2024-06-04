"use client";
import { useScrollTop } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
export const Navbar = () =>{
    const scrolled = useScrollTop();
    return(
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6",scrolled && "border-b shadow-sm")}>
            <Logo />
        </div>
    )
}