"use client";
import { Aclonica } from "next/font/google";

import { cn } from "@/lib/utils";
const font = Aclonica({
    weight: '400',
    subsets: ['latin']
});
export const Heading = () => {
    return (
        <div className="max-w-3xl space-y-4 text-center">
            <div className={font.className}>
                <h1 className="text-3xl sm:text-5xl md:text-5xl font-bold">
                    Supercharge your productivity with our BASB based app!
                </h1>

            </div>
            <h2>
                Capture ideas, organize thoughts, and recall effortlessly – your zettel vault awaits!
            </h2>
        </div>
    )
}