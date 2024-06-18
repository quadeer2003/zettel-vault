"use client";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileCode2, FileCodeIcon, FilePenIcon, FilesIcon } from "lucide-react";

interface VaultListProps {
    parentDocumentId?: Id<"vaults">
    level?: number;
    data?: Doc<"vaults">[];
}
export const VaultList = ({
    parentDocumentId,
    level = 0
}: VaultListProps) => {
    const params = useParams();
    const router = useRouter();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId]
        }))
    };

    const vaults = useQuery(api.vaults.getSidebar, {
        parentDocument: parentDocumentId
    });
    const onRedirect = (documentId: string) => {
        router.push(`/vault/${documentId}`);
    };

    if (vaults === undefined) {
        return (
            <>
                <Item.Skeleton level={level} />
                {level === 0 && (
                    <>
                        <Item.Skeleton level={level} />
                        <Item.Skeleton level={level} />
                    </>

                )}
            </>
        );
    };

    return (
        <>
            <p style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : undefined
            }}
                className={cn("hidden text-sm text-muted-foreground/80",
                    expanded && "last:block",
                    level === 0 && "hidden"
                )}
            >
                Empty
            </p >
            {vaults.map((vault) => (
                <div key={vault._id}>
                    <Item
                        id={vault._id}
                        onClick={() => onRedirect(vault._id)}
                        label={vault.title}
                        icon={FilePenIcon}
                        documentIcon={vault.icon}
                        active={params.documentId == vault._id}
                        level={level}
                        onExpand={() => onExpand(vault._id)}
                        expanded={expanded[vault._id]}


                    />
                    {expanded[vault._id] && (
                        <VaultList
                            parentDocumentId={vault._id}
                            level={level + 1}
                        />
                    )}
                </div>
            ))}
        </>
    )
}