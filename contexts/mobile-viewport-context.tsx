'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useMobileViewport } from '@/hooks/use-mobile-viewport';

interface MobileViewportContextType {
  isMobile: boolean;
  mounted: boolean;
}

const MobileViewportContext = createContext<MobileViewportContextType | undefined>(undefined);

export function MobileViewportProvider({ 
  children,
  breakpoint = 768
}: { 
  children: ReactNode;
  breakpoint?: number;
}) {
  const { isMobile, mounted } = useMobileViewport(breakpoint);

  return (
    <MobileViewportContext.Provider value={{ isMobile, mounted }}>
      {children}
    </MobileViewportContext.Provider>
  );
}

export function useMobileViewportContext() {
  const context = useContext(MobileViewportContext);
  if (context === undefined) {
    throw new Error('useMobileViewportContext must be used within a MobileViewportProvider');
  }
  return context;
}