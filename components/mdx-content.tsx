import type { ComponentPropsWithoutRef, ReactNode } from "react"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { highlight } from "sugar-high"

function Code({
  children,
  ...props
}: ComponentPropsWithoutRef<"code"> & { children?: ReactNode }) {
  if (typeof children !== "string") {
    return <code {...props}>{children}</code>
  }

  return (
    <code
      dangerouslySetInnerHTML={{ __html: highlight(children) }}
      {...props}
    />
  )
}

function Anchor({
  href = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const external = href.startsWith("http")

  return (
    <Link
      className="underlined-link"
      href={href}
      rel={external ? "noreferrer" : undefined}
      target={external ? "_blank" : undefined}
      {...props}
    >
      {children}
    </Link>
  )
}

const components = {
  a: Anchor,
  code: Code,
}

type MdxContentProps = {
  source: string
}

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote components={components} source={source} />
}

export default MdxContent
