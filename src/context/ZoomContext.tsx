'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ZoomContextType {
  scale: number;
  setScale: (scale: number, fromKeyboard?: boolean) => void;
  isKeyboardInput: boolean;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScaleState] = useState(1);
  const [isKeyboardInput, setIsKeyboardInput] = useState(false);

  const setScale = useCallback((newScale: number, fromKeyboard: boolean = false) => {
    setScaleState(Math.min(Math.max(newScale, 0.1), 5));
    setIsKeyboardInput(fromKeyboard);
  }, []);

  return (
    <ZoomContext.Provider value={{ scale, setScale, isKeyboardInput }}>
      {children}
    </ZoomContext.Provider>
  );
};

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (context === undefined) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
};

const ZoomContextExport = { ZoomProvider, useZoom };
export default ZoomContextExport;

