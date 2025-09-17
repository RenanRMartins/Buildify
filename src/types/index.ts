// Tipos base para o editor visual
export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds extends Position, Size {}

// Tipos de componentes disponíveis
export type ComponentType = 
  | 'button'
  | 'card'
  | 'text'
  | 'image'
  | 'container'
  | 'input'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'table'
  | 'chart'
  | 'spacer';

// Propriedades de estilo
export interface StyleProperties {
  // Layout
  position: Position;
  size: Size;
  zIndex: number;
  
  // Visual
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  opacity: number;
  
  // Typography
  fontFamily: string;
  fontSize: number;
  fontWeight: number | string;
  color: string;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
  letterSpacing: number;
  
  // Spacing
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  
  // Effects
  boxShadow: string;
  transform: string;
  filter: string;
}

// Componente no canvas
export interface CanvasComponent {
  id: string;
  type: ComponentType;
  name: string;
  style: StyleProperties;
  props: Record<string, any>;
  children?: string[]; // IDs dos componentes filhos
  parent?: string; // ID do componente pai
  locked: boolean;
  visible: boolean;
}

// Estado do canvas
export interface CanvasState {
  components: Record<string, CanvasComponent>;
  selectedComponents: string[];
  clipboard: CanvasComponent[];
  history: {
    past: CanvasComponent[][];
    present: CanvasComponent[];
    future: CanvasComponent[][];
  };
  viewport: {
    zoom: number;
    position: Position;
  };
  grid: {
    enabled: boolean;
    size: number;
    snap: boolean;
  };
  guides: {
    horizontal: number[];
    vertical: number[];
  };
}

// Estado global da aplicação
export interface AppState {
  canvas: CanvasState;
  ui: {
    sidebarOpen: boolean;
    propertyPanelOpen: boolean;
    codePanelOpen: boolean;
    theme: 'light' | 'dark';
    language: 'pt' | 'en';
  };
  project: {
    name: string;
    description: string;
    lastSaved: Date | null;
    version: string;
  };
  export: {
    format: 'react' | 'vue' | 'web-components';
    framework: 'next' | 'vite' | 'create-react-app';
    styling: 'tailwind' | 'styled-components' | 'css-modules';
  };
}

// Ações do store
export interface AppActions {
  // Canvas actions
  addComponent: (component: Omit<CanvasComponent, 'id'>) => void;
  updateComponent: (id: string, updates: Partial<CanvasComponent>) => void;
  deleteComponent: (id: string) => void;
  duplicateComponent: (id: string) => void;
  selectComponent: (id: string, multi?: boolean) => void;
  clearSelection: () => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  saveHistory: () => void;
  
  // Viewport actions
  setZoom: (zoom: number) => void;
  setViewportPosition: (position: Position) => void;
  resetViewport: () => void;
  
  // Grid actions
  toggleGrid: () => void;
  setGridSize: (size: number) => void;
  toggleSnap: () => void;
  
  // UI actions
  toggleSidebar: () => void;
  togglePropertyPanel: () => void;
  toggleCodePanel: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (language: 'pt' | 'en') => void;
  
  // Project actions
  setProjectName: (name: string) => void;
  setProjectDescription: (description: string) => void;
  saveProject: () => Promise<void>;
  loadProject: (data: AppState) => void;
  
  // Export actions
  setExportFormat: (format: 'react' | 'vue' | 'web-components') => void;
  setExportFramework: (framework: 'next' | 'vite' | 'create-react-app') => void;
  setExportStyling: (styling: 'tailwind' | 'styled-components' | 'css-modules') => void;
  generateCode: () => string;
  exportProject: () => Promise<Blob>;
}

// Tipos para geração de código
export interface CodeGenerationOptions {
  format: 'react' | 'vue' | 'web-components';
  framework: 'next' | 'vite' | 'create-react-app';
  styling: 'tailwind' | 'styled-components' | 'css-modules';
  typescript: boolean;
  prettier: boolean;
}

export interface GeneratedCode {
  components: string;
  styles: string;
  packageJson: string;
  readme: string;
  configFiles: Record<string, string>;
}

// Tipos para plugins
export interface Plugin {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  components?: ComponentType[];
  hooks?: {
    beforeExport?: (code: GeneratedCode) => GeneratedCode;
    afterComponentAdd?: (component: CanvasComponent) => void;
  };
}

// Tipos para design system
export interface DesignSystem {
  colors: Record<string, string>;
  typography: {
    fontFamilies: string[];
    fontSizes: Record<string, number>;
    fontWeights: Record<string, number | string>;
    lineHeights: Record<string, number>;
  };
  spacing: Record<string, number>;
  borderRadius: Record<string, number>;
  shadows: Record<string, string>;
  breakpoints: Record<string, number>;
}

// Eventos do canvas
export interface CanvasEvent {
  type: 'select' | 'deselect' | 'move' | 'resize' | 'delete' | 'duplicate';
  componentId: string;
  data?: any;
  timestamp: number;
}

// Configurações de performance
export interface PerformanceConfig {
  virtualization: boolean;
  maxComponents: number;
  debounceMs: number;
  throttleMs: number;
  enableOfflineMode: boolean;
}
