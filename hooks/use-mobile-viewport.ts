'use client';

import { useCallback, useSyncExternalStore } from 'react';
import { useHydrated } from '@/hooks/use-hydrated';

/**
 * Custom hook to detect if the viewport is mobile based on screen width
 * @param breakpoint - The width threshold for mobile devices (default: 768px)
 * @returns A boolean indicating if the current viewport is mobile
 */
  
export function useMobileViewport(breakpoint: number = 768) {
  const mounted = useHydrated();
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener('resize', onStoreChange);
    return () => window.removeEventListener('resize', onStoreChange);
  }, []);
  const getSnapshot = useCallback(
    () => window.innerWidth < breakpoint,
    [breakpoint]
  );

  const isMobile = useSyncExternalStore(subscribe, getSnapshot, () => false);

  return { isMobile, mounted };
}
