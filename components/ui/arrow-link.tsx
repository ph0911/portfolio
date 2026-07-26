import Link, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"

import { cn } from "@/lib/utils"

type ArrowLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children: ReactNode
    tone?: "default" | "accent"
  }

export function ArrowLink({
  children,
  className,
  tone = "default",
  ...props
}: ArrowLinkProps) {
  return (
    <Link
      className={cn(
        "group inline-flex min-h-11 items-center gap-5 border-b pb-1.5 text-base transition-colors",
        tone === "accent"
          ? "border-accent text-accent hover:border-foreground hover:text-foreground"
          : "border-foreground text-foreground hover:border-accent hover:text-accent",
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      <svg
        aria-hidden="true"
        className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          d="M3 10h13m-5-5 5 5-5 5"
          stroke="currentColor"
          strokeLinecap="square"
          strokeWidth="1.25"
        />
      </svg>
    </Link>
  )
}
