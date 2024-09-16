'use client'
import React, { useRef, useEffect } from 'react';
import { useZoom } from '@/context/ZoomContext';

interface ZoomWrapperProps {
  children: React.ReactNode;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ children }) => {
  const { scale, setScale } = useZoom();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    
    if (e.ctrlKey || e.metaKey) {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;

      const rect = wrapper.getBoundingClientRect();
      const zoomFactor = e.deltaY > 0 ? 0.94 : 1.06;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);

      if (newScale >= 0.7) {
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const contentPoint = {
          x: (mouseX - position.x) / scale,
          y: (mouseY - position.y) / scale,
        };

        const newPosition = {
          x: mouseX - contentPoint.x * newScale,
          y: mouseY - contentPoint.y * newScale,
        };

        setPosition(newPosition);
      } else {
        const newPosition = {
          x: (wrapper.clientWidth - content.clientWidth * newScale) / 2,
          y: (wrapper.clientHeight - content.clientHeight * newScale) / 2,
        };
        setPosition(newPosition);
      }

      setScale(newScale);
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        wrapper.removeEventListener('wheel', handleWheel);
      };
    }
  }, [scale, position, setScale]);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        position: 'relative' as const,
      }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          position: 'absolute' as const,
          transition: 'transform 0.1s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
