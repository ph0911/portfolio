import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'

import { cn } from '@/lib/utils'

import './globals.css'
import Providers from '@/components/providers'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { FloatingDock } from '@/components/ui/floating-dock'
import {
  IconBrandGithub,
  IconBrandXing,
  IconBrandLinkedin,
  IconHome,
  IconMail,
} from "@tabler/icons-react";


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

const links = [
  {
    title: "Home",
    icon: (
      <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "/",
  },
  {
    title: "Mail",
    icon: (
      <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "mailto:pascalheue@gmail.com?subject=Kontakt%20Anfrage%20Website&body=Hey%2C%20",
  },
  {
    title: "LinkedIn",
    icon: (
      <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },

  {
    title: "Xing",
    icon: (
      <IconBrandXing className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
  {
    title: "GitHub",
    icon: (
      <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
    ),
    href: "#",
  },
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <Header />
            <main className='grow'>{children}</main>
            <FloatingDock items={links} desktopClassName='fixed inset-x-0 bottom-12 mx-auto w-fit' mobileClassName='fixed right-7 bottom-7' />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}