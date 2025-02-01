import NextAuth, { type Session, type User } from "next-auth";
import type { JWT } from "@auth/core/jwt";
import GitHub from "next-auth/providers/github";
import type { AdapterUser } from "next-auth/adapters";
import type { Account, Profile } from "next-auth";

const ALLOWED_USER_ID = process.env.ALLOWED_USER_ID;
if (!ALLOWED_USER_ID) {
  throw new Error("⚠️ ALLOWED_USER_ID ist nicht gesetzt! Bitte in der .env-Datei definieren.");
}

export const authOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }: { 
      token: JWT; 
      profile?: Profile 
    }) {
      if (profile) {
        token.avatar_url = profile.avatar_url as string;
        token.id = profile.id as string;
        token.email = profile.email as string;
      }
      return token;
    },
    async session({ session, token }: { 
      session: Session; 
      token: JWT 
    }) {
      if (session.user) {
        session.user.id = token.id?.toString() || '';
        session.user.image = (token.avatar_url as string) || session.user.image;
        session.user.email = token.email || session.user.email;
      }

      if (session.user?.id !== ALLOWED_USER_ID) {
        console.warn("Nicht autorisierter Zugriff:", session.user?.id);
        throw new Error("Nicht autorisiert");
      }

      return session;
    }
  }
};

export const { handlers, auth } = NextAuth(authOptions);