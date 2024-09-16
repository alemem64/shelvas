'use client'
import React, { createContext, useContext, useState, useCallback } from 'react';

interface ZoomContextType {
  scale: number;
  setScale: (scale: number) => void;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScaleState] = useState(1);

  const setScale = useCallback((newScale: number) => {
    setScaleState(Math.min(Math.max(newScale, 0.1), 5));
  }, []);

  return (
    <ZoomContext.Provider value={{ scale, setScale }}>
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

export default { ZoomProvider, useZoom };
