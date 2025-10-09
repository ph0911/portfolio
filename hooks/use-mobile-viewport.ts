'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the viewport is mobile based on screen width
 * @param breakpoint - The width threshold for mobile devices (default: 768px)
 * @returns A boolean indicating if the current viewport is mobile
 */
  
export function useMobileViewport(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Initial check
    checkIsMobile();
    setMounted(true);
    
    // Set up listener for window resize
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [breakpoint]);

  return { isMobile, mounted };
}