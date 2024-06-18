import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { Trash, Undo } from "lucide-react"
import { toast } from 'sonner'

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { ConfirmModal } from "@/components/modals/confirm"

export function TrashBox() {

  const router = useRouter()
  const params = useParams()
  const vaults = useQuery(api.vaults.getTrash)
  const restore = useMutation(api.vaults.restore)
  const remove = useMutation(api.vaults.remove)

  const onClick = (vaultId: string) => {
    router.push(`/vault/${vaultId}`)
  }

  const onRestore = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, vaultId: Id<'vaults'>) => {
    event.stopPropagation()

    const promise = restore({ id: vaultId })

    toast.promise(promise, {
      loading: 'Restoring note...',
      success: 'Note restored!',
      error: 'Failed to restore note'
    })
  }

  const onRemove = (vaultId: Id<'vaults'>) => {
    const promise = remove({ id: vaultId })

    toast.promise(promise, {
      loading: 'Deleting note...',
      success: 'Note deleted!',
      error: 'Failed to delete note'
    })
    if (params.vaultId === vaultId) {
      router.push('/vault')
    }
  }

  return (
    <div className="text-sm">
      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          Empty
        </p>
        {vaults?.map(vault => (
          <div className="text-sm rounded-sm w-full hover:bg-primary/5 flex justify-between items-center text-primary text-cyan-950 dark:text-white"
            key={vault._id} role="button" onClick={() => onClick(vault._id)}
          >
            <span className="truncate pl-2">
              {vault.title}
            </span>
            <div className="flex items-center">
              <div className="rounded-sm p-2 hover:bg-neutral-200 
              dark:hover:bg-neutral-600" onClick={e => onRestore(e, vault._id)}>
                <Undo className="w-4 h-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(vault._id)}>
                <div className="rounded-sm p-2 hover:bg-neutral-200
                dark:hover:bg-neutral-600" role="button">
                  <Trash className="w-4 h-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
