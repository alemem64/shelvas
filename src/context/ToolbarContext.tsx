'use client'

import React, { createContext, useContext, useState } from 'react';

interface ToolbarContextType {
  isWhiteBar: boolean;
  toggleWhiteBar: () => void;
  activeComponent: string | null;
  setActiveComponent: (component: string | null) => void;
}

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

export const ToolbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhiteBar, setIsWhiteBar] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const toggleWhiteBar = () => {
    setIsWhiteBar(!isWhiteBar);
  };

  return (
    <ToolbarContext.Provider value={{ isWhiteBar, toggleWhiteBar, activeComponent, setActiveComponent }}>
      {children}
    </ToolbarContext.Provider>
  );
};

export const useToolbar = () => {
  const context = useContext(ToolbarContext);
  if (context === undefined) {
    throw new Error('useToolbar must be used within a ToolbarProvider');
  }
  return context;
};
