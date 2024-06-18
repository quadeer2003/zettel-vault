"use client";
import { useUser } from "@clerk/clerk-react";
import { Navbar1 } from "../../_components/navbar1";
import { UserItem } from "../../_components/user-item";
import Image from "next/image";

const Vault = () => {
    const {user} = useUser();
    return (
        <div className="h-full ">
            

            <div className="h-full flex flex-col items-center justify-center space-y-4">
                <Image
                    src="/empty-light.png"
                    height="600"
                    width="600"
                    alt="empty"
                    className="dark:hidden"
                />
                <Image
                    src="/empty-dark.png"
                    height="600"
                    width="600"
                    alt="empty"
                    className="hidden dark:block"
                />
            </div>
        </div>



    );
}

export default Vault;