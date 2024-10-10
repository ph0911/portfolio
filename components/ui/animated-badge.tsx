'use client'

import React, { useState, useId, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Card {
  title: string
  content: string
}

const cards: Card[] = [
  {
    title: "React",
    content: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'. React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want to get a taste of React, add some interactivity to a simple HTML page, or start a complex React-powered app, the links in this section will help you get started."
  },
  {
    title: "Next.js",
    content: "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed. Next.js has all the tools you need to make the Web. Faster. Create static and dynamic websites and web applications with Next.js, the React framework for production. With Next.js, you can focus on your product and not on the tooling."
  },
  {
    title: "Tailwind",
    content: "Tailwind CSS is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override. Tailwind CSS is different from frameworks like Bootstrap, Foundation, or Bulma in that it's not a UI kit. It doesn't have a default theme, and there are no built-in UI components. It comes with a menu of predesigned widgets to build your site with, but doesn't impose design decisions that are difficult to undo."
  }
]

export default function AnimatedBadge() {
  const [activeCard, setActiveCard] = useState<Card | null>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveCard(null)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    if (activeCard) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [activeCard])

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <AnimatePresence>
        {activeCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-white/20 z-50 flex items-center justify-center p-4"
            onClick={() => setActiveCard(null)}
          >
            <motion.div
              layoutId={`card-${activeCard.title}-${id}`}
              className="bg-neutral-800 dark:bg-white w-full max-w-[500px] rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <motion.h2 layoutId={`title-${activeCard.title}-${id}`} className="text-2xl font-bold text-white dark:text-neutral-900">
                    {activeCard.title}
                  </motion.h2>
                  <button
                    onClick={() => setActiveCard(null)}
                    className="text-white dark:text-neutral-900 hover:text-neutral-300 dark:hover:text-neutral-600 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-white dark:text-neutral-900"
                >
                  {activeCard.content}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        {cards.map((card) => (
          <motion.div
            key={card.title}
            layoutId={`card-${card.title}-${id}`}
            onClick={() => setActiveCard(card)}
            className="inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-white dark:focus:ring-neutral-900 focus:ring-offset-2 bg-neutral-800 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-700 dark:hover:bg-neutral-100 cursor-pointer"
          >
            <motion.span layoutId={`title-${card.title}-${id}`}>
              {card.title}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}