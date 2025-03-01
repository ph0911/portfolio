'use client'

import React, { useState, useEffect } from 'react'
import { useSwipe } from '@/hooks/use-swipe'
import MobileNavigation from '@/components/mobile-navigation'
import { useMobileViewportContext } from '@/contexts/mobile-viewport-context'

interface MobileNavigationWrapperProps {
  children: React.ReactNode
}

const MobileNavigationWrapper: React.FC<MobileNavigationWrapperProps> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)
  const { isMobile } = useMobileViewportContext()
  
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => navOpen && setNavOpen(false),
    () => !navOpen && isMobile && setNavOpen(true) // Only open navigation on mobile
  )

  useEffect(() => {
    const handleMenuClick = () => setNavOpen(true);
    const menuButton = document.querySelector('button[aria-label="Toggle navigation"]');
    menuButton?.addEventListener('click', handleMenuClick);

    return () => {
      menuButton?.removeEventListener('click', handleMenuClick);
    };
  }, []);

  return (
    <div 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="grow"
    >
      <MobileNavigation open={navOpen} setOpen={setNavOpen} />
      {children}
    </div>
  )
}

export default MobileNavigationWrapper