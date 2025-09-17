import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { AppState, AppActions, CanvasComponent } from '../types';

// Estado inicial
const initialState: AppState = {
  canvas: {
    components: {},
    selectedComponents: [],
    clipboard: [],
    history: {
      past: [],
      present: [],
      future: [],
    },
    viewport: {
      zoom: 1,
      position: { x: 0, y: 0 },
    },
    grid: {
      enabled: true,
      size: 20,
      snap: true,
    },
    guides: {
      horizontal: [],
      vertical: [],
    },
  },
  ui: {
    sidebarOpen: true,
    propertyPanelOpen: true,
    codePanelOpen: false,
    theme: 'light',
    language: 'pt',
  },
  project: {
    name: 'Novo Projeto',
    description: 'Projeto criado no Buildify',
    lastSaved: null,
    version: '1.0.0',
  },
  export: {
    format: 'react',
    framework: 'vite',
    styling: 'tailwind',
  },
};

// Função para gerar ID único
const generateId = (): string => {
  return `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Função para criar componente padrão (não utilizada no momento)
// const createDefaultComponent = (type: string, position: Position): Omit<CanvasComponent, 'id'> => {
//   const defaultStyle: StyleProperties = {
//     position,
//     size: { width: 100, height: 40 },
//     zIndex: 1,
//     backgroundColor: '#3b82f6',
//     borderColor: '#1d4ed8',
//     borderWidth: 0,
//     borderRadius: 6,
//     opacity: 1,
//     fontFamily: 'Inter, sans-serif',
//     fontSize: 14,
//     fontWeight: 500,
//     color: '#ffffff',
//     textAlign: 'center',
//     lineHeight: 1.5,
//     letterSpacing: 0,
//     padding: { top: 8, right: 16, bottom: 8, left: 16 },
//     margin: { top: 0, right: 0, bottom: 0, left: 0 },
//     boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
//     transform: 'none',
//     filter: 'none',
//   };

//   return {
//     type: type as any,
//     name: `Novo ${type}`,
//     style: defaultStyle,
//     props: {},
//     locked: false,
//     visible: true,
//   };
// };

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    // persist(
      immer((set) => ({
        ...initialState,

        // Canvas actions
        addComponent: (componentData) => {
          set((state) => {
            const id = generateId();
            const component: CanvasComponent = {
              id,
              ...componentData,
            };
            state.canvas.components[id] = component;
            state.canvas.selectedComponents = [id];
            
            // Salvar no histórico
            state.canvas.history.past.push([...state.canvas.history.present]);
            state.canvas.history.present = Object.values(state.canvas.components);
            state.canvas.history.future = [];
          });
        },

        updateComponent: (id, updates) => {
          set((state) => {
            if (state.canvas.components[id]) {
              Object.assign(state.canvas.components[id], updates);
              
              // Salvar no histórico
              state.canvas.history.past.push([...state.canvas.history.present]);
              state.canvas.history.present = Object.values(state.canvas.components);
              state.canvas.history.future = [];
            }
          });
        },

        deleteComponent: (id) => {
          set((state) => {
            delete state.canvas.components[id];
            state.canvas.selectedComponents = state.canvas.selectedComponents.filter(
              (selectedId) => selectedId !== id
            );
            
            // Salvar no histórico
            state.canvas.history.past.push([...state.canvas.history.present]);
            state.canvas.history.present = Object.values(state.canvas.components);
            state.canvas.history.future = [];
          });
        },

        duplicateComponent: (id) => {
          set((state) => {
            const original = state.canvas.components[id];
            if (original) {
              const newId = generateId();
              const duplicated: CanvasComponent = {
                ...original,
                id: newId,
                style: {
                  ...original.style,
                  position: {
                    x: original.style.position.x + 20,
                    y: original.style.position.y + 20,
                  },
                },
              };
              state.canvas.components[newId] = duplicated;
              state.canvas.selectedComponents = [newId];
              
              // Salvar no histórico
              state.canvas.history.past.push([...state.canvas.history.present]);
              state.canvas.history.present = Object.values(state.canvas.components);
              state.canvas.history.future = [];
            }
          });
        },

        selectComponent: (id, multi = false) => {
          set((state) => {
            // Verificar se o componente existe
            if (!state.canvas.components[id]) {
              return;
            }
            
            if (multi) {
              // Seleção múltipla com Ctrl/Cmd
              if (state.canvas.selectedComponents.includes(id)) {
                state.canvas.selectedComponents = state.canvas.selectedComponents.filter(
                  (selectedId) => selectedId !== id
                );
              } else {
                state.canvas.selectedComponents.push(id);
              }
            } else {
              // Seleção simples - sempre selecionar o componente
              state.canvas.selectedComponents = [id];
            }
          });
        },

        clearSelection: () => {
          set((state) => {
            state.canvas.selectedComponents = [];
          });
        },

        // History actions
        undo: () => {
          set((state) => {
            if (state.canvas.history.past.length > 0) {
              const previous = state.canvas.history.past.pop()!;
              state.canvas.history.future.unshift(state.canvas.history.present);
              state.canvas.history.present = previous;
              
              // Reconstruir componentes do histórico
              state.canvas.components = {};
              previous.forEach((component) => {
                state.canvas.components[component.id] = component;
              });
            }
          });
        },

        redo: () => {
          set((state) => {
            if (state.canvas.history.future.length > 0) {
              const next = state.canvas.history.future.shift()!;
              state.canvas.history.past.push(state.canvas.history.present);
              state.canvas.history.present = next;
              
              // Reconstruir componentes do histórico
              state.canvas.components = {};
              next.forEach((component) => {
                state.canvas.components[component.id] = component;
              });
            }
          });
        },

        saveHistory: () => {
          set((state) => {
            state.canvas.history.past.push([...state.canvas.history.present]);
            state.canvas.history.present = Object.values(state.canvas.components);
            state.canvas.history.future = [];
          });
        },

        // Viewport actions
        setZoom: (zoom) => {
          set((state) => {
            state.canvas.viewport.zoom = Math.max(0.1, Math.min(5, zoom));
          });
        },

        setViewportPosition: (position) => {
          set((state) => {
            state.canvas.viewport.position = position;
          });
        },

        resetViewport: () => {
          set((state) => {
            state.canvas.viewport.zoom = 1;
            state.canvas.viewport.position = { x: 0, y: 0 };
          });
        },

        // Grid actions
        toggleGrid: () => {
          set((state) => {
            state.canvas.grid.enabled = !state.canvas.grid.enabled;
          });
        },

        setGridSize: (size) => {
          set((state) => {
            state.canvas.grid.size = Math.max(5, Math.min(50, size));
          });
        },

        toggleSnap: () => {
          set((state) => {
            state.canvas.grid.snap = !state.canvas.grid.snap;
          });
        },

        // UI actions
        toggleSidebar: () => {
          set((state) => {
            state.ui.sidebarOpen = !state.ui.sidebarOpen;
          });
        },

        togglePropertyPanel: () => {
          set((state) => {
            state.ui.propertyPanelOpen = !state.ui.propertyPanelOpen;
          });
        },

        toggleCodePanel: () => {
          set((state) => {
            state.ui.codePanelOpen = !state.ui.codePanelOpen;
          });
        },

        setTheme: (theme) => {
          set((state) => {
            state.ui.theme = theme;
          });
        },

        setLanguage: (language) => {
          set((state) => {
            state.ui.language = language;
          });
        },

        // Project actions
        setProjectName: (name) => {
          set((state) => {
            state.project.name = name;
          });
        },

        setProjectDescription: (description) => {
          set((state) => {
            state.project.description = description;
          });
        },

        saveProject: async () => {
          // Aqui seria implementada a lógica de persistência
          // Por enquanto, apenas atualizamos o timestamp
          set((draft) => {
            draft.project.lastSaved = new Date();
          });
        },

        loadProject: (data) => {
          set(() => data);
        },

        // Export actions
        setExportFormat: (format) => {
          set((state) => {
            state.export.format = format;
          });
        },

        setExportFramework: (framework) => {
          set((state) => {
            state.export.framework = framework;
          });
        },

        setExportStyling: (styling) => {
          set((state) => {
            state.export.styling = styling;
          });
        },

        generateCode: () => {
          // Implementação da geração de código será feita posteriormente
          return '// Código gerado será implementado aqui';
        },

        exportProject: async () => {
          // Implementação da exportação será feita posteriormente
          return new Blob(['Projeto exportado'], { type: 'application/zip' });
        },
      }))
    // ),
    // {
    //   name: 'buildify-store',
    // }
  )
);
