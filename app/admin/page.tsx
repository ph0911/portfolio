/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

import { PlusIcon } from "lucide-react"

import Posts from '@/components/posts'
import { PostMetadata } from "@/lib/posts"


export default function AdminDashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const space = searchParams.get("space") || "portfolio"
    // **TESTDATEN**
    const dummyPosts: PostMetadata[] = [
        {
            title: "Erster Test-Post",
            summary: "Ein Test-Blogeintrag für das Admin-Dashboard",
            image: "/images/posts/github-nextjs-vercel.png",
            author: "Pascal",
            publishedAt: "2025-02-01",
            slug: "test-post-1"
        },
        {
            title: "Zweiter Test-Post",
            summary: "Noch ein Test-Blogeintrag mit Markdown",
            image: "/images/posts/github-nextjs-vercel.png",
            author: "Pascal",
            publishedAt: "2025-02-02",
            slug: "test-post-2"
        }
    ]

    const dummyProjects: PostMetadata[] = [
        {
            title: "Portfolio Redesign",
            summary: "Ein neues Design für meine Portfolio-Webseite",
            image: "/images/posts/github-nextjs-vercel.png",
            author: "Pascal",
            publishedAt: "2025-01-15",
            slug: "portfolio-redesign"
        },
        {
            title: "AI Image Generator",
            summary: "Ein Tool, um KI-generierte Bilder für Kunden zu erstellen",
            image: "/images/posts/github-nextjs-vercel.png",
            author: "Pascal",
            publishedAt: "2025-01-20",
            slug: "ai-image-generator"
        }
    ]


    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push("/admin/login")
        }
    }, [status, session, router])



    if (status === "loading") return <p className="text-center">Lädt...</p>

    return (
        <div className="grid col-2 span-5 p-10">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>

            <div className="flex gap-4 mt-4" >
                <Link href="/admin/editor">
                    <Button variant="default" className="rounded-full"><PlusIcon className="w-4 h-4 mr-2" />Neuen Eintrag erstellen</Button>
                </Link>
            </div >

            {/* Übersichtskarten für Blog & Projekte */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6" >
                <div className=" mr-10">
                    <h1 className="font-medium text-xl  mb-5">Neuste Blogeinträge</h1>
                    <Posts posts={dummyPosts} />
                </div>
                <div className=" mr-10">
                    <h1 className="font-medium text-xl  mb-5">Neuste Projekteinträge</h1>
                    <Posts posts={dummyProjects} />
                </div>



            </div >
        </div >
    )
}