import React from 'react';
import useZoom from '../context/ZoomContext';

interface PageHeaderProps {
  pageNumber: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageNumber }) => {
  const { zoomLevel } = useZoom();

  return (
    <div className="absolute top-0 left-0 right-0 p-2" style={{ transform: `scale(${100 / parseInt(zoomLevel)})`, transformOrigin: 'top left' }}>
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
