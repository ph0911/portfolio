'use client'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push("/admin/login");
        }
    }, [status, session, router]);

    if (status === "loading") return <p>Lädt...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Willkommen im Admin Dashboard</h1>
            <p>Hier kannst du deine Inhalte verwalten.</p>
            {/* Hier später Widgets oder eine Übersicht hinzufügen */}
        </div>
    );
}