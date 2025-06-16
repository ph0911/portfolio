'use client'

import React, { useState, useEffect } from 'react'
import { useSwipe } from '@/hooks/use-swipe'
import MobileNavigationSidebar from '@/components/layout/mobile-navigation-sidebar'
import { useMobileViewportContext } from '@/contexts/mobile-viewport-context'

interface MobileNavigationSidebarWrapperProps {
  children: React.ReactNode
}

export default function MobileNavigationSidebarWrapper({ children }: MobileNavigationSidebarWrapperProps) {
  const [navOpen, setNavOpen] = useState(false)
  const { isMobile } = useMobileViewportContext()
  
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe(
    () => navOpen && setNavOpen(false), // Swipe left zum Schließen
    () => !navOpen && isMobile && setNavOpen(true) // Swipe right zum Öffnen
  )

  useEffect(() => {
    const handleMenuClick = () => setNavOpen(!navOpen);
    const menuButton = document.querySelector('button[aria-label="Toggle navigation"]');
    menuButton?.addEventListener('click', handleMenuClick);

    return () => {
      menuButton?.removeEventListener('click', handleMenuClick);
    };
  }, [navOpen]);

  // Content Push Effect - Der Main Content wird nach rechts verschoben
  useEffect(() => {
    const mainElement = document.querySelector('main')
    const headerElement = document.querySelector('header')
    
    if (mainElement && headerElement) {
      if (navOpen) {
        // Content nach rechts verschieben um Platz für 48px Sidebar zu machen
        mainElement.style.transform = "translateX(48px)"
        mainElement.style.transition = "transform 300ms ease-in-out"
        headerElement.style.transform = "translateX(48px)"
        headerElement.style.transition = "transform 300ms ease-in-out"
        
        // Overscroll-X komplett unterbinden
        document.documentElement.style.overflowX = "hidden"
        document.body.style.overflowX = "hidden"
        document.body.style.width = "100vw"
      } else {
        // Content zurück zur ursprünglichen Position
        mainElement.style.transform = "translateX(0px)"
        mainElement.style.transition = "transform 300ms ease-in-out"
        headerElement.style.transform = "translateX(0px)"
        headerElement.style.transition = "transform 300ms ease-in-out"
        
        // Overscroll-X wieder normal
        document.documentElement.style.overflowX = ""
        document.body.style.overflowX = ""
        document.body.style.width = ""
      }
    }

    // Cleanup
    return () => {
      if (mainElement && headerElement) {
        mainElement.style.transform = ""
        mainElement.style.transition = ""
        headerElement.style.transform = ""
        headerElement.style.transition = ""
      }
      document.documentElement.style.overflowX = ""
      document.body.style.overflowX = ""
      document.body.style.width = ""
    }
  }, [navOpen])

  // Icon Animation Effect - Ganzer Header Button wandert smooth in die Sidebar
  useEffect(() => {
    const menuButton = document.querySelector('button[aria-label="Toggle navigation"]') as HTMLElement;
    const sidebarIcon = document.querySelector('.sidebar-icon') as HTMLElement;
    
    if (menuButton) {
      if (navOpen) {
        // Ganzer Header Button: nach LINKS bewegen (in Richtung Sidebar) und ausblenden
        menuButton.style.transform = 'translateX(-48px)'
        menuButton.style.opacity = '0'
        menuButton.style.transition = 'all 300ms ease-in-out'
        
        // Sidebar Icon ist bereits sichtbar (opacity: 1 im HTML)
      } else {
        // Ganzer Header Button: zurück bewegen und einblenden
        menuButton.style.transform = 'translateX(0px)'
        menuButton.style.opacity = '1'
        menuButton.style.transition = 'all 300ms ease-in-out'
      }
    }
  }, [navOpen])

  return (
    <div 
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="grow"
    >
      <MobileNavigationSidebar open={navOpen} setOpen={setNavOpen} />
      {children}
    </div>
  )
}
