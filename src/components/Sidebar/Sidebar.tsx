import React from 'react';
import { ComponentPalette } from './ComponentPalette';
import { ProjectInfo } from './ProjectInfo';
import { Toolbar } from './Toolbar';
import { useI18n } from '../../contexts/I18nContext';
import { Palette, Sparkles } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="w-full glass border-r border-white/20 flex flex-col h-full relative z-10">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">{t('appTitle')}</h1>
            <p className="text-sm text-white/70 font-medium">{t('appSubtitle')}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-white/60">
          <Sparkles className="w-4 h-4" />
          <span>{t('dragComponentsToCanvas')}</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-6 py-4">
        <Toolbar />
      </div>

      {/* Project Info */}
      <div className="px-6 pb-4">
        <ProjectInfo />
      </div>

      {/* Component Palette */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-6">
        <ComponentPalette />
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-white/20 glass-strong">
        <div className="text-xs text-white/60 text-center space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse" />
            <span>Versão 1.0.0</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <span>Feito com</span>
            <span className="text-danger-400 animate-pulse">❤️</span>
            <span>para desenvolvedores</span>
          </div>
        </div>
      </div>
    </div>
  );
};
