import Image from "next/image";
import { Aclonica } from "next/font/google";

import { cn } from "@/lib/utils";
const font = Aclonica({
    weight: '400',
    subsets: ['latin']
});
export const Logo = () => {
    return (
        <div className=" md:flex items-center gap-x-2">
            <Image
                src="/header_logo.png"
                height="60"
                width="60"
                alt='logo'

            />

            <p className={cn("font-semibold", font.className, "hidden")}>
                ZETTEL VAULT
            </p>
        </div>
    )
}