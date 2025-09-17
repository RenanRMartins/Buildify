import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#6b7280', '#374151',
  '#1f2937', '#111827', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:border-gray-400 transition-colors"
      >
        <div
          className="w-6 h-6 rounded border border-gray-300"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm text-gray-700 font-mono">{value}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 p-3 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="space-y-3">
            {/* Cores predefinidas */}
            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Cores Predefinidas</div>
              <div className="grid grid-cols-6 gap-1">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      onChange(color);
                      setIsOpen(false);
                    }}
                    className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform relative"
                    style={{ backgroundColor: color }}
                  >
                    {value === color && (
                      <Check className="w-4 h-4 text-white absolute inset-0 m-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Input de cor personalizada */}
            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Cor Personalizada</div>
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-8 border border-gray-300 rounded cursor-pointer"
              />
            </div>

            {/* Input de texto */}
            <div>
              <div className="text-xs font-medium text-gray-600 mb-2">Valor Hex</div>
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
