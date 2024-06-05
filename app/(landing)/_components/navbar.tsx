"use client";
import { useScrollTop } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/darkmode-toggle";
export const Navbar = () =>{
    const scrolled = useScrollTop();
    return(
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-6",scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-1">
                <Button>
                    Login
                </Button>
                <ModeToggle/>
            </div>
        </div>
    )
}