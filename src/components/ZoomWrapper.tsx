'use client'
import React, { useEffect, useRef } from 'react';
import { useZoom } from '../context/ZoomContext';

const ZoomWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { zoomLevel, setZoomLevel } = useZoom();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -5 : 5;
        const newZoom = Math.min(Math.max(parseInt(zoomLevel) + delta, 25), 400);
        setZoomLevel(`${newZoom}%`);
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (wrapper) {
        wrapper.removeEventListener('wheel', handleWheel);
      }
    };
  }, [zoomLevel, setZoomLevel]);

  return (
    <div ref={wrapperRef} className="w-full h-full" style={{ transform: `scale(${parseInt(zoomLevel) / 100})`, transformOrigin: 'top left' }}>
      {children}
    </div>
  );
};

export default ZoomWrapper;
