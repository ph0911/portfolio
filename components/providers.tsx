'use client'

import { ThemeProvider, useTheme } from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { Toaster } from '@/components/ui/sonner'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        enableSystem
        attribute='class'
        defaultTheme='system'
        disableTransitionOnChange
      >

        {children}

        <ToasterProvider />

      </ThemeProvider>
    </SessionProvider>
  )
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme()

  return (
    <Toaster
      position='top-right'
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
    />
  )
}