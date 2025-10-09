import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "rounded-md border border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 px-2.5 py-0.5 text-xs font-semibold",
        secondary:
          "rounded-md border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2.5 py-0.5 text-xs font-semibold",
        destructive:
          "rounded-md border border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 px-2.5 py-0.5 text-xs font-semibold",
        outline: 
          "rounded-md border text-foreground px-2.5 py-0.5 text-xs font-semibold",
        glass:
          "rounded-md bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 px-2 py-1 text-[10px] font-medium",
      },
      size: {
        default: "",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({ className, variant, size, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? React.Fragment : 'div'
  return (
    <Comp className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
