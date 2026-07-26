import type { Metadata } from "next"
import localFont from "next/font/local"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { cn } from "@/lib/utils"

import "./globals.css"

const geistSans = localFont({
  display: "swap",
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
})

const geistMono = localFont({
  display: "swap",
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pascalheue.dev"),
  title: {
    default: "Pascal Heue – Software für echte Alltage",
    template: "%s – Pascal Heue",
  },
  description:
    "Pascal Heue entwickelt ruhige, verlässliche Software an der Schnittstelle von Produktdesign, nativer Entwicklung und local-first Architektur.",
  authors: [{ name: "Pascal Heue", url: "/" }],
  creator: "Pascal Heue",
  keywords: [
    "Softwareentwicklung",
    "Produktdesign",
    "iOS",
    "Webentwicklung",
    "Local-first",
  ],
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
      "application/feed+json": "/feed.json",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Pascal Heue",
    title: "Pascal Heue – Software für echte Alltage",
    description:
      "Projekte, Fortschritte und Entscheidungen aus Produktdesign, nativer Entwicklung und local-first Architektur.",
    url: "/",
  },
  twitter: {
    card: "summary",
    title: "Pascal Heue – Software für echte Alltage",
    description:
      "Projekte, Fortschritte und Entscheidungen aus Produktdesign, nativer Entwicklung und local-first Architektur.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="de">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "flex min-h-screen flex-col bg-background font-sans text-foreground antialiased",
        )}
      >
        <a className="skip-link" href="#content">
          Zum Inhalt springen
        </a>
        <SiteHeader />
        <main className="grow" id="content">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
