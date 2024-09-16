'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useZoom } from '@/context/ZoomContext';

const TopNav = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const { scale, setScale } = useZoom();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const zoomPercentage = Math.round(scale * 100);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleZoomClick = () => {
    setIsEditing(true);
    setInputValue(zoomPercentage.toString());
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    applyZoom();
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      applyZoom();
    }
  };

  const applyZoom = () => {
    const newZoom = parseFloat(inputValue);
    if (!isNaN(newZoom) && newZoom >= 10 && newZoom <= 500) {
      setScale(newZoom / 100);
    }
    setIsEditing(false);
  };

  return (
    <nav className="bg-[#1E1E1E] text-white p-2 flex items-center text-sm">
      <button className="ml-2 mr-4 p-1 rounded-md hover:bg-gray-700">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <div className="flex-shrink-0 flex items-center">
        <span className="opacity-50 hover:bg-gray-700 px-2 py-1 rounded-md">My Book shelf</span>
        <span className="text-gray-400 mx-1">/</span>
        <span className="opacity-50 hover:bg-gray-700 px-2 py-1 rounded-md">First Projects</span>
        <span className="text-gray-400 mx-1">/</span>
        <span className="flex items-center whitespace-nowrap px-2 py-1 rounded-md hover:bg-gray-700">
          Book Name
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
      <div className="flex-grow flex justify-center">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-1">
            <ToolButton icon="pointer" hasDropdown selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <ToolButton icon="section" hasDropdown selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <Divider />
            <ToolButton icon="text" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <ToolButton icon="formula" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <Divider />
            <ToolButton icon="image" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <ToolButton icon="rectangle" hasDropdown selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <ToolButton icon="pen" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <Divider />
            <ToolButton icon="undo" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
            <ToolButton icon="redo" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
          </div>
          <Divider />
          <ToolButton icon="chat" selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center space-x-3">
        <div className="flex -space-x-2 relative">
          {[4, 3, 2, 1].map((i) => (
            <button key={i} style={{zIndex: i}} className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center ring-2 ring-[#1E1E1E] relative">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </button>
          ))}
          <button style={{zIndex: 0}} className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center ring-2 ring-gray-500 relative">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleInputKeyDown}
              className="w-16 px-2 py-1 rounded-md text-xs font-medium bg-gray-700 text-white"
            />
          ) : (
            <button
              onClick={handleZoomClick}
              className="px-2 py-1 rounded-md text-xs font-medium flex items-center hover:bg-gray-700 transition-colors"
            >
              {zoomPercentage}%
              <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          <button className="p-1 rounded-md hover:bg-gray-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
        <button className="px-3 py-1 bg-[#3579FF] rounded-md text-sm font-medium">
          Export
        </button>
      </div>
    </nav>
  );
};
const ToolButton = ({ icon, hasDropdown = false, selectedTool, setSelectedTool }) => (
  <button 
    className={`p-1 rounded-sm relative ${
      selectedTool === icon ? 'bg-[#3579FF]' : 'hover:bg-gray-700'
    }`}
    onClick={() => setSelectedTool(icon)}
  >
    {getToolIcon(icon)}
    {hasDropdown && (
      <svg className="w-2 h-2 absolute bottom-0 right-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    )}
  </button>
);

const getToolIcon = (icon) => {
  switch (icon) {
    case 'pointer':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.75 5.5L4 15.25V20h4.75l9.75-9.75L13.75 5.5zM17.5 3.5l3 3L22 5l-3-3-1.5 1.5z"/></svg>;
    case 'section':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>;
    case 'text':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M5 5v3h5v11h3V8h5V5H5z"/></svg>;
    case 'formula':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 8h-3v3h-2v-3H9v-2h3V6h2v3h3v2z"/></svg>;
    case 'image':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>;
    case 'rectangle':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>;
    case 'pen':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>;
    case 'undo':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>;
    case 'redo':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>;
    case 'chat':
      return <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>;
    default:
      return null;
  }
};

const Divider = () => (
  <div className="w-px h-6 bg-gray-600 opacity-50"></div>
);

export default TopNav;
