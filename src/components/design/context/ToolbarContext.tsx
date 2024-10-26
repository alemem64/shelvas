'use client'

import React, { createContext, useContext, useState } from 'react';

interface ToolbarContextType {
  isWhiteBar: boolean;
  setIsWhiteBar: (value: boolean) => void;
  activePage: string | null;
  setActivePage: (page: string | null) => void;
  isRightBarVisible: boolean;
  setIsRightBarVisible: (value: boolean) => void;
  whitePage: string | null;
  setWhitePage: (page: string | null) => void;
  lastClickedButton: string | null;
  setLastClickedButton: (button: string | null) => void;
}

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

export const ToolbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhiteBar, setIsWhiteBar] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [isRightBarVisible, setIsRightBarVisible] = useState(true);
  const [whitePage, setWhitePage] = useState<string | null>(null);
  const [lastClickedButton, setLastClickedButton] = useState<string | null>(null);

  return (
    <ToolbarContext.Provider value={{ 
      isWhiteBar, 
      setIsWhiteBar,
      activePage, 
      setActivePage,
      isRightBarVisible,
      setIsRightBarVisible,
      whitePage,
      setWhitePage,
      lastClickedButton,
      setLastClickedButton
    }}>
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
