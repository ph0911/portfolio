'use client'

import React from 'react'
import { useSwipeable } from 'react-swipeable'

interface SwipeHandlerProps {
  onSwipeRight: () => void
  onSwipeLeft: () => void
}

const SwipeHandler: React.FC<SwipeHandlerProps> = ({ onSwipeRight, onSwipeLeft }) => {
  const handlers = useSwipeable({
    onSwipedRight: onSwipeRight,
    onSwipedLeft: onSwipeLeft,
    trackMouse: true,

    trackTouch: true,
  })

  return (
    <div 
      {...handlers} 
      style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0, 
        width: '20px', // Nur ein schmaler Streifen am linken Rand
        zIndex: 40,
        pointerEvents: 'auto' // Erlaubt Interaktionen
      }} 
    />
  )
}

export default SwipeHandler