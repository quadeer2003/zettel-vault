"use client";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "./_components/navigation";
import { Navbar1 } from "./_components/navbar1";
import { SearchCommand } from "@/components/searchCommand";

const VaultLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                ...
            </div>
        )
    }
    if (!isAuthenticated) {
        return redirect("/");
    }

    return (
        <div className="h-screen flex">
                {/* <div className="p-0">
                    <Navbar1 />
                </div> */}

                    <Navigation />
                


            <main className="flex-1 h-full overflow-y-auto">
                <SearchCommand/>
                {children}

            </main>
        </div>
    );
}

export default VaultLayout;