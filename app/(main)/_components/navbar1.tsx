"use client";
import { useScrollTop } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { Logo } from "./logo1";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/darkmode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { Search } from "lucide-react";

export const Navbar1 = () => {
    const scrolled = useScrollTop();
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-1", scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="flex w-full justify-between items-center">
                <div className="ml-auto flex items-center gap-x-2">
                    <div className="flex">
                        <Item
                            label="search"
                            icon={Search}
                            isSearch
                            onClick={() => { }}
                        />
                    </div>
                    {isAuthenticated && !isLoading && (
                        <UserButton afterSignOutUrl="/" />
                    )}
                    {/* <div className="flex"> */}
                        <ModeToggle />
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};
