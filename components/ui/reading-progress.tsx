"use client"

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ReadingProgress() {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                setIsVisible(rect.top <= 0)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Initial check
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div ref={ref} className="reading-progress-container">
            {/* Hintergrundlinie */}
            <div
                className="fixed top-20 md:top-48 bottom-0 md:bottom-10 w-[0.2rem] md:w-[0.125rem] bg-neutral-200 dark:bg-neutral-700 reading-progress-line"
            />
            {/* Fortschrittslinie */}
            <motion.div
                className="fixed top-20 md:top-48 bottom-0 md:bottom-10 w-[0.2rem] md:w-[0.125rem] bg-gradient-to-b from-orange-400 via-amber-500 to-rose-500 reading-progress-line"
                style={{
                    scaleY,
                    originY: 0,
                    opacity: isVisible ? 1 : 0,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            />
            {/* Startkreis */}
            <div className="hidden md:block fixed w-2 h-2 rounded-full bg-orange-400 reading-progress-circle" />
            {/* Ausfade-Effekt am Ende */}

        </div>
    )
}