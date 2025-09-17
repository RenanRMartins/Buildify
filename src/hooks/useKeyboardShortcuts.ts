import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

export const useKeyboardShortcuts = () => {
  const {
    canvas,
    ui,
    undo,
    redo,
    deleteComponent,
    duplicateComponent,
    clearSelection,
    saveProject,
    setTheme,
    toggleGrid,
    toggleSnap,
    setZoom,
    resetViewport,
  } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevenir atalhos padrão do navegador
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            saveProject();
            break;
          case 'a':
            e.preventDefault();
            // Selecionar todos os componentes
            // TODO: Implementar seleção múltipla
            break;
          case 'c':
            e.preventDefault();
            // Copiar componentes selecionados
            break;
          case 'v':
            e.preventDefault();
            // Colar componentes
            break;
          case 'd':
            e.preventDefault();
            // Duplicar componente selecionado
            if (canvas.selectedComponents.length === 1) {
              duplicateComponent(canvas.selectedComponents[0]);
            }
            break;
        }
      }

      // Atalhos sem Ctrl/Cmd
      switch (e.key) {
        case 'Delete':
        case 'Backspace':
          e.preventDefault();
          if (canvas.selectedComponents.length > 0) {
            canvas.selectedComponents.forEach(id => {
              deleteComponent(id);
            });
          }
          break;
        case 'Escape':
          clearSelection();
          break;
        case ' ':
          e.preventDefault();
          // Toggle pan mode
          break;
        case 'g':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            toggleGrid();
          }
          break;
        case 'm':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            toggleSnap();
          }
          break;
        case '0':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            resetViewport();
          }
          break;
        case '=':
        case '+':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            setZoom(Math.min(5, canvas.viewport.zoom * 1.2));
          }
          break;
        case '-':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            setZoom(Math.max(0.1, canvas.viewport.zoom / 1.2));
          }
          break;
      }

      // Atalhos com Shift
      if (e.shiftKey) {
        switch (e.key) {
        case 'D':
          e.preventDefault();
          setTheme(ui.theme === 'light' ? 'dark' : 'light');
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    canvas,
    undo,
    redo,
    deleteComponent,
    duplicateComponent,
    clearSelection,
    saveProject,
    setTheme,
    toggleGrid,
    toggleSnap,
    setZoom,
    resetViewport,
  ]);
};
