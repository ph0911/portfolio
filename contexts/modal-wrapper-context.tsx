'use client';

import { createContext, useContext, ReactNode } from 'react';

interface ModalWrapperContextType {
  isInsideModal: boolean;
  isActive: boolean;
}

const ModalWrapperContext = createContext<ModalWrapperContextType>({ 
  isInsideModal: false,
  isActive: false
});

export function ModalWrapperProvider({ 
  children,
  isInsideModal = false,
  isActive = false
}: { 
  children: ReactNode;
  isInsideModal?: boolean;
  isActive?: boolean;
}) {
  return (
    <ModalWrapperContext.Provider value={{ isInsideModal, isActive }}>
      {children}
    </ModalWrapperContext.Provider>
  );
}

export function useModalWrapper() {
  return useContext(ModalWrapperContext);
}