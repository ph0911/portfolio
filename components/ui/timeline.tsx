"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useModalWrapper } from '@/contexts/modal-wrapper-context';

interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // Default to first item as active
  
  // Get modal context, defaulting to false if not provided
  const modalContext = useModalWrapper();
  const inModal = modalContext?.isInsideModal ?? false;
  const isModalActive = modalContext?.isActive ?? false;

  // Calculate accurate height based on content
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
  
  // Use different scroll offsets based on modal state
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: inModal 
      ? ["start start", "end start"] // More aggressive offset for modal
      : ["start 30%", "end 50%"],    // Original offset for regular page
  });

  // Handle scroll animation differently based on modal context
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Skip animation updates if in an inactive modal
    if (inModal && !isModalActive) return;
    
    const threshold = 1 / data.length;
    const newIndex = Math.floor(latest / threshold);
    if (newIndex >= 0 && newIndex < data.length) {
      setActiveIndex(newIndex);
    }
  });
  
  // Animation transforms
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div 
      className={`${inModal ? "relative z-[500]" : ""} w-full pb-24`} 
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="title mb-8">Erfahrung</h2>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Timeline Line */}
        <div
          style={{
            height: `${height}px`,
          }}
          className={`absolute left-1 top-0 overflow-hidden w-[1px] ${
            inModal 
              ? "bg-neutral-200 dark:bg-neutral-700" 
              : "bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[5%] via-neutral-200 dark:via-neutral-700 to-transparent to-[95%] [mask-image:linear-gradient(to_bottom,transparent_5%,black_15%,black_85%,transparent_95%)]"
          } z-0`}
        >
          <motion.div
            style={{ 
              height: heightTransform, 
              opacity: inModal ? 1 : opacityTransform 
            }}
            className="absolute inset-x-0 top-0 w-[1px] bg-orange-400"
          />
        </div>
        
        {data.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex mb-12"
            initial={{ opacity: 0.4 }}
            animate={{ 
              opacity: inModal ? 1 : (activeIndex === index ? 1 : 0.4),
              scale: 1
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky flex flex-col items-start top-32 self-start z-10">
              {/* Dot indicator with original size */}
              <motion.div 
                className="h-2 w-2 absolute left-0 top-2 rounded-full bg-black dark:bg-white z-20"
                animate={{ 
                  scale: inModal ? 1 : (activeIndex === index ? 1.5 : 1),
                  opacity: inModal ? 1 : (activeIndex === index ? 1 : 0.5)
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="relative pl-6 w-full">
              <div className="mb-3">
                <h3 className="text-lg font-medium text-foreground">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                )}
              </div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ 
                  y: inModal ? 0 : (activeIndex === index ? 0 : 10),
                  opacity: inModal ? 0.9 : (activeIndex === index ? 1 : 0.7)
                }}
                transition={{ duration: 0.4 }}
                className="prose-sm md:prose-base dark:prose-invert"
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};