import React from 'react';
import { Line } from 'react-konva';

interface GridRendererProps {
  width: number;
  height: number;
  gridSize: number;
  zoom: number;
  offset: { x: number; y: number };
}

export const GridRenderer: React.FC<GridRendererProps> = ({
  width,
  height,
  gridSize,
  zoom,
  offset,
}) => {
  const lines = [];
  const scaledGridSize = gridSize * zoom;

  // Calcular offset para alinhar com o grid
  const offsetX = offset.x % scaledGridSize;
  const offsetY = offset.y % scaledGridSize;

  // Linhas verticais
  for (let i = 0; i <= width / scaledGridSize + 1; i++) {
    const x = i * scaledGridSize - offsetX;
    if (x >= -scaledGridSize && x <= width + scaledGridSize) {
      lines.push(
        <Line
          key={`v-${i}`}
          points={[x, 0, x, height]}
          stroke="#e5e7eb"
          strokeWidth={0.5}
          opacity={0.5}
        />
      );
    }
  }

  // Linhas horizontais
  for (let i = 0; i <= height / scaledGridSize + 1; i++) {
    const y = i * scaledGridSize - offsetY;
    if (y >= -scaledGridSize && y <= height + scaledGridSize) {
      lines.push(
        <Line
          key={`h-${i}`}
          points={[0, y, width, y]}
          stroke="#e5e7eb"
          strokeWidth={0.5}
          opacity={0.5}
        />
      );
    }
  }

  return <>{lines}</>;
};
