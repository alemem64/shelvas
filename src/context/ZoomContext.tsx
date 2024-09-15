'use client'
import React, { createContext, useState, useContext } from 'react';

interface ZoomContextType {
  zoomLevel: string;
  setZoomLevel: React.Dispatch<React.SetStateAction<string>>;
}

const ZoomContext = createContext<ZoomContextType | undefined>(undefined);

export const ZoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [zoomLevel, setZoomLevel] = useState('100%');
  return <ZoomContext.Provider value={{ zoomLevel, setZoomLevel }}>{children}</ZoomContext.Provider>;
};

const useZoom = (): ZoomContextType => {
  const context = useContext(ZoomContext);
  if (context === undefined) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
};

export { useZoom };
