"use client";

import { ChevronDown, ChevronLeft, ChevronRight, LucideIcon, MoreHorizontal, MoreVertical, Plus, PlusCircle, PlusCircleIcon, PlusSquare, PlusSquareIcon, SlidersHorizontal, SlidersVertical, Trash2 } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";


interface ItemProps {
    id?: Id<"vaults">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
};
export const Item = ({
    id,
    label,
    onClick,
    icon: Icon,
    active,
    documentIcon,
    isSearch,
    level = 0,
    onExpand,
    expanded,
}: ItemProps) => {
    const router = useRouter();
    const create = useMutation(api.vaults.create);
    const archive = useMutation(api.vaults.archive);

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement,MouseEvent>
    ) =>{
        event.stopPropagation();
        if(!id) return;
        const promise = archive({id});

        toast.promise(promise,{
            loading:"moving to trash...",
            success:"success",
            error:"Cannot solo that note."
        });
    }
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    };
    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>

    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                // router.push(`vaults/${documentId}`);
            });
        toast.promise(promise, {
            loading: "Making Zettel...",
            success: "Zettel Creation success",
            error: "failed to create zettel"
        });
    };
    const ChevronsIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
            className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (
                <div
                    role="button"
                    className="h-full rounded-sm hover:bg-neutral-300 dark:bg-neutral-600 mr-1"
                    onClick={handleExpand}
                >
                    <ChevronsIcon
                        className="h-4 w-4 shrink-0 text-muted-foreground/50"
                    />
                </div>
            )}
            {documentIcon ? (
                <div className="shrink-0 mr-2 text-[18px]">
                    {documentIcon}
                </div>
            ) : (

                <Icon className="shrink-0 h-[28px] mr-2 text-muted-foreground" />
            )
            }
            <span className="truncate">
                {label}
            </span>
            {isSearch && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono font-medium text-muted-foreground opacity-100 ">
                    <span className="text-xs">ctrl</span>k
                </kbd>

            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                        onClick={(e)=> e.stopPropagation()}
                        asChild
                        
                        >
                            <div role="button" className="h-full ml-auto rounded-sm">
                                <SlidersHorizontal />
                            </div>

                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                        className="w-60"
                        align="start"
                        side="right"
                        forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                            <Trash2 className="h-4 w-4 mr-2"/>
                            Move to trash
                            </DropdownMenuItem>
                            
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className=" h-full ml-auto rounded-sm hover:bg-neutral-400 dark:hover:bg-neutral-700">
                        <PlusSquareIcon className="h-4 w-4 text-muted-foreground" />
                    </div>

                </div>
            )}
        </div>
    )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className="flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-[30%]" />

        </div>
    )
}