'use client'
import React, { useEffect, useRef, useState } from 'react';
import { useZoom } from '../context/ZoomContext';

const ZoomWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { zoomLevel, setZoomLevel } = useZoom();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isFullyVisible, setIsFullyVisible] = useState(true);

  const updateFullyVisible = () => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const isFullWidth = content.offsetWidth * transform.scale > wrapper.clientWidth;
    const isFullHeight = content.offsetHeight * transform.scale > wrapper.clientHeight;
    setIsFullyVisible(!(isFullWidth || isFullHeight));
  };

  const centerContent = (scale: number) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return { x: 0, y: 0 };

    const newX = Math.max((wrapper.clientWidth - content.offsetWidth * scale) / 2, 0);
    const newY = Math.max((wrapper.clientHeight - content.offsetHeight * scale) / 2, 0);
    return { x: newX, y: newY };
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();

        const delta = e.deltaY > 0 ? 0.95 : 1.05;
        const newScale = Math.min(Math.max(transform.scale * delta, 0.25), 4);

        let newX, newY;

        if (!isFullyVisible) {
          // Mouse-following zoom when content is larger than the wrapper
          const rect = wrapper.getBoundingClientRect();
          const mouseX = (e.clientX - rect.left - transform.x) / transform.scale;
          const mouseY = (e.clientY - rect.top - transform.y) / transform.scale;

          newX = e.clientX - rect.left - mouseX * newScale;
          newY = e.clientY - rect.top - mouseY * newScale;

          // Constrain the content within the wrapper
          newX = Math.min(0, Math.max(newX, wrapper.clientWidth - content.offsetWidth * newScale));
          newY = Math.min(0, Math.max(newY, wrapper.clientHeight - content.offsetHeight * newScale));
        } else {
          // Centered zoom when content is smaller than the wrapper
          ({ x: newX, y: newY } = centerContent(newScale));
        }

        setTransform({ scale: newScale, x: newX, y: newY });
        setZoomLevel(`${Math.round(newScale * 100)}%`);
        updateFullyVisible();
      }
    };

    wrapper.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
    };
  }, [transform, setZoomLevel, isFullyVisible]);

  // Center content on initial render and window resize
  useEffect(() => {
    const handleResize = () => {
      const { x, y } = centerContent(transform.scale);
      setTransform(prev => ({ ...prev, x, y }));
      updateFullyVisible();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [transform.scale]);

  return (
    <div className="w-full h-full overflow-hidden bg-[#EBECF0]" ref={wrapperRef}>
      <div 
        ref={contentRef}
        className="inline-block"
        style={{ 
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
          transformOrigin: '0 0',
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
