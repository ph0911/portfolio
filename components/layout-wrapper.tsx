"use client"

import { usePathname } from "next/navigation";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdminPage = pathname.startsWith("/admin"); // Prüft, ob es eine Admin-Seite ist

    return (
        <>
            {!isAdminPage && children}
        </>
    );
}