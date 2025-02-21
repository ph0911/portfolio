'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import Editor from '@/components/admin-dashboard/editor/editor'

interface EditorRef {
    getContent: () => string;
}

interface Post {
    title: string;
    content: string;
    updatedAt: string;
}

export default function EditPostPage() {
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null)
    const editorRef = useRef<EditorRef>(null)

    useEffect(() => {
        async function fetchPost() {
            const res = await fetch(`/api/posts/${id}`)
            const data = await res.json()
            setPost(data)
        }
        fetchPost()
    }, [id])

    const handleSave = async () => {
        if (!editorRef.current) return

        const content = editorRef.current.getContent()

        const updatedPost = {
            ...post,
            content,
            updatedAt: new Date().toISOString(),
        }

        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPost),
        })

        if (response.ok) {
            alert('Gespeichert!')
        } else {
            alert('Fehler beim Speichern.')
        }
    }

    if (!post) return <p>Lädt...</p>

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Bearbeite: {post.title}</h1>

            <Editor ref={editorRef} initialContent={post.content} />

            <button onClick={handleSave} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                Änderungen speichern
            </button>
        </div>
    )
}