import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import Konva from 'konva';
import { useAppStore } from '../../stores/useAppStore';
import { Position } from '../../types';
import { ComponentRenderer } from './ComponentRenderer';
import { GridRenderer } from './GridRenderer';
import { SelectionBox } from './SelectionBox';
import { GuidesRenderer } from './GuidesRenderer';

interface CanvasProps {
  width: number;
  height: number;
}

export const Canvas: React.FC<CanvasProps> = ({ width, height }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const [isDragging, setIsDragging] = useState(false);

  const {
    canvas,
    addComponent,
    updateComponent,
    selectComponent,
    clearSelection,
    setViewportPosition,
    setZoom,
    saveHistory,
  } = useAppStore();

  // Atualizar transformer quando seleção muda
  useEffect(() => {
    const transformer = transformerRef.current;
    const stage = stageRef.current;
    
    if (!transformer || !stage) return;

    if (canvas.selectedComponents.length === 0) {
      transformer.nodes([]);
      transformer.getLayer()?.batchDraw();
      return;
    }

    const selectedNodes = canvas.selectedComponents
      .map(id => stage.findOne(`#${id}`))
      .filter(Boolean) as Konva.Node[];

    if (selectedNodes.length > 0) {
      transformer.nodes(selectedNodes);
      transformer.getLayer()?.batchDraw();
    }
  }, [canvas.selectedComponents]);


  // Função para aplicar snap to grid
  const applyGridSnap = useCallback((pos: Position): Position => {
    if (!canvas.grid.snap || !canvas.grid.enabled) return pos;

    const gridSize = canvas.grid.size;
    return {
      x: Math.round(pos.x / gridSize) * gridSize,
      y: Math.round(pos.y / gridSize) * gridSize,
    };
  }, [canvas.grid]);

  // Handler para clique no canvas
  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    
    if (clickedOnEmpty) {
      clearSelection();
    }
  }, [clearSelection]);

  // Handler para clique em componentes
  const handleComponentClick = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    e.cancelBubble = true; // Prevenir propagação para o stage
    const id = e.target.id();
    
    // Verificar se o ID existe nos componentes
    if (!canvas.components[id]) {
      console.warn('Componente não encontrado:', id);
      return;
    }
    
    // Verificar se Ctrl/Cmd está pressionado para seleção múltipla
    const isMultiSelect = e.evt.ctrlKey || e.evt.metaKey;
    selectComponent(id, isMultiSelect);
  }, [selectComponent, canvas.components]);

  // Handler para drag de componentes
  const handleDragStart = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.id();
    selectComponent(id);
    setIsDragging(true);
  }, [selectComponent]);

  const handleDragMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (!isDragging) return;

    const newPos = e.target.position();
    const snappedPos = applyGridSnap(newPos);
    
    e.target.position(snappedPos);
  }, [isDragging, applyGridSnap]);

  const handleDragEnd = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    if (!isDragging) return;

    const id = e.target.id();
    const finalPos = applyGridSnap(e.target.position());
    
    updateComponent(id, {
      style: {
        ...canvas.components[id]?.style,
        position: finalPos,
      },
    });

    setIsDragging(false);
    saveHistory();
  }, [isDragging, applyGridSnap, updateComponent, canvas.components, saveHistory]);

  // Handler para drop de componentes da sidebar
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    try {
      const data = e.dataTransfer.getData('application/json');
      const { type } = JSON.parse(data);
      
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / canvas.viewport.zoom - canvas.viewport.position.x;
      const y = (e.clientY - rect.top) / canvas.viewport.zoom - canvas.viewport.position.y;
      
      const position = applyGridSnap({ x, y });
      
      addComponent({
        type,
        name: `Novo ${type}`,
        style: {
          position,
          size: { width: 100, height: 40 },
          zIndex: 1,
          backgroundColor: '#3b82f6',
          borderColor: '#1d4ed8',
          borderWidth: 0,
          borderRadius: 6,
          opacity: 1,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: '#ffffff',
          textAlign: 'center',
          lineHeight: 1.5,
          letterSpacing: 0,
          padding: { top: 8, right: 16, bottom: 8, left: 16 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          transform: 'none',
          filter: 'none',
        },
        props: {
          text: `Novo ${type}`,
          placeholder: `Digite aqui...`,
          title: `Título do ${type}`,
          description: `Descrição do ${type} aqui...`
        },
        locked: false,
        visible: true,
      });
    } catch (error) {
      console.error('Erro ao adicionar componente:', error);
    }
  }, [addComponent, applyGridSnap, canvas.viewport.zoom, canvas.viewport.position]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.currentTarget.classList.remove('drag-over');
  }, []);

  // Handler para resize de componentes
  const handleTransformEnd = useCallback((e: Konva.KonvaEventObject<Event>) => {
    const node = e.target;
    const id = node.id();
    
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    
    // Reset scale and apply to size
    node.scaleX(1);
    node.scaleY(1);
    
    const newSize = {
      width: Math.max(20, node.width() * scaleX),
      height: Math.max(20, node.height() * scaleY),
    };

    const newPos = applyGridSnap(node.position());

    updateComponent(id, {
      style: {
        ...canvas.components[id]?.style,
        position: newPos,
        size: newSize,
      },
    });

    saveHistory();
  }, [applyGridSnap, updateComponent, canvas.components, saveHistory]);

  // Handler para zoom com scroll
  const handleWheel = useCallback((e: Konva.KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    
    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
    const clampedScale = Math.max(0.1, Math.min(5, newScale));

    setZoom(clampedScale);

    const newPos = {
      x: pointer.x - mousePointTo.x * clampedScale,
      y: pointer.y - mousePointTo.y * clampedScale,
    };

    setViewportPosition(newPos);
  }, [setZoom, setViewportPosition]);

  // Handler para pan do canvas
  const handleStageDragMove = useCallback((e: Konva.KonvaEventObject<DragEvent>) => {
    const stage = e.target;
    setViewportPosition(stage.position());
  }, [setViewportPosition]);

  // Renderizar componentes
  const renderComponents = () => {
    return Object.values(canvas.components).map((component) => (
      <ComponentRenderer
        key={component.id}
        component={component}
        isSelected={canvas.selectedComponents.includes(component.id)}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransformEnd}
        onClick={handleComponentClick}
      />
    ));
  };

  return (
    <div 
      className="relative w-full h-full canvas-container overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <Stage
        ref={stageRef}
        width={width}
        height={height}
        scaleX={canvas.viewport.zoom}
        scaleY={canvas.viewport.zoom}
        x={canvas.viewport.position.x}
        y={canvas.viewport.position.y}
        draggable
        onWheel={handleWheel}
        onDragMove={handleStageDragMove}
        onClick={handleStageClick}
        className="select-none"
      >
        <Layer>
          {/* Grid */}
          {canvas.grid.enabled && (
            <GridRenderer
              width={width}
              height={height}
              gridSize={canvas.grid.size}
              zoom={canvas.viewport.zoom}
              offset={canvas.viewport.position}
            />
          )}

          {/* Guides */}
          <GuidesRenderer
            guides={canvas.guides}
            width={width}
            height={height}
            zoom={canvas.viewport.zoom}
            offset={canvas.viewport.position}
          />

          {/* Componentes */}
          {renderComponents()}

          {/* Selection Box */}
          <SelectionBox
            selectedComponents={canvas.selectedComponents}
            components={canvas.components}
          />

          {/* Transformer */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limitar resize mínimo
              if (newBox.width < 20 || newBox.height < 20) {
                return oldBox;
              }
              return newBox;
            }}
            onTransformEnd={handleTransformEnd}
          />
        </Layer>
      </Stage>

    </div>
  );
};
