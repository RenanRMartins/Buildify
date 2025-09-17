import React, { useState, useRef, useCallback, useEffect } from 'react';

interface ResizablePanelProps {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
  onResize?: (size: number) => void;
  className?: string;
}

export const ResizablePanel: React.FC<ResizablePanelProps> = ({
  children,
  direction,
  minSize = 200,
  maxSize = 800,
  defaultSize = 320,
  onResize,
  className = '',
}) => {
  const [size, setSize] = useState(defaultSize);
  const [isResizing, setIsResizing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef(0);
  const startSizeRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startPosRef.current = direction === 'horizontal' ? e.clientX : e.clientY;
    startSizeRef.current = size;
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [size, direction]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    const currentPos = direction === 'horizontal' ? e.clientX : e.clientY;
    const delta = direction === 'horizontal' ? currentPos - startPosRef.current : startPosRef.current - currentPos;
    const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta));
    
    setSize(newSize);
    onResize?.(newSize);
  }, [isResizing, minSize, maxSize, direction, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const panelStyle = {
    [direction === 'horizontal' ? 'width' : 'height']: `${size}px`,
  };

  const resizeHandleStyle = {
    [direction === 'horizontal' ? 'width' : 'height']: '4px',
    [direction === 'horizontal' ? 'height' : 'width']: '100%',
  };

  return (
    <div className={`relative flex ${direction === 'horizontal' ? 'flex-row' : 'flex-col'} ${className}`}>
      <div
        ref={panelRef}
        style={panelStyle}
        className="flex-shrink-0"
      >
        {children}
      </div>
      
      {/* Handle de redimensionamento */}
      <div
        className={`relative cursor-${direction === 'horizontal' ? 'col-resize' : 'row-resize'} group transition-all duration-200 ${
          isResizing ? 'bg-primary-500' : 'bg-white/10 hover:bg-primary-500/50'
        }`}
        style={resizeHandleStyle}
        onMouseDown={handleMouseDown}
      >
        {/* Indicador visual */}
        <div className={`absolute inset-0 flex items-center justify-center ${
          direction === 'horizontal' ? 'flex-col' : 'flex-row'
        }`}>
          <div className={`w-1 h-1 bg-white/60 rounded-full ${
            direction === 'horizontal' ? 'mb-1' : 'mr-1'
          }`} />
          <div className={`w-1 h-1 bg-white/60 rounded-full ${
            direction === 'horizontal' ? 'mb-1' : 'mr-1'
          }`} />
          <div className="w-1 h-1 bg-white/60 rounded-full" />
        </div>
        
        {/* Efeito hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/20 to-primary-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
    </div>
  );
};
