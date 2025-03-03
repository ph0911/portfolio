'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMobileViewportContext } from '@/contexts/mobile-viewport-context';

export function useInViewPreload(path: string, options = {}) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const router = useRouter();
  const { isMobile } = useMobileViewportContext();
  
  useEffect(() => {
    // Add debug log for mobile state
    // console.log(`Setup for ${path} - isMobile: ${isMobile}`);
    
    if (!ref || !isMobile) {
      // console.log(`Skipping preload for ${path} - isMobile: ${isMobile}`);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Add debug log for intersection
        // console.log(`Intersection for ${path}: ${entry.isIntersecting}`);
        
        setIsInView(entry.isIntersecting);
        
        if (entry.isIntersecting) {
          // console.log(`Preloading path: ${path}`);
          router.prefetch(path);
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(ref);
    
    return () => {
      observer.disconnect();
    };
  }, [ref, path, router, isMobile]);

  return { ref: setRef, isInView };
}