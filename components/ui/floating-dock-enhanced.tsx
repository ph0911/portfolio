'use client'

import { cn } from "@/lib/utils"
import { IconFoldUp, IconFoldDown } from "@tabler/icons-react"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import Link from "next/link"
import { useRef, useState } from "react"
import { useMobileViewportContext } from "@/contexts/mobile-viewport-context"
import LiquidGlass, { LiquidGlassNavigation } from "./liquid-glass"

export const FloatingDockEnhanced = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  desktopClassName?: string
  mobileClassName?: string
}) => {
  const { isMobile } = useMobileViewportContext()

  return (
    <>
      {!isMobile && <FloatingDockDesktop items={items} className={desktopClassName} />}
      {isMobile && <FloatingDockMobile items={items} className={mobileClassName} />}
    </>
  )
}

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  const [open, setOpen] = useState(false)
  
  return (
    <div className={cn("relative block", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                <Link href={item.href} key={item.title}>
                  <LiquidGlassNavigation 
                    className="h-12 w-12 flex items-center justify-center"
                    variant="subtle"
                    enableSpecularHighlight={true}
                  >
                    <div className="h-5 w-6 text-gray-600 dark:text-gray-300">{item.icon}</div>
                  </LiquidGlassNavigation>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <LiquidGlassNavigation 
        className="h-12 w-12 flex items-center justify-center cursor-pointer"
        variant="default"
        enableSpecularHighlight={true}
        enableHover={true}
      >
        <button
          onClick={() => setOpen(!open)}
          className="h-full w-full flex items-center justify-center"
        >
          {open ? (
            <IconFoldDown className="h-6 w-6 text-gray-600 dark:text-gray-300" /> 
          ) : (
            <IconFoldUp className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}  
        </button>
      </LiquidGlassNavigation>
    </div>
  )
}

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[]
  className?: string
}) => {
  let mouseX = useMotionValue(Infinity)
  
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end rounded-2xl pb-3",
        className
      )}
    >
      <LiquidGlass 
        className="flex h-full gap-4 items-end px-4 pb-3 rounded-2xl"
        variant="dynamic"
        enableSpecularHighlight={true}
        adaptiveColors={true}
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </LiquidGlass>
    </motion.div>
  )
}

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue
  title: string
  icon: React.ReactNode
  href: string
}) {
  let ref = useRef<HTMLDivElement>(null)

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const [hovered, setHovered] = useState(false)

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full flex items-center justify-center relative cursor-pointer"
      >
        <LiquidGlass
          className="aspect-square rounded-full flex items-center justify-center relative w-full h-full"
          variant="subtle"
          enableSpecularHighlight={true}
          enableHover={true}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0, y: 10, x: "-50%" }}
                animate={{ opacity: 1, y: 0, x: "-50%" }}
                exit={{ opacity: 0, y: 2, x: "-50%" }}
                className="px-2 py-0.5 whitespace-pre rounded-md absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
              >
                <LiquidGlass 
                  className="px-2 py-1 rounded-md"
                  variant="intense"
                  enableSpecularHighlight={false}
                >
                  <span className="text-gray-800 dark:text-gray-200">{title}</span>
                </LiquidGlass>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            style={{ width: width, height: width }}
            className="flex items-center justify-center text-gray-600 dark:text-gray-300"
          >
            {icon}
          </motion.div>
        </LiquidGlass>
      </motion.div>
    </Link>
  )
}
