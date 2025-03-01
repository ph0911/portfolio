'use client';

import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useVerticalSwipe } from '@/hooks/use-vertical-swipe';
import { useMobileViewportContext } from '@/contexts/mobile-viewport-context';
import { ModalWrapperProvider } from '@/contexts/modal-wrapper-context';

interface ModalWrapperProps {
  parentPath: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function ModalWrapper({
  parentPath,
  children,
  isActive = false,
}: ModalWrapperProps) {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  const isAtTopRef = useRef<boolean>(true);
  const { isMobile, mounted } = useMobileViewportContext();

  // Check if we're at the top of the scroll
  const checkScrollPosition = () => {
    if (!contentRef.current) return;
    isAtTopRef.current = contentRef.current.scrollTop <= 10;
  };

  // Handle close modal
  const handleClose = () => {
    router.push(parentPath);
  };

  // Set up our vertical swipe hook
  const {
    y,
    opacity,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  } = useVerticalSwipe({
    onSwipeDown: handleClose,
    onSnapBack: () => {/* Animation handled by spring physics */},
    isAtTopRef,
  });

  // If not mounted yet, render nothing to avoid hydration issues
  if (!mounted) {
    return null;
  }

  // Modal is only active on mobile devices
  if (!isMobile) {
    return <ModalWrapperProvider isInsideModal={false} isActive={false}>{children}</ModalWrapperProvider>;
  }

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div 
          className="fixed inset-0 z-50 bg-black/10 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute bottom-0 w-full max-h-[85vh] py-4 rounded-t-3xl bg-background shadow-2xl border-t border-gray-300 dark:border-gray-900"
            style={{ y, opacity }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: 'spring',
              stiffness: 250,
              damping: 30,
              mass: 0.9
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Handle bar */}
            <div className="modal-handle absolute top-[-42px] h-12 w-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none">
              <div className="w-10 h-1 rounded-full bg-gray-700 dark:bg-gray-200" />
            </div>
            
            {/* Scrollable content */}
            <div 
              className="max-h-[85vh] overflow-y-auto overscroll-contain"
              ref={contentRef}
              onScroll={checkScrollPosition}
            >
              <ModalWrapperProvider isInsideModal={true} isActive={isActive}>
                {children}
              </ModalWrapperProvider>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}