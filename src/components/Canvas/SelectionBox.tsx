import React from 'react';
import { Rect } from 'react-konva';
import { CanvasComponent } from '../../types';

interface SelectionBoxProps {
  selectedComponents: string[];
  components: Record<string, CanvasComponent>;
}

export const SelectionBox: React.FC<SelectionBoxProps> = ({
  selectedComponents,
  components,
}) => {
  if (selectedComponents.length === 0) return null;

  // Calcular bounding box dos componentes selecionados
  const getBoundingBox = () => {
    if (selectedComponents.length === 0) return null;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    selectedComponents.forEach((id) => {
      const component = components[id];
      if (!component) return;

      const { x, y } = component.style.position;
      const { width, height } = component.style.size;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
    });

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  };

  const boundingBox = getBoundingBox();
  if (!boundingBox) return null;

  return (
    <Rect
      x={boundingBox.x - 2}
      y={boundingBox.y - 2}
      width={boundingBox.width + 4}
      height={boundingBox.height + 4}
      fill="transparent"
      stroke="#3b82f6"
      strokeWidth={2}
      dash={[5, 5]}
      opacity={0.8}
      listening={false}
    />
  );
};
