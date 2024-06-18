'use client'

interface NavbarProps {
  isCollapsed:boolean
  onResetWidth:() => void
}
import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { MenuIcon, Vault } from "lucide-react"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

import { Title } from "./title"
// import { Banner } from "./banner"
import { Menu } from "./menu"
import { Publish } from "./publish"

export function Navbar ({isCollapsed,onResetWidth}:NavbarProps) {

  const params = useParams()

  const vault = useQuery(api.vaults.getById,{
    documentId:params.documentId as Id<'vaults'>
  })

  if (vault === undefined) {
    return  (
    <nav className="bg-background px-3 py-2 w-full
      flex justify-between gap-x-4">
      <Title.Skeleton/>
      <div className="flex gap-x-2 items-center">
        <Menu.Skeleton/>
      </div>
    </nav>
    )
  }

  if (vault === null) {
    return null
  }

return (
    <>
      <nav className="bg-background px-3 py-2 w-full
      flex gap-x-4 items-center">
        {isCollapsed && (
          <MenuIcon className="w-6 h-6 text-muted-foreground" role="button"
           onClick={onResetWidth}
           />
        )}
        <div className="flex justify-between items-center w-full">
          <Title initialData={vault}/>
          <div className="flex gap-x-2 items-center">
            <Publish initialData={vault}/>
            <Menu documentId={vault._id}/>
          </div>
        </div>
      </nav>
      {/* {vault.isArchived && (
        <Banner documentId={vault._id}/>
      )} */}
    </>
)
}