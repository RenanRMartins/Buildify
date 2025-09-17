import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { 
  Undo, 
  Redo, 
  Grid3X3, 
  Magnet, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Save,
  Download,
  Code,
  Settings
} from 'lucide-react';

export const Toolbar: React.FC = () => {
  const {
    canvas,
    ui,
    undo,
    redo,
    toggleGrid,
    toggleSnap,
    setZoom,
    resetViewport,
    saveProject,
    exportProject,
    toggleCodePanel,
    setTheme,
  } = useAppStore();

  const canUndo = canvas.history.past.length > 0;
  const canRedo = canvas.history.future.length > 0;

  const handleZoomIn = () => {
    setZoom(Math.min(5, canvas.viewport.zoom * 1.2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.1, canvas.viewport.zoom / 1.2));
  };

  const handleSave = async () => {
    await saveProject();
  };

  const handleExport = async () => {
    const blob = await exportProject();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'buildify-project.zip';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 border-b border-white/20">
      <div className="flex flex-wrap gap-2">
        {/* Undo/Redo */}
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-white/20"
          title="Desfazer (Ctrl+Z)"
        >
          <Undo className="w-4 h-4 text-white/90" />
        </button>
        
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-white/20"
          title="Refazer (Ctrl+Y)"
        >
          <Redo className="w-4 h-4 text-white/90" />
        </button>

        <div className="w-px h-8 bg-white/30 mx-1" />

        {/* Grid */}
        <button
          onClick={toggleGrid}
          className={`p-2 rounded-md transition-colors border ${
            canvas.grid.enabled 
              ? 'bg-blue-500/30 text-blue-400 border-blue-400/30' 
              : 'bg-white/10 hover:bg-white/20 border-white/20'
          }`}
          title="Alternar Grid"
        >
          <Grid3X3 className="w-4 h-4" />
        </button>

        <button
          onClick={toggleSnap}
          className={`p-2 rounded-md transition-colors border ${
            canvas.grid.snap 
              ? 'bg-blue-500/30 text-blue-400 border-blue-400/30' 
              : 'bg-white/10 hover:bg-white/20 border-white/20'
          }`}
          title="Alternar Snap to Grid"
        >
          <Magnet className="w-4 h-4" />
        </button>

        <div className="w-px h-8 bg-white/30 mx-1" />

        {/* Zoom */}
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          title="Diminuir Zoom"
        >
          <ZoomOut className="w-4 h-4 text-white/90" />
        </button>

        <div className="px-2 py-1 bg-white/10 border border-white/20 rounded-md text-sm font-mono text-white/90">
          {Math.round(canvas.viewport.zoom * 100)}%
        </div>

        <button
          onClick={handleZoomIn}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          title="Aumentar Zoom"
        >
          <ZoomIn className="w-4 h-4 text-white/90" />
        </button>

        <button
          onClick={resetViewport}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          title="Resetar Viewport"
        >
          <RotateCcw className="w-4 h-4 text-white/90" />
        </button>

        <div className="w-px h-8 bg-white/30 mx-1" />

        {/* Actions */}
        <button
          onClick={handleSave}
          className="p-2 rounded-md bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors border border-green-400/30"
          title="Salvar Projeto (Ctrl+S)"
        >
          <Save className="w-4 h-4" />
        </button>

        <button
          onClick={handleExport}
          className="p-2 rounded-md bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors border border-blue-400/30"
          title="Exportar Projeto"
        >
          <Download className="w-4 h-4" />
        </button>

        <button
          onClick={toggleCodePanel}
          className={`p-2 rounded-md transition-colors border ${
            ui.codePanelOpen 
              ? 'bg-purple-500/30 text-purple-400 border-purple-400/30' 
              : 'bg-white/10 hover:bg-white/20 border-white/20'
          }`}
          title="Painel de Código"
        >
          <Code className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTheme(ui.theme === 'light' ? 'dark' : 'light')}
          className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20"
          title="Alternar Tema"
        >
          <Settings className="w-4 h-4 text-white/90" />
        </button>
      </div>
    </div>
  );
};
