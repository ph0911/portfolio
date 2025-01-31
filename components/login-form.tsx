"use client"

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  // Fehler aus der URL (z. B. wenn Nutzer nicht autorisiert ist)
  useEffect(() => {
    if (searchParams.get("error") === "unauthorized") {
      setError("Zugriff verweigert! Du bist nicht autorisiert.");
    }
  }, [searchParams]);

  // Redirect nach Login
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/admin");
    }
  }, [status, router]);

  return (
    <div className={cn("flex flex-col gap-6 items-center", className)} {...props}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {session ? `Hallo, ${session.user?.name}` : "Willkommen im Admin-Dashboard"}
          </CardTitle>
          <CardDescription>
            {session
              ? "Weiterleitung läuft..."
              : "Melde dich mit deinem GitHub-Account an."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Fehlermeldung anzeigen, falls vorhanden */}
          {error && (
            <p className="text-red-500 text-center font-medium mb-4">{error}</p>
          )}

          <div className="grid gap-6">
            {status === "loading" ? (
              <p className="text-center text-sm text-muted-foreground">
                Lade Benutzerdaten...
              </p>
            ) : session ? (
              <Button variant="outline" className="w-full" onClick={() => signOut()}>
                Logout
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2"
                onClick={() => signIn("github", { callbackUrl: "/admin/login?error=unauthorized" })}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                >
                  <path
                    fill="currentColor"
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577v-2.165c-3.338.726-4.043-1.416-4.043-1.416-.546-1.385-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.809 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.527.105-3.18 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.295-1.552 3.3-1.23 3.3-1.23.645 1.653.24 2.877.12 3.18.78.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.925.43.37.81 1.096.81 2.215v3.293c0 .315.195.69.8.575 4.765-1.58 8.2-6.08 8.2-11.38 0-6.627-5.373-12-12-12z"
                  />
                </svg>
                Login mit GitHub
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}