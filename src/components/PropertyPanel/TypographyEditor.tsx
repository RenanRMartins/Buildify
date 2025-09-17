import React from 'react';
import { StyleProperties } from '../../types';

interface TypographyEditorProps {
  style: StyleProperties;
  onChange: (typography: Partial<StyleProperties>) => void;
}

const fontFamilies = [
  'Inter, sans-serif',
  'system-ui, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Courier New, monospace',
  'JetBrains Mono, monospace',
];

const fontWeights = [
  { value: 300, label: 'Light' },
  { value: 400, label: 'Normal' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi Bold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
];

const textAlignments = [
  { value: 'left', label: 'Esquerda' },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Direita' },
  { value: 'justify', label: 'Justificado' },
];

export const TypographyEditor: React.FC<TypographyEditorProps> = ({ style, onChange }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white/90 mb-3">Tipografia</h3>
      <div className="space-y-3">
        {/* Família da fonte */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Família da Fonte
          </label>
          <select
            value={style.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            {fontFamilies.map((font) => (
              <option key={font} value={font} className="bg-gray-800 text-white">
                {font}
              </option>
            ))}
          </select>
        </div>

        {/* Tamanho da fonte */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Tamanho da Fonte
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="8"
              max="72"
              value={style.fontSize}
              onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
              className="flex-1 accent-blue-500"
            />
            <div className="w-12 text-xs text-white/70 text-center">
              {style.fontSize}px
            </div>
          </div>
        </div>

        {/* Peso da fonte */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Peso da Fonte
          </label>
          <select
            value={style.fontWeight}
            onChange={(e) => onChange({ fontWeight: Number(e.target.value) })}
            className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
          >
            {fontWeights.map((weight) => (
              <option key={weight.value} value={weight.value}>
                {weight.label}
              </option>
            ))}
          </select>
        </div>

        {/* Alinhamento do texto */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Alinhamento
          </label>
          <div className="grid grid-cols-2 gap-2">
            {textAlignments.map((alignment) => (
              <button
                key={alignment.value}
                onClick={() => onChange({ textAlign: alignment.value as any })}
                className={`px-3 py-2 text-xs rounded-md transition-colors border ${
                  style.textAlign === alignment.value
                    ? 'bg-blue-500/30 text-blue-400 border-blue-400/30'
                    : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20'
                }`}
              >
                {alignment.label}
              </button>
            ))}
          </div>
        </div>

        {/* Altura da linha */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Altura da Linha
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.8"
              max="3"
              step="0.1"
              value={style.lineHeight}
              onChange={(e) => onChange({ lineHeight: Number(e.target.value) })}
              className="flex-1 accent-blue-500"
            />
            <div className="w-12 text-xs text-white/70 text-center">
              {style.lineHeight}
            </div>
          </div>
        </div>

        {/* Espaçamento entre letras */}
        <div>
          <label className="block text-xs font-medium text-white/70 mb-1">
            Espaçamento entre Letras
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="-2"
              max="10"
              step="0.5"
              value={style.letterSpacing}
              onChange={(e) => onChange({ letterSpacing: Number(e.target.value) })}
              className="flex-1 accent-blue-500"
            />
            <div className="w-12 text-xs text-white/70 text-center">
              {style.letterSpacing}px
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
