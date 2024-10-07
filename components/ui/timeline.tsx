/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}



export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Verwende offsetHeight für genauere Höhenberechnung
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 50%"],
  });

  // Verwende Framer Motion für die Scroll-Animationen
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full pb-24" ref={containerRef}>
      <div className=" max-w-7xl mx-auto">
        <h2 className="title mb-6">Werdegang</h2>
        {/* <p className="mb-8">Mein Ziel ist es, innovative digitale Lösungen zu entwickeln, die Ästhetik und Funktionalität nahtlos verbinden.</p> */}
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start md:pt-10 md:gap-8">
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-8 absolute left-0  w-8 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-neutral-300 dark:bg-neutral-700" />
              </div>
              <h3 className="subtitle hidden md:block  md:pl-12 md:text-2xl font-medium text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-12 md:pl-4 mb-4 w-full">
              <h3 className="subtitle md:hidden block text-xl mb-2 text-left font-medium text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Timeline-Linie */}
        <div
          style={{
            height: `${height}px`,
          }}
          className="absolute  left-4 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-300 dark:via-neutral-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-orange-400 via-amber-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};