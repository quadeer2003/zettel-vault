"use client"

import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
// import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react"
// import { BlockNoteView } from "@blocknote/shadcn"
import { BlockNoteView, lightDefaultTheme } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
// import "@blocknote/shadcn/style.css"
import { useTheme } from "next-themes"
// import "@blocknote/core/style.css"
import { useEdgeStore } from "@/lib/edgestore"
import { BlockNoteSchema, defaultBlockSpecs, filterSuggestionItems } from "@blocknote/core";

import "./styles.css"




interface EditorProps {
    onChange: (value: string) => void
    initialContent?: string
    editable?: boolean
}

/**
 *	Component Starts Here
 */
const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
    const { resolvedTheme } = useTheme()
    const { edgestore } = useEdgeStore()

    const handleUpload = async (file: File) => {
        const response = await edgestore.publicFiles.upload({
            file,
        })

        return response.url
    }

    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent
            ? (JSON.parse(initialContent) as PartialBlock[])
            : undefined,
        uploadFile: handleUpload,
    })

    return (
        <BlockNoteView
            editor={editor}
            editable={editable}
            onChange={() => onChange(JSON.stringify(editor.document, null, 2))}
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            data-theming-css-variables-demo
            className="z-[9999]"
        />
    )
}
export default Editor