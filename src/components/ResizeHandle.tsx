import React, { useRef, useCallback } from 'react';

interface ResizeHandleProps {
  onResize: (delta: number) => void;
  direction: 'left' | 'right';
  className?: string;
}

export const ResizeHandle: React.FC<ResizeHandleProps> = ({ 
  onResize, 
  direction, 
  className = '' 
}) => {
  const isResizing = useRef(false);
  const startX = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    startX.current = e.clientX;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing.current) return;
    
    const delta = e.clientX - startX.current;
    const adjustedDelta = direction === 'left' ? -delta : delta;
    onResize(adjustedDelta);
    startX.current = e.clientX;
  }, [onResize, direction]);

  const handleMouseUp = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [handleMouseMove]);

  return (
    <div
      className={`w-1 bg-white/20 hover:bg-white/40 transition-colors cursor-col-resize group ${className}`}
      onMouseDown={handleMouseDown}
    >
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-0.5 h-8 bg-white/60 group-hover:bg-white/80 transition-colors rounded-full" />
      </div>
    </div>
  );
};
