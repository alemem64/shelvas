'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useZoom } from '@/context/ZoomContext';

interface ZoomWrapperProps {
  children: React.ReactNode;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ children }) => {
  const { scale, setScale, isKeyboardInput } = useZoom();
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startDragPosition, setStartDragPosition] = React.useState({ x: 0, y: 0 });

  const centerContent = (newScale: number) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const newPosition = {
      x: (wrapper.clientWidth - content.clientWidth * newScale) / 2,
      y: (wrapper.clientHeight - content.clientHeight * newScale) / 2,
    };
    setPosition(newPosition);
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 0.7) {
      setIsDragging(true);
      setStartDragPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position.x, position.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && scale > 0.7) {
      const newPosition = {
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y,
      };
      setPosition(newPosition);
    }
  }, [isDragging, scale, startDragPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    if (isKeyboardInput) {
      centerContent(scale);
    }
  }, [scale, isKeyboardInput]);

  const handleWheel = useCallback((e: WheelEvent) => {
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
        centerContent(newScale);
      }

      setScale(newScale, false);
    } else if (scale > 0.7) {
      const scrollAmount = 30; // Adjust this value to change scroll speed
      let deltaX = 0;
      let deltaY = 0;

      if (e.shiftKey || e.deltaX !== 0) {
        // Horizontal scrolling
        deltaX = e.deltaX !== 0 ? e.deltaX : e.deltaY;
      } else {
        // Vertical scrolling
        deltaY = e.deltaY;
      }

      setPosition(prevPosition => ({
        x: prevPosition.x - deltaX / scale,
        y: prevPosition.y - deltaY / scale,
      }));
    }
  }, [scale, setScale, position]);

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
        cursor: scale > 0.7 ? 'move' : 'default',
        backgroundColor: '#EBECF0', // 배경색 추가
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={contentRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          position: 'absolute' as const,
          transition: isDragging ? 'none' : 'transform 0.05s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
