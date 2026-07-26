"use client"

export function PrintButton() {
  return (
    <button
      className="underlined-link inline-flex min-h-11 items-center gap-2 text-sm"
      data-print-hidden
      onClick={() => window.print()}
      type="button"
    >
      Als PDF drucken
      <span aria-hidden="true">↗</span>
    </button>
  )
}
