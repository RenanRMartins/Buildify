import React from 'react';
import { CanvasComponent } from '../../types';
import { useAppStore } from '../../stores/useAppStore';
import { ColorPicker } from './ColorPicker';
import { SpacingEditor } from './SpacingEditor';
import { TypographyEditor } from './TypographyEditor';
import { EffectsEditor } from './EffectsEditor';

interface StyleEditorProps {
  component: CanvasComponent;
}

export const StyleEditor: React.FC<StyleEditorProps> = ({ component }) => {
  const { updateComponent } = useAppStore();

  const updateStyle = (updates: Partial<typeof component.style>) => {
    updateComponent(component.id, {
      style: {
        ...component.style,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Cores */}
      <div>
        <h3 className="text-sm font-semibold text-white/90 mb-3">Cores</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Cor de Fundo
            </label>
            <ColorPicker
              value={component.style.backgroundColor}
              onChange={(backgroundColor) => updateStyle({ backgroundColor })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Cor da Borda
            </label>
            <ColorPicker
              value={component.style.borderColor}
              onChange={(borderColor) => updateStyle({ borderColor })}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Cor do Texto
            </label>
            <ColorPicker
              value={component.style.color}
              onChange={(color) => updateStyle({ color })}
            />
          </div>
        </div>
      </div>

      {/* Tipografia */}
      <TypographyEditor
        style={component.style}
        onChange={(typography) => updateStyle(typography)}
      />

      {/* Espaçamento */}
      <SpacingEditor
        style={component.style}
        onChange={(spacing) => updateStyle(spacing)}
      />

      {/* Bordas */}
      <div>
        <h3 className="text-sm font-semibold text-white/90 mb-3">Bordas</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Largura da Borda
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={component.style.borderWidth}
              onChange={(e) => updateStyle({ borderWidth: Number(e.target.value) })}
              className="w-full accent-blue-500"
            />
            <div className="text-xs text-white/70 text-center">
              {component.style.borderWidth}px
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              Raio da Borda
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={component.style.borderRadius}
              onChange={(e) => updateStyle({ borderRadius: Number(e.target.value) })}
              className="w-full accent-blue-500"
            />
            <div className="text-xs text-white/70 text-center">
              {component.style.borderRadius}px
            </div>
          </div>
        </div>
      </div>

      {/* Efeitos */}
      <EffectsEditor
        style={component.style}
        onChange={(effects) => updateStyle(effects)}
      />

      {/* Opacidade */}
      <div>
        <h3 className="text-sm font-semibold text-white/90 mb-3">Opacidade</h3>
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Opacidade
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={component.style.opacity}
            onChange={(e) => updateStyle({ opacity: Number(e.target.value) })}
            className="w-full accent-blue-500"
          />
          <div className="text-xs text-white/70 text-center">
            {Math.round(component.style.opacity * 100)}%
          </div>
        </div>
      </div>
    </div>
  );
};
