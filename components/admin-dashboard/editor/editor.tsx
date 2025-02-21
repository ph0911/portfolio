'use client'

import { forwardRef, useImperativeHandle } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

// eslint-disable-next-line react/display-name
const Editor = forwardRef((_, ref) => {
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Starte mit deinem Blogeintrag...</p>',
    })

    // Ermöglicht, dass die Parent-Komponente `getContent()` aufrufen kann
    useImperativeHandle(ref, () => ({
        getContent: () => editor ? editor.getJSON() : null,
    }))

    if (!editor) return null

    return (
        <div>
            <EditorContent className='px-5' editor={editor} />
        </div>
    )
})

export default Editor