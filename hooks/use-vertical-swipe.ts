import { useState, useCallback, useRef, useEffect } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface UseVerticalSwipeProps {
  onSwipeDown: () => void;
  onSnapBack: () => void;
  dragThreshold?: number; // Percentage of screen height to trigger close (0-1)
  isAtTopRef: React.RefObject<boolean>;
}

export const useVerticalSwipe = ({
  onSwipeDown,
  onSnapBack,
  dragThreshold = 0.5,
  isAtTopRef
}: UseVerticalSwipeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const dragY = useMotionValue(0);
  const [windowHeight, setWindowHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  
  // Set window height on client side
  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Y position with spring physics for smooth animation
  const y = useSpring(dragY, { 
    stiffness: 300, 
    damping: 30 
  });
  
  // Scale opacity based on drag distance
  const opacity = useTransform(
    dragY,
    [0, windowHeight * dragThreshold],
    [1, 0.5]
  );
  
  // Track if user is dragging handle or content
  const isDraggingHandleRef = useRef(false);
  const currentDragY = useRef(0);
  
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    isDraggingHandleRef.current = target.closest('.modal-handle') !== null;
    
    setDragStartY(e.touches[0].clientY);
    setIsDragging(true);
    currentDragY.current = 0;
  }, []);
  
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY;
    
    // Only allow dragging down
    if (deltaY < 0) {
      dragY.set(0);
      currentDragY.current = 0;
      return;
    }
    
    // Only allow dragging if at the top of the content OR if dragging the handle
    if (isDraggingHandleRef.current || isAtTopRef?.current) {
      dragY.set(deltaY);
      currentDragY.current = deltaY;
    } else {
      dragY.set(0);
      currentDragY.current = 0;
    }
  }, [isDragging, dragStartY, dragY, isAtTopRef]);
  
  const onTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    // Use the ref value instead of dragY.get()
    const finalY = currentDragY.current;
    
    if (finalY > windowHeight * dragThreshold) {
      dragY.set(windowHeight);
      onSwipeDown();
    } else {
      dragY.set(0);
      onSnapBack();
    }
    
    setIsDragging(false);
    isDraggingHandleRef.current = false;
    currentDragY.current = 0;
  }, [isDragging, dragY, windowHeight, dragThreshold, onSwipeDown, onSnapBack]);
  
  return {
    y,
    opacity,
    dragY,
    isDragging,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};