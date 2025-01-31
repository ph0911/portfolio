import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID;
if (!ALLOWED_USER_ID) {
  throw new Error("⚠️ ALLOWED_USER_ID ist nicht gesetzt! Bitte in der .env-Datei definieren.");
}

const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.avatar_url = profile.avatar_url as string; // Speichert das Profilbild
        token.id = profile.id; // GitHub-ID speichern
        token.email = profile.email; // Falls du per E-Mail prüfen willst
      }
      return token;
    },
    async session({ session, token }) {
        if (session?.user) {
          session.user.id = token.id?.toString() ?? ''; // Fallback falls token.id nicht existiert
          session.user.image = (token.avatar_url as string) ?? session.user.image; // Falls token.avatar_url undefined ist, behalten wir das Original
          session.user.email = token.email ?? session.user.email;
        }
        // ❌ Zugriff verweigern, wenn nicht autorisiert
  if (session?.user?.id !== ALLOWED_USER_ID) {
    console.warn("Nicht autorisierter Zugriff:", session.user.id);
    
    // User ausloggen & zur Login-Seite mit Fehlermeldung weiterleiten
    await signOut({ redirect: false });
    throw new Error("Nicht autorisiert");
  }
      
        return session;
      }
  },
});

export const { GET, POST } = handlers;
export { auth, signIn, signOut };