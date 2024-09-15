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

export function useZoom(): ZoomContextType {
  const context = useContext(ZoomContext);
  if (context === undefined) {
    throw new Error('useZoom must be used within a ZoomProvider');
  }
  return context;
}

// Add this line at the end of the file
export default { ZoomProvider, useZoom };
