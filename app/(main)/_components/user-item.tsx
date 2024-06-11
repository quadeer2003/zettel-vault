"use client";
import { Avatar,AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent,DropdownMenuItem,DropdownMenuGroup,DropdownMenuSeparator,DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";

export const UserItem=() =>{
    const {user} = useUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div role="button" className="flex items-center text-sm p-3 w-full hover:bg-primary/5">
                    <div className="gap-x-2 flex items-center max-w-[150px]">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={user?.imageUrl}/>
                            </Avatar>
                            <span className="text-start font-bold"> 
                                {user?.lastName}
                            </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80"
                align="start"
                alignOffset={11}
                forceMount
            >
                <div className="flex flex-col space-y-4 p-2">
                    <p className="text-xs font-medium leading-none text-muted-foreground">
                        {user?.emailAddresses[0].emailAddress}
                    </p>
                    <div>
                    <Avatar className="h-5 w-5">
                                <AvatarImage src={user?.imageUrl}/>
                            </Avatar>
                    </div>
                </div>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <SignOutButton>
                        Sign out
                    </SignOutButton>
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}