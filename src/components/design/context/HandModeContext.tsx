'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface HandModeContextType {
  isHandMode: boolean;
  setIsHandMode: (value: boolean) => void;
  isSpacePressed: boolean;
}

const HandModeContext = createContext<HandModeContextType | undefined>(undefined);

export const HandModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isHandMode, setIsHandMode] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat) {
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <HandModeContext.Provider value={{ isHandMode, setIsHandMode, isSpacePressed }}>
      {children}
    </HandModeContext.Provider>
  );
};

export const useHandMode = () => {
  const context = useContext(HandModeContext);
  if (context === undefined) {
    throw new Error('useHandMode must be used within a HandModeProvider');
  }
  return context;
};
