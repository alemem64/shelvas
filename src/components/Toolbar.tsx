'use client'
import React from 'react';
import { useToolbar } from '../context/ToolbarContext';

const Toolbar = () => {
  const { isSerifActive, toggleSerif } = useToolbar();

  return (
    <div className="relative">
      <div className="absolute left-0 right-0 top-9 h-5 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-0" />
      <div className="bg-white p-2 pl-4 flex justify-start items-center space-x-3 text-gray-700 text-xs shadow-toolbar relative z-10">
        <button
          className={`border border-gray-300 rounded p-1 bg-transparent hover:bg-gray-100 w-[70px] text-left flex justify-between items-center ${
            isSerifActive ? 'bg-gray-200' : ''
          }`}
          onClick={toggleSerif}
        >
          Serif
          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
     
        <select className="border border-gray-300 rounded p-1 bg-transparent hover:bg-gray-100">
          <option>Regular</option>
        </select>
        <input type="number" className="border border-gray-300 rounded p-1 w-16 bg-transparent" defaultValue={12} />
        <div className="flex space-x-1">
          <button className="rounded px-2 py-1 hover:bg-gray-100">A</button>
          <button className="rounded px-2 py-1 hover:bg-gray-100">U</button>
          <button className="rounded px-2 py-1 hover:bg-gray-100">A</button>
        </div>
        <div className="flex space-x-1">
          <button className="rounded p-1 hover:bg-gray-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="rounded p-1 hover:bg-gray-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="rounded p-1 hover:bg-gray-100">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm7 5a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1zm0 5a1 1 0 011-1h5a1 1 0 110 2h-5a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <button className="rounded px-2 py-1 hover:bg-gray-100">Effect</button>
        <button className="rounded px-2 py-1 hover:bg-gray-100">Stroke</button>
      </div>
    </div>
  );
};

export default Toolbar;