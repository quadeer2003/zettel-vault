"use client";
import { useScrollTop } from "@/hooks/scroll";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/darkmode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton , UserButton} from "@clerk/clerk-react";
import Link from "next/link";
export const Navbar = () => {
    const scrolled = useScrollTop();
    const { isAuthenticated, isLoading } = useConvexAuth();
    return (
        <div className={cn("z-50 bg-background fixed top-0 flex items-center w-full p-3", scrolled && "border-b shadow-sm")}>
            <Logo />
            <div className="ml-auto justify-end w-full flex items-center gap-x-1">
                {isLoading &&(
                    <p>...</p>
                )}
                {!isAuthenticated && !isLoading &&(
                    <>
                    <SignInButton mode="modal">
                        <Button>
                            Enter Zettel Vault
                        </Button>
                    </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading &&(
                    <>
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/vault">
                        Enter your Vault
                        </Link>
                    </Button>
                    <UserButton
                        afterSignOutUrl="/"
                    />
                    </>
                )}
                <ModeToggle />
            </div>
        </div>
    )
}