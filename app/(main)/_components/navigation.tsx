"use client";

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useMutation } from "convex/react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import {
    ChevronsLeft,
    FileSearch,
    MenuIcon,
    Plus,
    PlusCircle,
    Search,
    SearchCheck,
    Settings,
    Trash,
    Trash2,
} from "lucide-react";

import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { UserItem } from "./user-item";
import { Item } from "./item";
import { VaultList } from "./vault-list";
import { TrashBox } from "./trashBox";
import { searchFunc } from "@/hooks/search";
import { Navbar } from "./navbar";


const Navigation = () => {

    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const isMobile = useMediaQuery("(max-width: 768px)");
    const create = useMutation(api.vaults.create);
    const search = searchFunc();

    const isResizingRef = useRef(false);
    const sidebarRef = useRef<ElementRef<"aside">>(null);
    const navbarRef = useRef<ElementRef<"div">>(null);
    const [isResetting, setIsResetting] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(isMobile);

    useEffect(() => {
        if (isMobile) {
            collapse();
        } else {
            resetWidth();
        }
    }, [isMobile]);

    useEffect(() => {
        if (isMobile) {
            collapse();
        }
    }, [pathname, isMobile]);

    const handleMouseDown = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        event.preventDefault();
        event.stopPropagation();

        isResizingRef.current = true;
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizingRef.current) return;
        let newWidth = e.clientX;

        if (newWidth < 240) newWidth = 240;
        if (newWidth > 480) newWidth = 480;

        if (sidebarRef.current && navbarRef.current) {
            sidebarRef.current.style.width = `${newWidth}px`;
            navbarRef.current.style.setProperty("left", `${newWidth}px`);
            navbarRef.current.style.setProperty(
                "width",
                `calc(100% - ${newWidth}px)`,
            );
        }
    };

    const handleMouseUp = () => {
        isResizingRef.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false);
            setIsResetting(true);

            sidebarRef.current.style.width = isMobile ? "100%" : "240px";
            navbarRef.current.style.removeProperty("width");
            navbarRef.current.style.setProperty(
                "width",
                isMobile ? "0" : "calc(100%-240px)",
            );
            navbarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");
            setTimeout(() => setIsResetting(false), 300);
        }
    };

    const collapse = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(true);
            setIsResetting(true);

            sidebarRef.current.style.width = "0";
            navbarRef.current.style.setProperty("width", "100%");
            navbarRef.current.style.setProperty("left", "0");
            setTimeout(() => setIsResetting(false), 300);
        }
    };
    const handleCreate =()=>{
        const promise = create({ title: "Empty Zettel"});
        toast.promise(promise,{
            loading:"Creating an empty zettel",
            success:"Empty zettel created",
            error:"something went wrong!"
        });
    }

    return (
        <>
            <aside
                ref={sidebarRef}
                className={cn(
                    "group/sidebar relative z-[9999] flex  h-full w-60 flex-col overflow-y-auto bg-secondary rounded-r-2xl",
                    isResetting && "transition-all duration-300 ease-in-out ",
                    isMobile && "w-0",
                )}
            >

                <div
                    onClick={collapse}
                    role="button"
                    className={cn(
                        "absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600",
                        isMobile && "opacity-100",
                    )}
                >
                    <ChevronsLeft className="h-6 w-6" />
                </div>
                {/* <div>
                    <UserItem />
                </div> */}
                <Item
                label="search"
                icon={FileSearch}
                isSearch
                onClick={search.onOpen}
                />

                <Item
                    onClick={handleCreate}
                    label="Add"
                    icon={Plus}
                />
                <div className="mt-4">
                    <VaultList/>
                    {/* <Item 
                    onClick={handleCreate}
                    label="New Page"
                    icon={Plus}
                    /> */}
                    <Popover>
                        <PopoverTrigger className="w-full mt-4">
                            <Item label="Trash" icon={Trash2}/>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-72`" side={isMobile? "bottom":"right"}>
                            <TrashBox/>
                        </PopoverContent>
                    </Popover>
                    
                </div>

                <div
                    onMouseDown={handleMouseDown}
                    onClick={resetWidth}
                    className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100"
                ></div>
            </aside>
            <div
                ref={navbarRef}
                className={cn(
                    "absolute left-60 z-[99999] w-[calc(100%-240px)]",
                    isResetting && "transition-all duration-300 ease-in-out",
                    isMobile && "left-0 w-full",
                )}
            >
                {!!params.documentId?(
                    <div >
                         <Navbar
                        isCollapsed={isCollapsed}
                        onResetWidth={resetWidth}
                    
                    />
                    </div>
                   
                ):(
                <nav
                    className={cn(
                        "w-40 bg-transparent px-3 py-2 ",
                        !isCollapsed && "p-0",
                    )}
                >
                    {isCollapsed && (
                        <MenuIcon
                            onClick={resetWidth}
                            role="button"
                            className="h-6 w-6 text-muted-foreground"
                        />
                    )}
                </nav>
                )}

            </div>
        </>
    );
};
export default Navigation;