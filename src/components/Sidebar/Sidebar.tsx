'use client'

import React, { useState } from 'react';
import { PiNotebookBold } from "react-icons/pi";
import { FaRegBookmark } from "react-icons/fa";
import { LuShapes, LuHash } from "react-icons/lu";
import { BsInboxes } from "react-icons/bs";
import { FiLayers, FiUploadCloud } from "react-icons/fi";
import { useToolbar } from '../../context/ToolbarContext';

// 모든 페이지 컴포넌트를 미리 임포트
import Design from './DarkPages/Design';
import Contents from './DarkPages/Contents';
import Assets from './DarkPages/Assets';
import ProjectBin from './DarkPages/ProjectBin';
import PageNumbering from './DarkPages/PageNumbering';
import Layers from './DarkPages/Layers';
import Upload from './DarkPages/Upload';

const pages = [
  { name: 'Design', icon: PiNotebookBold, component: Design },
  { name: 'Contents', icon: FaRegBookmark, component: Contents },
  { name: 'Assets', icon: LuShapes, component: Assets },
  { name: 'Project Bin', icon: BsInboxes, component: ProjectBin },
  { name: 'Numbering', icon: LuHash, component: PageNumbering },
  { name: 'Layers', icon: FiLayers, component: Layers },
  { name: 'Upload', icon: FiUploadCloud, component: Upload },
];

const Sidebar = () => {
  const [isRightBarVisible, setIsRightBarVisible] = useState(true);
  const { isWhiteBar, toggleWhiteBar, activeComponent, setActiveComponent } = useToolbar();

  const handlePageClick = (pageName: string) => {
    if (activeComponent === pageName) {
      setIsRightBarVisible(!isRightBarVisible);
    } else {
      setActiveComponent(pageName);
      setIsRightBarVisible(true);
    }
    if (isWhiteBar) {
      toggleWhiteBar(); // White bar 모드를 비활성화
    }
  };

  const SelectedComponent = isWhiteBar
    ? Fonts
    : pages.find(page => page.name === activeComponent)?.component || (() => <div>Page not found</div>);

  return (
    <aside className="flex bg-[#1E1E1E] text-gray-300">
      <div className="w-16 flex-shrink-0">
        <ul>
          {pages.map((page) => (
            <li
              key={page.name}
              className={`cursor-pointer hover:bg-[#2C2C2C] rounded w-16 h-16 ${
                activeComponent === page.name && !isWhiteBar ? 'bg-[#2C2C2C]' : ''
              }`}
              onClick={() => handlePageClick(page.name)}
            >
              <div className="w-full h-full flex flex-col items-center justify-center">
                {React.createElement(page.icon, { className: "w-5 h-5 mb-1" })}
                <span className="text-[10px] text-center w-full px-1">{page.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {(isRightBarVisible || isWhiteBar) && (
        <div className={`w-64 p-4 overflow-y-auto ${isWhiteBar ? 'bg-white text-black' : 'bg-[#2C2C2C]'}`}>
          <SelectedComponent />
        </div>
      )}
    </aside>
  );
};

export default Sidebar;