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
  const [windowHeight, setWindowHeight] = useState(800); // Default height
  
  // Set window height on client side
  useEffect(() => {
    setWindowHeight(window.innerHeight);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    
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
  
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    // Check if user is touching the handle element
    const target = e.target as HTMLElement;
    isDraggingHandleRef.current = target.closest('.modal-handle') !== null;
    
    setDragStartY(e.touches[0].clientY);
    setIsDragging(true);
  }, []);
  
  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY;
    
    // Only allow dragging down
    if (deltaY < 0) {
      dragY.set(0);
      return;
    }
    
    // Only allow dragging if at the top of the content OR if dragging the handle
    if (isDraggingHandleRef.current || isAtTopRef?.current) {
      dragY.set(deltaY);
    } else {
      dragY.set(0);
    }
  }, [isDragging, dragStartY, dragY, isAtTopRef]);
  
  const onTouchEnd = useCallback(() => {
    if (!isDragging) return;
    
    // Get final position
    const finalY = dragY.get();
    
    // If dragged past threshold, close the modal
    if (finalY > windowHeight * dragThreshold) {
      onSwipeDown();
    } else {
      // Otherwise, snap back
      dragY.set(0);
      onSnapBack();
    }
    
    setIsDragging(false);
    isDraggingHandleRef.current = false;
  }, [isDragging, dragY, dragThreshold, windowHeight, onSwipeDown, onSnapBack]);
  
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