'use client'
import React, { useState, useEffect } from 'react';

interface PageHeaderProps {
  pageNumber: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageNumber }) => {
  const [zoomLevel, setZoomLevel] = useState('100%');

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        const newZoom = Math.min(Math.max(parseInt(zoomLevel) + delta, 25), 400);
        setZoomLevel(`${newZoom}%`);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [zoomLevel]);

  return (
    <div className="absolute top-0 left-0 right-0 p-2" style={{ transform: `scale(${1 / (parseInt(zoomLevel) / 100)})`, transformOrigin: 'top left' }}>
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-xs">Page {pageNumber}</span>
        <div className="flex space-x-2">
          {/* Button content */}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
