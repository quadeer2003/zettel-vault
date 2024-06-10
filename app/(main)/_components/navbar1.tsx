"use client";
import { useScrollTop } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { Logo } from "./logo1";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/darkmode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton , UserButton} from "@clerk/clerk-react";
import Link from "next/link";
import { UserItem } from "./user-item";

export const Navbar1 = () => {
    const scrolled = useScrollTop();
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className={cn("z-[9999] bg-background fixed top-0 flex items-center w-full p-3", scrolled && "border-b shadow-sm")}>
            <Logo />
            <UserItem/>
            <ModeToggle />

        </div>
    )
}