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

  const limitPosition = useCallback((newPosition: { x: number, y: number }) => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return newPosition;

    const wrapperWidth = wrapper.clientWidth;
    const wrapperHeight = wrapper.clientHeight;
    const contentWidth = content.clientWidth * scale;
    const contentHeight = content.clientHeight * scale;

    const minX = scale < 0.7 ? (wrapperWidth - contentWidth) / 2 : Math.min(wrapperWidth - contentWidth, 0);
    const maxX = scale < 0.7 ? (wrapperWidth - contentWidth) / 2 : Math.max(0, wrapperWidth - contentWidth);
    const minY = Math.min(wrapperHeight - contentHeight, 0);
    const maxY = Math.max(0, wrapperHeight - contentHeight);

    return {
      x: Math.min(Math.max(newPosition.x, minX), maxX),
      y: Math.min(Math.max(newPosition.y, minY), maxY)
    };
  }, [scale]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 0.7) {
      setIsDragging(true);
      setStartDragPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [scale, position.x, position.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && scale > 0.7) {
      const newPosition = limitPosition({
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y,
      });
      setPosition(newPosition);
    }
  }, [isDragging, scale, startDragPosition, limitPosition]);

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

        const newPosition = limitPosition({
          x: mouseX - contentPoint.x * newScale,
          y: mouseY - contentPoint.y * newScale,
        });

        setPosition(newPosition);
      } else {
        centerContent(newScale);
      }

      setScale(newScale, false);
    } else {
      const scrollAmount = 30; // Adjust this value to change scroll speed
      let deltaX = e.deltaX;
      let deltaY = e.deltaY;

      if (scale > 0.7) {
        // Allow both horizontal and vertical scrolling
        setPosition(prevPosition => limitPosition({
          x: prevPosition.x - deltaX / scale,
          y: prevPosition.y - deltaY / scale,
        }));
      } else {
        // Only allow vertical scrolling
        setPosition(prevPosition => limitPosition({
          x: prevPosition.x,
          y: prevPosition.y - deltaY / scale,
        }));
      }
    }
  }, [scale, setScale, position, limitPosition]);

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
