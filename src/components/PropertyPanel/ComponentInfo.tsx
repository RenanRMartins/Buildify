import React, { useState, useEffect } from 'react';
import { CanvasComponent } from '../../types';
import { Type, Lock, Eye, EyeOff, Copy, Trash2 } from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { useI18n } from '../../contexts/I18nContext';

interface ComponentInfoProps {
  component: CanvasComponent;
}

export const ComponentInfo: React.FC<ComponentInfoProps> = ({ component }) => {
  const { updateComponent, duplicateComponent, deleteComponent } = useAppStore();
  const { t } = useI18n();
  const [localName, setLocalName] = useState(component.name);

  // Sincronizar com o componente quando ele mudar
  useEffect(() => {
    setLocalName(component.name);
  }, [component.name]);

  const handleNameChange = (name: string) => {
    setLocalName(name);
  };

  const handleNameBlur = () => {
    // Quando o usuário terminar de editar, atualizar o componente
    const finalName = localName.trim() || `Novo ${component.type}`;
    updateComponent(component.id, { 
      name: finalName,
      props: {
        ...component.props,
        text: finalName // Sincronizar com o texto exibido no canvas
      }
    });
    // Atualizar o estado local com o nome final
    setLocalName(finalName);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameBlur();
      e.currentTarget.blur();
    }
    if (e.key === 'Escape') {
      setLocalName(component.name);
      e.currentTarget.blur();
    }
  };

  const handleLockToggle = () => {
    updateComponent(component.id, { locked: !component.locked });
  };

  const handleVisibilityToggle = () => {
    updateComponent(component.id, { visible: !component.visible });
  };

  const handleDuplicate = () => {
    duplicateComponent(component.id);
  };

  const handleDelete = () => {
    if (confirm(t('confirmDelete'))) {
      deleteComponent(component.id);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          {t('componentInfo')}
        </label>
        
        <div className="space-y-3">
          {/* Nome */}
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              {t('name')}
            </label>
            <input
              type="text"
              value={localName}
              onChange={(e) => handleNameChange(e.target.value)}
              onBlur={handleNameBlur}
              onKeyDown={handleNameKeyDown}
              className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              placeholder={t('enterName')}
              autoComplete="off"
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">
              {t('type')}
            </label>
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 border border-white/10 rounded-md">
              <Type className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-white/90 capitalize">
                {component.type}
              </span>
            </div>
          </div>

          {/* Posição e Tamanho */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                {t('x')}
              </label>
              <input
                type="number"
                value={Math.round(component.style.position.x)}
                onChange={(e) => {
                  const newX = Number(e.target.value);
                  if (!isNaN(newX) && newX >= 0) {
                    updateComponent(component.id, {
                      style: {
                        ...component.style,
                        position: {
                          ...component.style.position,
                          x: newX
                        }
                      }
                    });
                  }
                }}
                className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                {t('y')}
              </label>
              <input
                type="number"
                value={Math.round(component.style.position.y)}
                onChange={(e) => {
                  const newY = Number(e.target.value);
                  if (!isNaN(newY) && newY >= 0) {
                    updateComponent(component.id, {
                      style: {
                        ...component.style,
                        position: {
                          ...component.style.position,
                          y: newY
                        }
                      }
                    });
                  }
                }}
                className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                {t('width')}
              </label>
              <input
                type="number"
                value={Math.round(component.style.size.width)}
                onChange={(e) => {
                  const newWidth = Number(e.target.value);
                  if (!isNaN(newWidth) && newWidth > 0) {
                    updateComponent(component.id, {
                      style: {
                        ...component.style,
                        size: {
                          ...component.style.size,
                          width: newWidth
                        }
                      }
                    });
                  }
                }}
                className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                min="1"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                {t('height')}
              </label>
              <input
                type="number"
                value={Math.round(component.style.size.height)}
                onChange={(e) => {
                  const newHeight = Number(e.target.value);
                  if (!isNaN(newHeight) && newHeight > 0) {
                    updateComponent(component.id, {
                      style: {
                        ...component.style,
                        size: {
                          ...component.style.size,
                          height: newHeight
                        }
                      }
                    });
                  }
                }}
                className="w-full px-2 py-1 text-sm bg-white/10 border border-white/20 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                min="1"
              />
            </div>
          </div>

          {/* Ações */}
          <div className="flex space-x-2 pt-2">
            <button
              onClick={handleLockToggle}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors border ${
                component.locked
                  ? 'bg-red-500/20 text-red-400 border-red-400/30 hover:bg-red-500/30'
                  : 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>{component.locked ? t('unlock') : t('lock')}</span>
            </button>

            <button
              onClick={handleVisibilityToggle}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors border ${
                component.visible
                  ? 'bg-white/10 text-white/70 border-white/20 hover:bg-white/20 hover:text-white'
                  : 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30 hover:bg-yellow-500/30'
              }`}
            >
              {component.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{component.visible ? t('hide') : t('show')}</span>
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleDuplicate}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-md hover:bg-blue-500/30 transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>{t('duplicate')}</span>
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 border border-red-400/30 rounded-md hover:bg-red-500/30 transition-colors text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('delete')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
