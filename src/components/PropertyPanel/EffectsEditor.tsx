import React from 'react';
import { StyleProperties } from '../../types';

interface EffectsEditorProps {
  style: StyleProperties;
  onChange: (effects: Partial<StyleProperties>) => void;
}

const shadowPresets = [
  { value: 'none', label: 'Nenhuma' },
  { value: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', label: 'Sutil' },
  { value: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', label: 'Média' },
  { value: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', label: 'Grande' },
  { value: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', label: 'Extra Grande' },
  { value: '0 0 0 1px rgba(0, 0, 0, 0.05)', label: 'Borda' },
];

export const EffectsEditor: React.FC<EffectsEditorProps> = ({ style, onChange }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90 mb-3">Efeitos</h3>
      <div className="space-y-3">
        {/* Sombra */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            Sombra
          </label>
          <select
            value={style.boxShadow}
            onChange={(e) => onChange({ boxShadow: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            {shadowPresets.map((preset) => (
              <option key={preset.value} value={preset.value} className="bg-gray-800 text-white">
                {preset.label}
              </option>
            ))}
          </select>
          
          {/* Input personalizado para sombra */}
          <div className="mt-2">
            <input
              type="text"
              value={style.boxShadow}
              onChange={(e) => onChange({ boxShadow: e.target.value })}
              className="w-full px-2 py-1 text-xs bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-white placeholder-white/50"
              placeholder="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
            />
          </div>
        </div>

        {/* Transform */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            Transformação
          </label>
          <input
            type="text"
            value={style.transform}
            onChange={(e) => onChange({ transform: e.target.value })}
            className="w-full px-2 py-1 text-xs bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-white placeholder-white/50"
            placeholder="rotate(0deg) scale(1) translateX(0px)"
          />
          <div className="text-xs text-white/70 mt-1">
            Exemplos: rotate(45deg), scale(1.2), translateX(10px)
          </div>
        </div>

        {/* Filter */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-2">
            Filtro
          </label>
          <input
            type="text"
            value={style.filter}
            onChange={(e) => onChange({ filter: e.target.value })}
            className="w-full px-2 py-1 text-xs bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-white placeholder-white/50"
            placeholder="blur(0px) brightness(1) contrast(1)"
          />
          <div className="text-xs text-white/70 mt-1">
            Exemplos: blur(2px), brightness(1.2), contrast(1.5)
          </div>
        </div>
      </div>
    </div>
  );
};
