import React from 'react';
import { StyleProperties } from '../../types';

interface SpacingEditorProps {
  style: StyleProperties;
  onChange: (spacing: Partial<StyleProperties>) => void;
}

export const SpacingEditor: React.FC<SpacingEditorProps> = ({ style, onChange }) => {
  const updatePadding = (side: keyof typeof style.padding, value: number) => {
    onChange({
      padding: {
        ...style.padding,
        [side]: value,
      },
    });
  };

  const updateMargin = (side: keyof typeof style.margin, value: number) => {
    onChange({
      margin: {
        ...style.margin,
        [side]: value,
      },
    });
  };

  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90 mb-3">Espaçamento</h3>
      <div className="space-y-4">
        {/* Padding */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            Padding (Interno)
          </label>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-white/70 mb-1">Topo</label>
                <input
                  type="number"
                  min="0"
                  value={style.padding.top}
                  onChange={(e) => updatePadding('top', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Direita</label>
                <input
                  type="number"
                  min="0"
                  value={style.padding.right}
                  onChange={(e) => updatePadding('right', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Baixo</label>
                <input
                  type="number"
                  min="0"
                  value={style.padding.bottom}
                  onChange={(e) => updatePadding('bottom', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Esquerda</label>
                <input
                  type="number"
                  min="0"
                  value={style.padding.left}
                  onChange={(e) => updatePadding('left', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
            </div>
            
            {/* Padding uniforme */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="uniform-padding"
                className="rounded border-white/20 text-blue-400 bg-white/10 focus:ring-blue-500"
              />
              <label htmlFor="uniform-padding" className="text-xs text-white/90">
                Aplicar uniformemente
              </label>
            </div>
          </div>
        </div>

        {/* Margin */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            Margin (Externo)
          </label>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-white/70 mb-1">Topo</label>
                <input
                  type="number"
                  min="0"
                  value={style.margin.top}
                  onChange={(e) => updateMargin('top', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Direita</label>
                <input
                  type="number"
                  min="0"
                  value={style.margin.right}
                  onChange={(e) => updateMargin('right', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Baixo</label>
                <input
                  type="number"
                  min="0"
                  value={style.margin.bottom}
                  onChange={(e) => updateMargin('bottom', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Esquerda</label>
                <input
                  type="number"
                  min="0"
                  value={style.margin.left}
                  onChange={(e) => updateMargin('left', Number(e.target.value))}
                  className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                />
              </div>
            </div>
            
            {/* Margin uniforme */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="uniform-margin"
                className="rounded border-white/20 text-blue-400 bg-white/10 focus:ring-blue-500"
              />
              <label htmlFor="uniform-margin" className="text-xs text-white/90">
                Aplicar uniformemente
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
