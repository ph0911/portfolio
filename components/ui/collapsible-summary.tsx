'use client'

import { Info } from 'lucide-react'

interface SummaryProps {
  summary: string
}

export default function Summary({ summary }: SummaryProps) {
  return (
    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
      {summary}
    </p>
  )
}