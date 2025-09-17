import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { ComponentType } from '../../types';
import { useI18n } from '../../contexts/I18nContext';
import { 
  Square, 
  Type, 
  Image, 
  Container, 
  MousePointer, 
  CheckSquare,
  Radio,
  Table,
  BarChart3,
  Minus
} from 'lucide-react';

interface ComponentItemProps {
  type: ComponentType;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const ComponentItem: React.FC<ComponentItemProps> = ({ type, name, icon, description }) => {
  const { addComponent } = useAppStore();
  const { t } = useI18n();

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type }));
    e.dataTransfer.effectAllowed = 'copy';
    // Efeito visual durante o drag
    e.currentTarget.style.opacity = '0.7';
    e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
  };

  const handleClick = () => {
    // Adicionar componente no centro do canvas
    addComponent({
      type,
      name: `Novo ${name}`,
      style: {
        position: { x: 200, y: 200 },
        size: { width: 100, height: 40 },
        zIndex: 1,
        backgroundColor: '#0ea5e9',
        borderColor: '#0284c7',
        borderWidth: 0,
        borderRadius: 12,
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
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        transform: 'none',
        filter: 'none',
      },
      props: {
        text: `Novo ${name}`,
        placeholder: `Digite aqui...`,
        title: `Título do ${name}`,
        description: `Descrição do ${name} aqui...`
      },
      locked: false,
      visible: true,
    });
  };

  return (
    <div
      className="group relative p-4 glass hover:glass-strong rounded-2xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:scale-105 hover:shadow-glow mb-3"
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 flex items-center justify-center group-hover:from-primary-500/30 group-hover:to-secondary-500/30 transition-all duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-semibold text-white/60 group-hover:text-primary-300 transition-colors truncate">
              {t(name as any)}
            </h3>
            <div className="w-2 h-2 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <p className="text-xs text-white/60 group-hover:text-white/80 transition-colors leading-relaxed group-hover:opacity-100">
            {description}
          </p>
        </div>
      </div>
      
      {/* Efeito shimmer no hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shimmer" />
      
      {/* Indicador de drag */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-white/40 rounded-full" />
      </div>
    </div>
  );
};

const getComponents = (t: (key: string) => string): ComponentItemProps[] => [
  {
    type: 'button',
    name: 'button',
    icon: <Square className="w-5 h-5 text-primary-400" />,
    description: t('buttonDescription'),
  },
  {
    type: 'card',
    name: 'card',
    icon: <Container className="w-5 h-5 text-secondary-400" />,
    description: t('cardDescription'),
  },
  {
    type: 'text',
    name: 'text',
    icon: <Type className="w-5 h-5 text-accent-400" />,
    description: t('textDescription'),
  },
  {
    type: 'input',
    name: 'input',
    icon: <MousePointer className="w-5 h-5 text-warning-400" />,
    description: t('inputDescription'),
  },
  {
    type: 'image',
    name: 'image',
    icon: <Image className="w-5 h-5 text-danger-400" />,
    description: t('imageDescription'),
  },
  {
    type: 'container',
    name: 'container',
    icon: <Container className="w-5 h-5 text-primary-300" />,
    description: t('containerDescription'),
  },
  {
    type: 'checkbox',
    name: 'checkbox',
    icon: <CheckSquare className="w-5 h-5 text-secondary-300" />,
    description: t('checkboxDescription'),
  },
  {
    type: 'radio',
    name: 'radio',
    icon: <Radio className="w-5 h-5 text-accent-300" />,
    description: t('radioDescription'),
  },
  {
    type: 'table',
    name: 'table',
    icon: <Table className="w-5 h-5 text-warning-300" />,
    description: t('tableDescription'),
  },
  {
    type: 'chart',
    name: 'chart',
    icon: <BarChart3 className="w-5 h-5 text-danger-300" />,
    description: t('chartDescription'),
  },
  {
    type: 'spacer',
    name: 'spacer',
    icon: <Minus className="w-5 h-5 text-white/60" />,
    description: t('spacerDescription'),
  },
];

export const ComponentPalette: React.FC = () => {
  const { t } = useI18n();
  const components = getComponents(t);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-white mb-2">
          {t('components')}
        </h2>
        <p className="text-sm text-white/60">
          {t('dragComponentsToCanvas')}
        </p>
      </div>
      
      <div className="space-y-1">
        {components.map((component, index) => (
          <div
            key={component.type}
            style={{ animationDelay: `${index * 50}ms` }}
            className="animate-fade-in"
          >
            <ComponentItem {...component} />
          </div>
        ))}
      </div>
      
      {/* Dica de uso */}
      <div className="mt-6 p-4 glass rounded-2xl border border-white/10">
        <div className="flex items-center space-x-2 text-xs text-white/60">
          <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse" />
          <span>{t('tip')}: {t('undoRedoTip')}</span>
        </div>
      </div>
    </div>
  );
};
