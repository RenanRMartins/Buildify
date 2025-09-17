import React, { useRef } from 'react';
import { Group, Rect, Text, Line, Circle } from 'react-konva';
import Konva from 'konva';
import { CanvasComponent } from '../../types';

interface ComponentRendererProps {
  component: CanvasComponent;
  isSelected: boolean;
  onDragStart: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragMove: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => void;
  onTransformEnd: (e: Konva.KonvaEventObject<Event>) => void;
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected,
  onDragStart,
  onDragMove,
  onDragEnd,
  onTransformEnd,
  onClick,
}) => {
  const groupRef = useRef<Konva.Group>(null);

  // Aplicar estilos do componente
  const style = component.style;

  // Função auxiliar para lidar com strings vazias
  const getDisplayText = (propValue: any, fallback: string) => {
    // Se a propriedade não existe, usar fallback
    if (propValue === undefined || propValue === null) return fallback;
    // Se é string vazia, mostrar string vazia
    if (propValue === '') return '';
    // Caso contrário, mostrar o valor
    return String(propValue);
  };

  // Renderizar baseado no tipo do componente
  const renderComponent = () => {
    switch (component.type) {
      case 'button':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill={style.backgroundColor}
              stroke={style.borderColor}
              strokeWidth={style.borderWidth}
              cornerRadius={style.borderRadius}
              shadowColor="rgba(0, 0, 0, 0.1)"
              shadowBlur={4}
              shadowOffset={{ x: 0, y: 2 }}
              shadowOpacity={0.1}
            />
            <Text
              text={getDisplayText(component.props.text, component.name?.trim() || 'Botão')}
              x={style.padding.left}
              y={style.padding.top}
              width={style.size.width - style.padding.left - style.padding.right}
              height={style.size.height - style.padding.top - style.padding.bottom}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fontStyle={typeof style.fontWeight === 'number' ? 'normal' : style.fontWeight}
              fill={style.color}
              align={style.textAlign}
              verticalAlign="middle"
            />
          </Group>
        );

      case 'card':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill={style.backgroundColor}
              stroke={style.borderColor}
              strokeWidth={style.borderWidth}
              cornerRadius={style.borderRadius}
              shadowColor="rgba(0, 0, 0, 0.1)"
              shadowBlur={8}
              shadowOffset={{ x: 0, y: 4 }}
              shadowOpacity={0.1}
            />
            <Text
              text={getDisplayText(component.props.title, component.name?.trim() || 'Título do Card')}
              x={style.padding.left}
              y={style.padding.top}
              width={style.size.width - style.padding.left - style.padding.right}
              fontSize={style.fontSize + 2}
              fontFamily={style.fontFamily}
              fontStyle="bold"
              fill={style.color}
              align="left"
            />
            <Text
              text={getDisplayText(component.props.description, 'Descrição do card aqui...')}
              x={style.padding.left}
              y={style.padding.top + 30}
              width={style.size.width - style.padding.left - style.padding.right}
              height={style.size.height - style.padding.top - style.padding.bottom - 30}
              fontSize={style.fontSize - 2}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="left"
              opacity={0.8}
            />
          </Group>
        );

      case 'text':
        return (
          <Text
            text={getDisplayText(component.props.text, component.name?.trim() || 'Texto')}
            width={style.size.width}
            height={style.size.height}
            fontSize={style.fontSize}
            fontFamily={style.fontFamily}
            fontStyle={typeof style.fontWeight === 'number' ? 'normal' : style.fontWeight}
            fill={style.color}
            align={style.textAlign}
            verticalAlign="middle"
          />
        );

      case 'container':
        return (
          <Rect
            width={style.size.width}
            height={style.size.height}
            fill={style.backgroundColor}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            cornerRadius={style.borderRadius}
            strokeDashArray={isSelected ? [5, 5] : undefined}
          />
        );

      case 'input':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill="#ffffff"
              stroke={style.borderColor}
              strokeWidth={style.borderWidth}
              cornerRadius={style.borderRadius}
            />
            <Text
              text={getDisplayText(component.props.placeholder, component.name?.trim() || 'Digite aqui...')}
              x={style.padding.left}
              y={style.padding.top}
              width={style.size.width - style.padding.left - style.padding.right}
              height={style.size.height - style.padding.top - style.padding.bottom}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fill="#9ca3af"
              align="left"
              verticalAlign="middle"
            />
          </Group>
        );

      case 'image':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill="#f3f4f6"
              stroke={style.borderColor}
              strokeWidth={style.borderWidth}
              cornerRadius={style.borderRadius}
              strokeDashArray={[5, 5]}
            />
            <Text
              text="🖼️ Imagem"
              x={0}
              y={style.size.height / 2 - 10}
              width={style.size.width}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
            />
          </Group>
        );

      case 'checkbox':
        return (
          <Group>
            <Rect
              width={20}
              height={20}
              x={0}
              y={0}
              fill="#ffffff"
              stroke={style.borderColor}
              strokeWidth={1}
              cornerRadius={3}
            />
            <Text
              text={component.props.text || component.name?.trim() || 'Checkbox'}
              x={30}
              y={2}
              width={style.size.width - 30}
              height={20}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="left"
              verticalAlign="middle"
            />
            {component.props.checked && (
              <Text
                text="✓"
                x={5}
                y={2}
                width={20}
                height={20}
                fontSize={14}
                fontFamily={style.fontFamily}
                fill={style.color}
                align="center"
                verticalAlign="middle"
              />
            )}
          </Group>
        );

      case 'radio':
        return (
          <Group>
            <Circle
              x={10}
              y={10}
              radius={8}
              fill="#ffffff"
              stroke={style.borderColor}
              strokeWidth={1}
            />
            <Text
              text={component.props.text || component.name?.trim() || 'Radio'}
              x={30}
              y={2}
              width={style.size.width - 30}
              height={20}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="left"
              verticalAlign="middle"
            />
            {component.props.checked && (
              <Circle
                x={10}
                y={10}
                radius={4}
                fill={style.color}
              />
            )}
          </Group>
        );

      case 'table':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill="#ffffff"
              stroke={style.borderColor}
              strokeWidth={1}
              cornerRadius={style.borderRadius}
            />
            {/* Cabeçalho da tabela */}
            <Rect
              x={0}
              y={0}
              width={style.size.width}
              height={30}
              fill="#f8f9fa"
              stroke={style.borderColor}
              strokeWidth={1}
            />
            <Text
              text={component.props.title || 'Tabela'}
              x={10}
              y={5}
              width={style.size.width - 20}
              height={20}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fontStyle="bold"
              fill={style.color}
              align="left"
              verticalAlign="middle"
            />
            {/* Linhas da tabela */}
            <Line
              points={[0, 30, style.size.width, 30]}
              stroke={style.borderColor}
              strokeWidth={1}
            />
            <Line
              points={[0, 60, style.size.width, 60]}
              stroke={style.borderColor}
              strokeWidth={1}
            />
            <Line
              points={[0, 90, style.size.width, 90]}
              stroke={style.borderColor}
              strokeWidth={1}
            />
            {/* Colunas da tabela */}
            <Line
              points={[style.size.width / 3, 30, style.size.width / 3, style.size.height]}
              stroke={style.borderColor}
              strokeWidth={1}
            />
            <Line
              points={[2 * style.size.width / 3, 30, 2 * style.size.width / 3, style.size.height]}
              stroke={style.borderColor}
              strokeWidth={1}
            />
            {/* Conteúdo da tabela */}
            <Text
              text="Coluna 1"
              x={5}
              y={35}
              width={style.size.width / 3 - 10}
              height={20}
              fontSize={style.fontSize - 2}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
              verticalAlign="middle"
            />
            <Text
              text="Coluna 2"
              x={style.size.width / 3 + 5}
              y={35}
              width={style.size.width / 3 - 10}
              height={20}
              fontSize={style.fontSize - 2}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
              verticalAlign="middle"
            />
            <Text
              text="Coluna 3"
              x={2 * style.size.width / 3 + 5}
              y={35}
              width={style.size.width / 3 - 10}
              height={20}
              fontSize={style.fontSize - 2}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
              verticalAlign="middle"
            />
          </Group>
        );

      case 'chart':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill="#ffffff"
              stroke={style.borderColor}
              strokeWidth={1}
              cornerRadius={style.borderRadius}
            />
            {/* Título do gráfico */}
            <Text
              text={component.props.title || 'Gráfico'}
              x={10}
              y={5}
              width={style.size.width - 20}
              height={20}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fontStyle="bold"
              fill={style.color}
              align="center"
              verticalAlign="middle"
            />
            {/* Eixos do gráfico */}
            <Line
              points={[30, style.size.height - 30, style.size.width - 10, style.size.height - 30]}
              stroke="#e5e7eb"
              strokeWidth={2}
            />
            <Line
              points={[30, 30, 30, style.size.height - 30]}
              stroke="#e5e7eb"
              strokeWidth={2}
            />
            {/* Barras do gráfico */}
            <Rect
              x={40}
              y={style.size.height - 80}
              width={20}
              height={50}
              fill="#3b82f6"
              cornerRadius={2}
            />
            <Rect
              x={70}
              y={style.size.height - 100}
              width={20}
              height={70}
              fill="#10b981"
              cornerRadius={2}
            />
            <Rect
              x={100}
              y={style.size.height - 60}
              width={20}
              height={30}
              fill="#f59e0b"
              cornerRadius={2}
            />
            <Rect
              x={130}
              y={style.size.height - 90}
              width={20}
              height={60}
              fill="#ef4444"
              cornerRadius={2}
            />
            {/* Labels */}
            <Text
              text="A"
              x={45}
              y={style.size.height - 25}
              width={20}
              height={15}
              fontSize={10}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
            />
            <Text
              text="B"
              x={75}
              y={style.size.height - 25}
              width={20}
              height={15}
              fontSize={10}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
            />
            <Text
              text="C"
              x={105}
              y={style.size.height - 25}
              width={20}
              height={15}
              fontSize={10}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
            />
            <Text
              text="D"
              x={135}
              y={style.size.height - 25}
              width={20}
              height={15}
              fontSize={10}
              fontFamily={style.fontFamily}
              fill={style.color}
              align="center"
            />
          </Group>
        );

      case 'spacer':
        return (
          <Group>
            <Rect
              width={style.size.width}
              height={style.size.height}
              fill="transparent"
              stroke="#d1d5db"
              strokeWidth={1}
              strokeDashArray={[5, 5]}
            />
            <Text
              text="Espaçador"
              x={0}
              y={style.size.height / 2 - 10}
              width={style.size.width}
              fontSize={style.fontSize}
              fontFamily={style.fontFamily}
              fill="#9ca3af"
              align="center"
            />
          </Group>
        );

      default:
        return (
          <Rect
            width={style.size.width}
            height={style.size.height}
            fill={style.backgroundColor}
            stroke={style.borderColor}
            strokeWidth={style.borderWidth}
            cornerRadius={style.borderRadius}
          />
        );
    }
  };

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    onClick(e);
  };

  return (
    <Group
      ref={groupRef}
      id={component.id}
      x={style.position.x}
      y={style.position.y}
      width={style.size.width}
      height={style.size.height}
      draggable
      onClick={handleClick}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragEnd={onDragEnd}
      onTransformEnd={onTransformEnd}
      opacity={style.opacity}
      visible={component.visible}
      listening={!component.locked}
    >
      {renderComponent()}
      
      {/* Overlay de seleção */}
      {isSelected && (
        <Group>
          <Rect
            width={style.size.width}
            height={style.size.height}
            fill="transparent"
            stroke="#3b82f6"
            strokeWidth={2}
            cornerRadius={style.borderRadius}
          />
          {/* Cantos de redimensionamento */}
          <Rect
            x={-4}
            y={-4}
            width={8}
            height={8}
            fill="#3b82f6"
            cornerRadius={2}
          />
          <Rect
            x={style.size.width - 4}
            y={-4}
            width={8}
            height={8}
            fill="#3b82f6"
            cornerRadius={2}
          />
          <Rect
            x={-4}
            y={style.size.height - 4}
            width={8}
            height={8}
            fill="#3b82f6"
            cornerRadius={2}
          />
          <Rect
            x={style.size.width - 4}
            y={style.size.height - 4}
            width={8}
            height={8}
            fill="#3b82f6"
            cornerRadius={2}
          />
        </Group>
      )}
    </Group>
  );
};
