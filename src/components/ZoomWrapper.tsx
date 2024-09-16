'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useZoom } from '../context/ZoomContext';

const ZoomWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { zoomLevel, setZoomLevel } = useZoom();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        const rect = content.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(transform.scale * delta, 0.25), 4);

        const scaleChange = newScale / transform.scale;
        const newX = transform.x - (mouseX / transform.scale) * (scaleChange - 1);
        const newY = transform.y - (mouseY / transform.scale) * (scaleChange - 1);

        setTransform({ scale: newScale, x: newX, y: newY });
        setZoomLevel(`${Math.round(newScale * 100)}%`);

        // Adjust scroll position immediately
        wrapper.scrollLeft += mouseX * (scaleChange - 1);
        wrapper.scrollTop += mouseY * (scaleChange - 1);
      }
    };

    wrapper.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
    };
  }, [transform, setZoomLevel]);

  return (
    <div className="w-full h-full overflow-auto bg-[#EBECF0]" ref={wrapperRef}>
      <div 
        ref={contentRef}
        className="min-h-full min-w-full inline-block"
        style={{ 
          transform: `scale(${transform.scale})`,
          transformOrigin: '0 0',
          marginLeft: `${transform.x}px`,
          marginTop: `${transform.y}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
