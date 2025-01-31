'use client'
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

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
        <div className="flex justify-center items-center h-screen">
            {session?.user?.image && (
                <Image
                    src={session.user.image}
                    alt="Profilbild"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
            )}
            <h1>Welcome {session?.user?.name}</h1>
            <p>Email: {session?.user?.email}</p>
            <Button variant="outline" className="w-full" onClick={() => signOut()}>
                Logout
            </Button>
        </div>
    );
}