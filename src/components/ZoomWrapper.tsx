'use client'
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useZoom } from '@/context/ZoomContext';
import { useHandMode } from '@/context/HandModeContext';

interface ZoomWrapperProps {
  children: React.ReactNode;
}

const ZoomWrapper: React.FC<ZoomWrapperProps> = ({ children }) => {
  const { scale, setScale } = useZoom(); // Remove isKeyboardInput
  const { isHandMode, isSpacePressed } = useHandMode();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });

  const isHandModeActive = isHandMode || isSpacePressed;

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
    if (isHandModeActive) {
      setIsDragging(true);
      setStartDragPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  }, [position.x, position.y, isHandModeActive]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      let newPosition;
      if (scale < 0.7) {
        // Only allow vertical movement, keep horizontal position centered
        const wrapper = wrapperRef.current;
        const content = contentRef.current;
        if (wrapper && content) {
          const contentWidth = content.clientWidth * scale;
          newPosition = limitPosition({
            x: (wrapper.clientWidth - contentWidth) / 2,
            y: e.clientY - startDragPosition.y,
          });
        }
      } else {
        // Allow movement in all directions
        newPosition = limitPosition({
          x: e.clientX - startDragPosition.x,
          y: e.clientY - startDragPosition.y,
        });
      }
      if (newPosition) {
        setPosition(newPosition);
      }
    }
  }, [isDragging, scale, startDragPosition, limitPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    
    if (e.ctrlKey || e.metaKey) {
      const wrapper = wrapperRef.current;
      const content = contentRef.current;
      if (!wrapper || !content) return;

      const rect = wrapper.getBoundingClientRect();
      const zoomFactor = e.deltaY > 0 ? 0.94 : 1.06;
      const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const contentPoint = {
        x: (mouseX - position.x) / scale,
        y: (mouseY - position.y) / scale,
      };

      let newPosition;
      if (newScale < 0.7) {
        // Keep content horizontally centered, but zoom towards/away from mouse vertically
        const contentWidth = content.clientWidth * newScale;
        newPosition = limitPosition({
          x: (wrapper.clientWidth - contentWidth) / 2,
          y: mouseY - contentPoint.y * newScale,
        });
      } else {
        // Zoom towards/away from mouse in all directions
        newPosition = limitPosition({
          x: mouseX - contentPoint.x * newScale,
          y: mouseY - contentPoint.y * newScale,
        });
      }

      setPosition(newPosition);
      setScale(newScale, false);
    } else {
      // Scrolling behavior
      const deltaX = e.deltaX; // Change let to const
      const deltaY = e.deltaY; // Change let to const

      setPosition(prevPosition => {
        if (scale > 0.7) {
          // Allow both horizontal and vertical scrolling
          return limitPosition({
            x: prevPosition.x - deltaX / scale,
            y: prevPosition.y - deltaY / scale,
          });
        } else {
          // Only allow vertical scrolling
          return limitPosition({
            x: prevPosition.x,
            y: prevPosition.y - deltaY / scale,
          });
        }
      });
    }
  }, [scale, setScale, position, limitPosition]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        wrapper.removeEventListener('wheel', handleWheel);
      };
    }
  }, [handleWheel]);

  return (
    <div 
      ref={wrapperRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        overflow: 'hidden',
        position: 'relative' as const,
        cursor: isHandModeActive ? (isDragging ? 'grabbing' : 'grab') : 'default',
        backgroundColor: '#EBECF0',
        userSelect: isHandModeActive ? 'none' : 'auto',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        ref={contentRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          position: 'absolute' as const,
          transition: isDragging ? 'none' : 'transform 0.03s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ZoomWrapper;
