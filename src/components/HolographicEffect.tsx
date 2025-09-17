import React, { useEffect, useRef } from 'react';

interface HolographicEffectProps {
  children: React.ReactNode;
  intensity?: number;
  speed?: number;
  className?: string;
}

export const HolographicEffect: React.FC<HolographicEffectProps> = ({
  children,
  intensity = 0.1,
  speed = 1,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (y - 0.5) * intensity * 20;
      const rotateY = (x - 0.5) * intensity * 20;

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      className={`holographic-container transition-transform duration-300 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        animation: `holographicShift ${3 / speed}s ease-in-out infinite`
      }}
    >
      {children}
    </div>
  );
};
