import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { StyleEditor } from './StyleEditor';
import { ComponentInfo } from './ComponentInfo';
import { ComponentPropsEditor } from './ComponentPropsEditor';
import { useI18n } from '../../contexts/I18nContext';
import { X } from 'lucide-react';

interface PropertyPanelProps {
  isOpen: boolean;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({ isOpen }) => {
  const { canvas, togglePropertyPanel } = useAppStore();
  const { t } = useI18n();

  if (!isOpen) return null;

  // Buscar o componente selecionado
  const selectedComponent = canvas.selectedComponents.length === 1 
    ? canvas.components[canvas.selectedComponents[0]] || null
    : null;

  // Remover lógica de limpeza automática que pode estar causando problemas
  // if (canvas.selectedComponents.length === 1 && !selectedComponent) {
  //   const { clearSelection } = useAppStore.getState();
  //   clearSelection();
  // }

  return (
    <div className="w-full property-panel flex flex-col h-full relative z-10 glass-strong">
          {/* Header */}
          <div className="p-6 border-b border-white/20 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white gradient-text">{t('properties')}</h2>
              {canvas.selectedComponents.length > 0 && (
                <p className="text-sm text-white/70 mt-1">
                  {canvas.selectedComponents.length} {canvas.selectedComponents.length > 1 ? 'componentes' : 'componente'} {t('selected')}
                </p>
              )}
            </div>
            <button
              onClick={togglePropertyPanel}
              className="p-2 rounded-xl glass hover:glass-strong transition-all duration-300 hover:scale-110 group"
            >
              <X className="w-5 h-5 text-white group-hover:text-danger-400 transition-colors" />
            </button>
          </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {selectedComponent ? (
          <div className="p-6 space-y-6">
            <ComponentInfo component={selectedComponent} />
            <ComponentPropsEditor component={selectedComponent} />
            <StyleEditor component={selectedComponent} />
          </div>
            ) : (
              <div className="p-6 text-center">
                <div className="glass rounded-2xl p-8 border border-white/10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                    <X className="w-8 h-8 text-primary-400" />
                  </div>
                      <div className="mb-4 text-white/70">
                        {canvas.selectedComponents.length === 0 
                          ? t('selectComponentToEdit')
                          : t('selectOnlyOneComponent')
                        }
                      </div>
                      {canvas.selectedComponents.length > 0 && (
                        <button
                          onClick={() => {
                            const { clearSelection } = useAppStore.getState();
                            clearSelection();
                          }}
                          className="px-6 py-3 glass hover:glass-strong text-white/80 hover:text-white rounded-xl transition-all duration-300 hover:scale-105 text-sm font-medium"
                        >
                          {t('clearSelection')}
                        </button>
                      )}
                </div>
              </div>
            )}
      </div>
    </div>
  );
};
