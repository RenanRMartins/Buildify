import React from 'react';
import { Line } from 'react-konva';

interface GuidesRendererProps {
  guides: {
    horizontal: number[];
    vertical: number[];
  };
  width: number;
  height: number;
  zoom: number;
  offset: { x: number; y: number };
}

export const GuidesRenderer: React.FC<GuidesRendererProps> = ({
  guides,
  width,
  height,
  zoom,
  offset,
}) => {
  const lines: React.ReactNode[] = [];

  // Renderizar guias horizontais
  guides.horizontal.forEach((y, index) => {
    const adjustedY = y * zoom - offset.y;
    if (adjustedY >= 0 && adjustedY <= height) {
      lines.push(
        <Line
          key={`h-guide-${index}`}
          points={[0, adjustedY, width, adjustedY]}
          stroke="#ef4444"
          strokeWidth={1}
          opacity={0.8}
          listening={false}
        />
      );
    }
  });

  // Renderizar guias verticais
  guides.vertical.forEach((x, index) => {
    const adjustedX = x * zoom - offset.x;
    if (adjustedX >= 0 && adjustedX <= width) {
      lines.push(
        <Line
          key={`v-guide-${index}`}
          points={[adjustedX, 0, adjustedX, height]}
          stroke="#ef4444"
          strokeWidth={1}
          opacity={0.8}
          listening={false}
        />
      );
    }
  });

  return <>{lines}</>;
};
