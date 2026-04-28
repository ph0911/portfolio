'use client'

import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useHydrated } from '@/hooks/use-hydrated'

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useHydrated()

  if (!mounted) {
    return null
  }

  return (
    <Button
      size='sm'
      variant='ghost'
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
      }}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='size-5 text-orange-300' />
      ) : (
        <Moon className='size-5 text-sky-950' />
      )}

      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
