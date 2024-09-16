'use client'

import React, { createContext, useContext, useState } from 'react';

interface ToolbarContextType {
  isWhiteBar: boolean;
  toggleWhiteBar: () => void;
  activePage: string | null;
  setActivePage: (page: string | null) => void;
  isRightBarVisible: boolean;
  toggleRightBar: () => void;
  whitePage: string | null;
  setWhitePage: (page: string | null) => void;
}

const ToolbarContext = createContext<ToolbarContextType | undefined>(undefined);

export const ToolbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isWhiteBar, setIsWhiteBar] = useState(false);
  const [activePage, setActivePage] = useState<string | null>(null);
  const [isRightBarVisible, setIsRightBarVisible] = useState(true);
  const [whitePage, setWhitePage] = useState<string | null>(null);

  const toggleWhiteBar = () => {
    setIsWhiteBar(prev => !prev);
  };

  const setActiveWhitePage = (page: string | null) => {
    if (page === whitePage) {
      setWhitePage(null);
      setIsWhiteBar(false);
    } else {
      setWhitePage(page);
      setIsWhiteBar(true);
    }
    setActivePage(null);
    setIsRightBarVisible(true);
  };

  const toggleRightBar = () => {
    setIsRightBarVisible(prev => !prev);
  };

  return (
    <ToolbarContext.Provider value={{ 
      isWhiteBar, 
      toggleWhiteBar, 
      activePage, 
      setActivePage,
      isRightBarVisible,
      toggleRightBar,
      whitePage,
      setWhitePage: setActiveWhitePage
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
