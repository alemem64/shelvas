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
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        const content = contentRef.current;
        if (!content) return;

        const rect = content.getBoundingClientRect();
        const x = e.clientX - rect.left + wrapper.scrollLeft;
        const y = e.clientY - rect.top + wrapper.scrollTop;

        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.min(Math.max(transform.scale * delta, 0.25), 4);

        const scaleChange = newScale / transform.scale;
        const newX = x - (x - transform.x) * scaleChange;
        const newY = y - (y - transform.y) * scaleChange;

        setTransform({ scale: newScale, x: newX, y: newY });
        setZoomLevel(`${Math.round(newScale * 100)}%`);

        // Adjust scroll position
        wrapper.scrollLeft = x * scaleChange - e.clientX + wrapper.offsetLeft;
        wrapper.scrollTop = y * scaleChange - e.clientY + wrapper.offsetTop;
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
        className="min-h-full min-w-full inline-block origin-top-left"
        style={{ 
          transform: `scale(${transform.scale}) translate(${-transform.x}px, ${-transform.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
