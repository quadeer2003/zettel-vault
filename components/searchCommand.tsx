'use client'

import { File, Vault } from 'lucide-react'
import { useQuery } from "convex/react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/clerk-react"

import {
    CommandDialog, CommandEmpty,
    CommandGroup, CommandInput,
    CommandItem, CommandList
} from '@/components/ui/command'
import { searchFunc } from "@/hooks/search"
import { api } from "@/convex/_generated/api"
import { useEffect, useState } from "react"

export function SearchCommand() {

    const { user } = useUser()
    const router = useRouter()
    const vaults = useQuery(api.vaults.getSearch)
    const [isMounted, setIsMounted] = useState(false)

    const toggle = searchFunc(store => store.toggle)
    const isOpen = searchFunc(store => store.isOpen)
    const onClose = searchFunc(store => store.onClose)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggle()
            }
        }
        document.addEventListener('keydown', down)
        return () => document.removeEventListener('keydown', down)
    }, [toggle])

    const onSelect = (id: string) => {
        router.push(`/vaults/${id}`)
        onClose()
    }

    if (!isMounted) {
        return null
    }

    return (
        <div className="top-1">
            <CommandDialog open={isOpen} onOpenChange={onClose}>
                <CommandInput placeholder={`Search ${user?.lastName}'s Vault`} />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading='vaults'>
                        {vaults?.map(vault => (
                            <CommandItem key={vault._id} value={`${vault._id}-${vault.title}`}
                                title={vault.title} onSelect={onSelect}>
                                {vault.icon ? (
                                    <p className="mr-2 text-[18px]">
                                        {vault.icon}
                                    </p>
                                ) : (
                                    <File className="w-4 h-4 mr-2" />
                                )}
                                <span>
                                    {vault.title}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>

    )
}