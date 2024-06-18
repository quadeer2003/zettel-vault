'use client'	

import {AlertDialog,AlertDialogAction,AlertDialogCancel
  ,AlertDialogContent,AlertDialogDescription
  ,AlertDialogFooter,AlertDialogHeader,
AlertDialogTitle,AlertDialogTrigger} from '@/components/ui/alert-dialog'
import React from "react"

interface ConfirmModalProps {
  children:React.ReactNode
  onConfirm:() => void
}

export function ConfirmModal ({children,onConfirm}:ConfirmModalProps) {

  const handleConfirm = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    e.stopPropagation()
    onConfirm()
  }
  
return (
    <AlertDialog>
      <AlertDialogTrigger onClick={e => e.stopPropagation()} asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
          <AlertDialogAction onClick={handleConfirm}>
            Confirm
          </AlertDialogAction>
          <AlertDialogCancel onClick={e => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
)
}