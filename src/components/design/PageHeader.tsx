import React from 'react';
import { FiChevronUp, FiChevronDown, FiCopy, FiTrash2, FiPlus } from 'react-icons/fi';

interface PageHeaderProps {
  pageNumber: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pageNumber }) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-10 flex justify-between items-center px-2">
      <span className="text-gray-600 text-sm">Page {pageNumber}</span>
      <div className="flex space-x-1">
        {[FiChevronUp, FiChevronDown, FiCopy, FiTrash2, FiPlus].map((Icon, index) => (
          <button
            key={index}
            className="p-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
            aria-label={Icon.name.replace('Fi', '')}
          >
            <Icon className="w-5 h-5 text-gray-600" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;
