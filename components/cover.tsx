'use client'

import Image from "next/image"
import { useParams } from "next/navigation"
import { ImageIcon, X } from "lucide-react"
import { useMutation } from "convex/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
// import { useCoverImage } from "@/hooks/use-cover-image"
import { useConverImage } from "@/hooks/use-cover-image"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useEdgeStore } from "@/lib/edgestore"
import { Skeleton } from "@/components//ui/skeleton"

interface CoverProps {
  url?:string
  preview?:boolean
}

export function Cover ({url,preview}:CoverProps) {

  const {edgestore} = useEdgeStore()
  const params = useParams()
  const coverIamge = useConverImage()
  const removeCoverImage = useMutation(api.vaults.removeCoverImage)

  const onRemove = async () => {
    if (url) {
      await edgestore.publicFiles.delete({
        url:url
      })
    }
    removeCoverImage({
      id:params.documentId as Id<'vaults'>
    })
  }

return (
    <div className={cn(`relative mx-auto w-5/6 h-44 md:w-7/12 group top-14`,
    !url && 'h-[12vh]',
    url)}>
      {!!url && (
        <Image className="object-cover rounded-lg " src={url} alt='Cover' fill/>
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute top-5 right-5 flex gap-x-2 items-center">
          <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={() => coverIamge.onReplace(url)}>
            <ImageIcon className="w-4 h-4 mr-2 rounded-lg"/>
            Change Cover
          </Button>
            <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={onRemove}>
            <X className="w-4 h-4 mr-2"/>
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]"/>
  )
}