'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useZoom } from '@/context/ZoomContext';
import { LuMousePointer2, LuImage, LuPenTool, LuUndo2, LuRedo2 } from 'react-icons/lu';
import { RxHand } from 'react-icons/rx';
import { PiTextTBold, PiChatTeardropLight } from 'react-icons/pi';
import { TbMath } from 'react-icons/tb';
import { BiSquareRounded } from 'react-icons/bi';

const TopNav = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const { scale, setScale } = useZoom();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const zoomPercentage = Math.round(scale * 100);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setInputValue(zoomPercentage.toString());
  }, [zoomPercentage]);

  const handleZoomClick = () => {
    setIsEditing(true);
    setInputValue(zoomPercentage.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    applyZoom();
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyZoom();
    }
  };

  const applyZoom = () => {
    const newZoom = parseFloat(inputValue);
    if (!isNaN(newZoom) && newZoom >= 10 && newZoom <= 500) {
      setScale(newZoom / 100, true);
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
      return <LuMousePointer2 className="w-5 h-5" />;
    case 'section':
      return <RxHand className="w-5 h-5" />;
    case 'text':
      return <PiTextTBold className="w-5 h-5" />;
    case 'formula':
      return <TbMath className="w-5 h-5" />;
    case 'image':
      return <LuImage className="w-5 h-5" />;
    case 'rectangle':
      return <BiSquareRounded className="w-5 h-5" />;
    case 'pen':
      return <LuPenTool className="w-5 h-5" />;
    case 'undo':
      return <LuUndo2 className="w-5 h-5" />;
    case 'redo':
      return <LuRedo2 className="w-5 h-5" />;
    case 'chat':
      return <PiChatTeardropLight className="w-5 h-5" />;
    default:
      return null;
  }
};

const Divider = () => (
  <div className="w-px h-6 bg-gray-600 opacity-50"></div>
);

export default TopNav;
