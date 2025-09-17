import { useEffect, useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { I18nProvider, useI18n } from './contexts/I18nContext';
import { useAppStore } from './stores/useAppStore';
import { Sidebar } from './components/Sidebar/Sidebar';
import { PropertyPanel } from './components/PropertyPanel/PropertyPanel';
import { CodePanel } from './components/CodePanel/CodePanel';
import { Canvas } from './components/Canvas/Canvas';
import { NotificationContainer, useNotifications } from './components/Notification/Notification';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { ResizeHandle } from './components/ResizeHandle';
import { ParticleBackground } from './components/ParticleBackground';
import { HolographicEffect } from './components/HolographicEffect';
import { SoundWaves } from './components/SoundWaves';

function AppContent() {
  const { ui } = useAppStore();
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [propertyPanelWidth, setPropertyPanelWidth] = useState(200);
  const [codePanelWidth, setCodePanelWidth] = useState(340);
  const { notifications } = useNotifications();
  const { t } = useI18n();

  // Atalhos de teclado
  useKeyboardShortcuts();

  // Calcular tamanho do canvas
  useEffect(() => {
    const updateCanvasSize = () => {
      const sidebarW = ui.sidebarOpen ? sidebarWidth : 0;
      const propertyW = ui.propertyPanelOpen ? propertyPanelWidth : 0;
      const codeW = ui.codePanelOpen ? codePanelWidth : 0;
      
      setCanvasSize({
        width: window.innerWidth - sidebarW - propertyW - codeW,
        height: window.innerHeight - 48, // Altura da barra superior (h-12 = 48px)
      });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [ui.sidebarOpen, ui.propertyPanelOpen, ui.codePanelOpen, sidebarWidth, propertyPanelWidth, codePanelWidth]);

  return (
    <div className="buildify-app flex h-screen relative overflow-hidden">
      {/* Futuristic Background Effects */}
      <div className="absolute inset-0 -z-10">
        {/* Particle System */}
        <ParticleBackground />
        
        {/* Sound Waves */}
        <SoundWaves />
        
        {/* Holographic Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96">
          <HolographicEffect intensity={0.3} speed={0.5}>
            <div className="w-full h-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float" />
          </HolographicEffect>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80">
          <HolographicEffect intensity={0.2} speed={0.7}>
            <div className="w-full h-full bg-gradient-to-br from-accent-500/20 to-warning-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          </HolographicEffect>
        </div>
        
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          <HolographicEffect intensity={0.4} speed={0.3}>
            <div className="w-full h-full bg-gradient-to-br from-danger-500/20 to-neon-pink/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
          </HolographicEffect>
        </div>
        
        {/* Cyber Grid Overlay */}
        <div className="absolute inset-0 cyber-grid opacity-20" />
      </div>

      {/* Header */}
      <header className="relative z-20 h-12 glass-strong border-b border-white/20 flex items-center justify-between px-4 backdrop-blur-xl">
        <div className="flex items-center space-x-4">
          <HolographicEffect intensity={0.2} speed={1}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow neon-glow interactive-hover">
                <span className="text-white font-bold text-sm holographic">B</span>
              </div>
              <div>
                <h1 className="text-lg font-bold gradient-text holographic">
                  {t('appTitle')}
                </h1>
                <p className="text-xs text-white/60 font-medium">
                  {t('appSubtitle')}
                </p>
              </div>
            </div>
          </HolographicEffect>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Panel Toggle Buttons */}
          <div className="flex items-center space-x-1">
            <HolographicEffect intensity={0.1} speed={1.5}>
              <button
                onClick={() => useAppStore.getState().toggleSidebar()}
                className={`p-2 rounded-lg glass hover:glass-strong interactive-hover transition-all duration-300 ${
                  ui.sidebarOpen ? 'bg-primary-500/20 text-primary-400 neon-glow' : 'text-white/60'
                }`}
                title={t('toggleSidebar')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </HolographicEffect>
            
            <HolographicEffect intensity={0.1} speed={1.2}>
              <button
                onClick={() => useAppStore.getState().togglePropertyPanel()}
                className={`p-2 rounded-lg glass hover:glass-strong interactive-hover transition-all duration-300 ${
                  ui.propertyPanelOpen ? 'bg-primary-500/20 text-primary-400 neon-glow' : 'text-white/60'
                }`}
                title={t('toggleProperties')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </HolographicEffect>
            
            <HolographicEffect intensity={0.1} speed={1.8}>
              <button
                onClick={() => useAppStore.getState().toggleCodePanel()}
                className={`p-2 rounded-lg glass hover:glass-strong interactive-hover transition-all duration-300 ${
                  ui.codePanelOpen ? 'bg-primary-500/20 text-primary-400 neon-glow' : 'text-white/60'
                }`}
                title={t('toggleCode')}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </button>
            </HolographicEffect>
          </div>
          
          <HolographicEffect intensity={0.15} speed={0.8}>
            <ThemeSwitcher />
          </HolographicEffect>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Sidebar */}
        {ui.sidebarOpen && (
          <>
            <div 
              className="flex-shrink-0 glass border-r border-white/20"
              style={{ width: sidebarWidth }}
            >
              <Sidebar isOpen={ui.sidebarOpen} />
            </div>
            <ResizeHandle 
              direction="right" 
              onResize={(delta) => setSidebarWidth(prev => Math.max(200, Math.min(600, prev + delta)))}
            />
          </>
        )}

        {/* Canvas Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 relative canvas-container">
            <HolographicEffect intensity={0.05} speed={0.3}>
              <Canvas width={canvasSize.width} height={canvasSize.height} />
            </HolographicEffect>
            
            {/* Canvas Overlay Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 right-4 glass-strong rounded-2xl px-4 py-3 text-sm font-mono shadow-2xl border border-white/20">
                <div className="space-y-2 text-white/90">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse neon-glow" />
                    <span className="holographic">Zoom: {Math.round(1 * 100)}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-secondary-500 rounded-full neon-glow" />
                    <span className="holographic">Posição: 0, 0</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent-500 rounded-full neon-glow" />
                    <span className="holographic">Componentes: {Object.keys(useAppStore.getState().canvas.components).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Property Panel */}
        {ui.propertyPanelOpen && (
          <>
            <ResizeHandle 
              direction="left" 
              onResize={(delta) => setPropertyPanelWidth(prev => Math.max(250, Math.min(600, prev + delta)))}
            />
            <div 
              className="flex-shrink-0 glass border-l border-white/20"
              style={{ width: propertyPanelWidth }}
            >
              <PropertyPanel isOpen={ui.propertyPanelOpen} />
            </div>
          </>
        )}

        {/* Code Panel */}
        {ui.codePanelOpen && (
          <>
            <ResizeHandle 
              direction="left" 
              onResize={(delta) => setCodePanelWidth(prev => Math.max(300, Math.min(800, prev + delta)))}
            />
            <div 
              className="flex-shrink-0 glass border-l border-white/20"
              style={{ width: codePanelWidth }}
            >
              <CodePanel isOpen={ui.codePanelOpen} />
            </div>
          </>
        )}
      </div>


      {/* Notifications */}
      <NotificationContainer notifications={notifications} />
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');
  
  return (
    <ThemeProvider>
      <I18nProvider language={language}>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  );
}

export default App;