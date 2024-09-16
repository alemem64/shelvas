import React from 'react';

const ZoomWrapperShadow: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-900/10 to-transparent z-10" />
    </>
  );
};

export default ZoomWrapperShadow;
