'use client'

import React, { useState, useEffect } from 'react'
import { useSwipe } from '@/hooks/use-swipe'
import MobileNavigation from '@/components/mobile-navigation'

interface MobileNavigationWrapperProps {
  children: React.ReactNode
}

const MobileNavigationWrapper: React.FC<MobileNavigationWrapperProps> = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false)

  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => navOpen && setNavOpen(false),
    () => !navOpen && setNavOpen(true)
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