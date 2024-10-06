'use client';
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [0.1, svgHeight]),
    { stiffness: 200, damping: 75 }
  );

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative w-full max-w-4xl mx-auto", className)}
    >
      <div className="absolute -left-[3.25rem] top-8 md:-left-16 bottom-0">
        <motion.div
          className="ml-[27px] h-4 w-4 rounded-full  bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center"
        >
          <motion.div className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
        </motion.div>
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="ml-4 block"
          aria-hidden="true"
        >
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.25"
            className="text-neutral-300 dark:text-neutral-600"
          ></motion.path>
          <motion.path
            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
          ></motion.path>
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1="0"
              y2={y2}
            >
              <stop offset="0" stopColor="#f97316" stopOpacity="1"></stop>
              <stop offset="0.75" stopColor="#fbbf24" stopOpacity="1"></stop>
              <stop offset="1" stopColor="#fbbf24" stopOpacity="0"></stop>
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};