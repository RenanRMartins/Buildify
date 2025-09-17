import React, { createContext, useContext, useState } from 'react';
import { Language } from './ThemeContext';

interface Translations {
  // Navigation
  sidebar: string;
  canvas: string;
  properties: string;
  code: string;
  
  // Components
  components: string;
  button: string;
  card: string;
  text: string;
  input: string;
  image: string;
  container: string;
  checkbox: string;
  radio: string;
  table: string;
  chart: string;
  spacer: string;
  
  // Actions
  add: string;
  delete: string;
  duplicate: string;
  copy: string;
  paste: string;
  undo: string;
  redo: string;
  save: string;
  export: string;
  import: string;
  
  // Properties
  name: string;
  type: string;
  color: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  textAlign: string;
  opacity: string;
  borderRadius: string;
  padding: string;
  margin: string;
  shadow: string;
  
  // Status
  locked: string;
  unlocked: string;
  visible: string;
  hidden: string;
  selected: string;
  unselected: string;
  
  // Messages
  confirmDelete: string;
  projectSaved: string;
  projectLoaded: string;
  exportSuccess: string;
  exportError: string;
  
  // Placeholders
  enterName: string;
  enterText: string;
  enterPlaceholder: string;
  enterTitle: string;
  enterDescription: string;
  
  // Tooltips
  dragToCanvas: string;
  clickToSelect: string;
  doubleClickToEdit: string;
  rightClickForMenu: string;
  
  // App specific
  appTitle: string;
  appSubtitle: string;
  ready: string;
  version: string;
  developedWith: string;
  project: string;
  newProject: string;
  projectCreated: string;
  saved: string;
  never: string;
  dragComponentsToCanvas: string;
  selectComponentToEdit: string;
  selectOnlyOneComponent: string;
  clearSelection: string;
  toggleSidebar: string;
  toggleProperties: string;
  toggleCode: string;
  generatedCode: string;
  regenerateCode: string;
  copyCode: string;
  downloadCode: string;
  generatingCode: string;
  generatedAt: string;
  language: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  cancel: string;
  
  // Component descriptions
  buttonDescription: string;
  cardDescription: string;
  textDescription: string;
  inputDescription: string;
  imageDescription: string;
  containerDescription: string;
  checkboxDescription: string;
  radioDescription: string;
  tableDescription: string;
  chartDescription: string;
  spacerDescription: string;
  
  // Property panel
  componentInfo: string;
  position: string;
  size: string;
  width: string;
  height: string;
  x: string;
  y: string;
  actions: string;
  lock: string;
  unlock: string;
  hide: string;
  show: string;
  duplicate: string;
  delete: string;
  componentProperties: string;
  buttonText: string;
  buttonType: string;
  state: string;
  normal: string;
  disabled: string;
  action: string;
  backgroundColor: string;
  borderColor: string;
  
  // Tips
  tip: string;
  undoRedoTip: string;
}

const translations: Record<Language, Translations> = {
  pt: {
    // Navigation
    sidebar: 'Barra Lateral',
    canvas: 'Canvas',
    properties: 'Propriedades',
    code: 'Código',
    
    // Components
    components: 'Componentes',
    button: 'Botão',
    card: 'Card',
    text: 'Texto',
    input: 'Campo de Entrada',
    image: 'Imagem',
    container: 'Container',
    checkbox: 'Checkbox',
    radio: 'Radio',
    table: 'Tabela',
    chart: 'Gráfico',
    spacer: 'Espaçador',
    
    // Actions
    add: 'Adicionar',
    delete: 'Deletar',
    duplicate: 'Duplicar',
    copy: 'Copiar',
    paste: 'Colar',
    undo: 'Desfazer',
    redo: 'Refazer',
    save: 'Salvar',
    export: 'Exportar',
    import: 'Importar',
    
    // Properties
    name: 'Nome',
    type: 'Tipo',
    color: 'Cor',
    fontSize: 'Tamanho da Fonte',
    fontFamily: 'Família da Fonte',
    fontWeight: 'Peso da Fonte',
    textAlign: 'Alinhamento do Texto',
    opacity: 'Opacidade',
    borderRadius: 'Raio da Borda',
    padding: 'Preenchimento',
    margin: 'Margem',
    shadow: 'Sombra',
    
    // Status
    locked: 'Bloqueado',
    unlocked: 'Desbloqueado',
    visible: 'Visível',
    hidden: 'Oculto',
    selected: 'Selecionado',
    unselected: 'Não Selecionado',
    
    // Messages
    confirmDelete: 'Tem certeza que deseja deletar este componente?',
    projectSaved: 'Projeto salvo com sucesso!',
    projectLoaded: 'Projeto carregado com sucesso!',
    exportSuccess: 'Projeto exportado com sucesso!',
    exportError: 'Erro ao exportar projeto',
    
    // Placeholders
    enterName: 'Digite o nome...',
    enterText: 'Digite o texto...',
    enterPlaceholder: 'Digite o placeholder...',
    enterTitle: 'Digite o título...',
    enterDescription: 'Digite a descrição...',
    
    // Tooltips
    dragToCanvas: 'Arraste para o canvas',
    clickToSelect: 'Clique para selecionar',
    doubleClickToEdit: 'Duplo clique para editar',
    rightClickForMenu: 'Clique direito para menu',
    
    // App specific
    appTitle: 'Buildify',
    appSubtitle: 'Editor Visual de Interfaces',
    ready: 'Pronto',
    version: 'Buildify v1.0.0',
    developedWith: 'Desenvolvido com ❤️',
    project: 'Projeto',
    newProject: 'Novo Projeto',
    projectCreated: 'Projeto criado no Buildify',
    saved: 'Salvo',
    never: 'Nunca',
    dragComponentsToCanvas: 'Arraste componentes para o canvas',
    selectComponentToEdit: 'Selecione um componente para editar suas propriedades',
    selectOnlyOneComponent: 'Selecione apenas um componente para editar suas propriedades',
    clearSelection: 'Limpar Seleção',
    toggleSidebar: 'Alternar Sidebar',
    toggleProperties: 'Alternar Painel de Propriedades',
    toggleCode: 'Alternar Painel de Código',
    language: 'Idioma',
    theme: 'Tema',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    cancel: 'Cancelar',
    
    // Component descriptions
    buttonDescription: 'Botão clicável com estilos customizáveis',
    cardDescription: 'Container para conteúdo com sombra',
    textDescription: 'Texto simples com formatação',
    inputDescription: 'Campo de entrada de texto',
    imageDescription: 'Elemento para exibir imagens',
    containerDescription: 'Container vazio para organização',
    checkboxDescription: 'Caixa de seleção múltipla',
    radioDescription: 'Botão de seleção única',
    tableDescription: 'Tabela para dados estruturados',
    chartDescription: 'Gráfico de dados',
    spacerDescription: 'Elemento para espaçamento',
    
    // Property panel
    componentInfo: 'Informações do Componente',
    position: 'Posição',
    size: 'Tamanho',
    width: 'Largura',
    height: 'Altura',
    x: 'X',
    y: 'Y',
    actions: 'Ações',
    lock: 'Bloquear',
    unlock: 'Desbloquear',
    hide: 'Ocultar',
    show: 'Mostrar',
    duplicate: 'Duplicar',
    delete: 'Deletar',
    componentProperties: 'Propriedades do Componente',
    buttonText: 'Texto do Botão',
    buttonType: 'Tipo do Botão',
    state: 'Estado',
    normal: 'Normal',
    disabled: 'Desabilitado',
    action: 'Ação (onClick)',
    backgroundColor: 'Cor de Fundo',
    borderColor: 'Cor da Borda',
    
    // Tips
    tip: 'Dica',
    undoRedoTip: 'Use Ctrl+Z para desfazer e Ctrl+Y para refazer',
    
    // Code panel
    generatedCode: 'Código Gerado',
    regenerateCode: 'Regenerar código',
    copyCode: 'Copiar código',
    downloadCode: 'Baixar código',
    generatingCode: 'Gerando código...',
    generatedAt: 'Gerado em',
  },
  en: {
    // Navigation
    sidebar: 'Sidebar',
    canvas: 'Canvas',
    properties: 'Properties',
    code: 'Code',
    
    // Components
    components: 'Components',
    button: 'Button',
    card: 'Card',
    text: 'Text',
    input: 'Input',
    image: 'Image',
    container: 'Container',
    checkbox: 'Checkbox',
    radio: 'Radio',
    table: 'Table',
    chart: 'Chart',
    spacer: 'Spacer',
    
    // Actions
    add: 'Add',
    delete: 'Delete',
    duplicate: 'Duplicate',
    copy: 'Copy',
    paste: 'Paste',
    undo: 'Undo',
    redo: 'Redo',
    save: 'Save',
    export: 'Export',
    import: 'Import',
    
    // Properties
    name: 'Name',
    type: 'Type',
    color: 'Color',
    fontSize: 'Font Size',
    fontFamily: 'Font Family',
    fontWeight: 'Font Weight',
    textAlign: 'Text Align',
    opacity: 'Opacity',
    borderRadius: 'Border Radius',
    padding: 'Padding',
    margin: 'Margin',
    shadow: 'Shadow',
    
    // Status
    locked: 'Locked',
    unlocked: 'Unlocked',
    visible: 'Visible',
    hidden: 'Hidden',
    selected: 'Selected',
    unselected: 'Unselected',
    
    // Messages
    confirmDelete: 'Are you sure you want to delete this component?',
    projectSaved: 'Project saved successfully!',
    projectLoaded: 'Project loaded successfully!',
    exportSuccess: 'Project exported successfully!',
    exportError: 'Error exporting project',
    
    // Placeholders
    enterName: 'Enter name...',
    enterText: 'Enter text...',
    enterPlaceholder: 'Enter placeholder...',
    enterTitle: 'Enter title...',
    enterDescription: 'Enter description...',
    
    // Tooltips
    dragToCanvas: 'Drag to canvas',
    clickToSelect: 'Click to select',
    doubleClickToEdit: 'Double click to edit',
    rightClickForMenu: 'Right click for menu',
    
    // App specific
    appTitle: 'Buildify',
    appSubtitle: 'Visual Interface Editor',
    ready: 'Ready',
    version: 'Buildify v1.0.0',
    developedWith: 'Developed with ❤️',
    project: 'Project',
    newProject: 'New Project',
    projectCreated: 'Project created in Buildify',
    saved: 'Saved',
    never: 'Never',
    dragComponentsToCanvas: 'Drag components to canvas',
    selectComponentToEdit: 'Select a component to edit its properties',
    selectOnlyOneComponent: 'Select only one component to edit its properties',
    clearSelection: 'Clear Selection',
    toggleSidebar: 'Toggle Sidebar',
    toggleProperties: 'Toggle Properties Panel',
    toggleCode: 'Toggle Code Panel',
    generatedCode: 'Generated Code',
    regenerateCode: 'Regenerate code',
    copyCode: 'Copy code',
    downloadCode: 'Download code',
    generatingCode: 'Generating code...',
    generatedAt: 'Generated at',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    cancel: 'Cancel',
    
    // Component descriptions
    buttonDescription: 'Clickable button with customizable styles',
    cardDescription: 'Container for content with shadow',
    textDescription: 'Simple text with formatting',
    inputDescription: 'Text input field',
    imageDescription: 'Element to display images',
    containerDescription: 'Empty container for organization',
    checkboxDescription: 'Multiple selection checkbox',
    radioDescription: 'Single selection button',
    tableDescription: 'Table for structured data',
    chartDescription: 'Data chart',
    spacerDescription: 'Element for spacing',
    
    // Property panel
    componentInfo: 'Component Information',
    position: 'Position',
    size: 'Size',
    width: 'Width',
    height: 'Height',
    x: 'X',
    y: 'Y',
    actions: 'Actions',
    lock: 'Lock',
    unlock: 'Unlock',
    hide: 'Hide',
    show: 'Show',
    duplicate: 'Duplicate',
    delete: 'Delete',
    componentProperties: 'Component Properties',
    buttonText: 'Button Text',
    buttonType: 'Button Type',
    state: 'State',
    normal: 'Normal',
    disabled: 'Disabled',
    action: 'Action (onClick)',
    backgroundColor: 'Background Color',
    borderColor: 'Border Color',
    
    // Tips
    tip: 'Tip',
    undoRedoTip: 'Use Ctrl+Z to undo and Ctrl+Y to redo',
  },
};

interface I18nContextType {
  t: (key: keyof Translations) => string;
  language: Language;
  setLanguage: (language: Language) => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

interface I18nProviderProps {
  children: React.ReactNode;
  language: Language;
}

export const I18nProvider: React.FC<I18nProviderProps> = ({ children, language }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language);
  
  const t = (key: keyof Translations) => translations[currentLanguage][key];

  const updateLanguage = (newLanguage: Language) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <I18nContext.Provider value={{ t, language: currentLanguage, setLanguage: updateLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};
