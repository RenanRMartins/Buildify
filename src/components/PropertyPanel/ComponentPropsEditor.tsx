import React from 'react';
import { CanvasComponent } from '../../types';
import { useAppStore } from '../../stores/useAppStore';

interface ComponentPropsEditorProps {
  component: CanvasComponent;
}

export const ComponentPropsEditor: React.FC<ComponentPropsEditorProps> = ({ component }) => {
  const { updateComponent } = useAppStore();

  const updateProps = (newProps: Record<string, any>) => {
    // Atualizar propriedades diretamente sem validações
    updateComponent(component.id, {
      props: {
        ...component.props,
        ...newProps
      }
    });
  };

  const renderPropsEditor = () => {
    switch (component.type) {
      case 'button':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Texto do Botão
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.props.text || ''}
                  onChange={(e) => updateProps({ text: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Texto do botão"
                />
                <button
                  onClick={() => updateProps({ text: '' })}
                  className="px-2 py-2 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Tipo do Botão
              </label>
              <select
                value={component.props.buttonType || 'button'}
                onChange={(e) => updateProps({ buttonType: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="button" className="bg-gray-800 text-white">Botão</option>
                <option value="submit" className="bg-gray-800 text-white">Enviar</option>
                <option value="reset" className="bg-gray-800 text-white">Resetar</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Estado
              </label>
              <select
                value={component.props.state || 'normal'}
                onChange={(e) => updateProps({ state: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="normal">Normal</option>
                <option value="hover">Hover</option>
                <option value="active">Ativo</option>
                <option value="disabled">Desabilitado</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.disabled || false}
                onChange={(e) => updateProps({ disabled: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Desabilitado
              </label>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Ação (onClick)
              </label>
              <input
                type="text"
                value={component.props.onClick || ''}
                onChange={(e) => updateProps({ onClick: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="handleClick()"
              />
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Título
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.props.title || ''}
                  onChange={(e) => updateProps({ title: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Título do card"
                />
                <button
                  onClick={() => updateProps({ title: '' })}
                  className="px-2 py-2 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Subtítulo
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.props.subtitle || ''}
                  onChange={(e) => updateProps({ subtitle: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Subtítulo do card"
                />
                <button
                  onClick={() => updateProps({ subtitle: '' })}
                  className="px-2 py-2 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Descrição
              </label>
              <div className="space-y-2">
                <textarea
                  value={component.props.description || ''}
                  onChange={(e) => updateProps({ description: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Descrição do card"
                  rows={3}
                />
                <button
                  onClick={() => updateProps({ description: '' })}
                  className="px-2 py-1 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕ Limpar descrição
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Link de Ação
              </label>
              <input
                type="url"
                value={component.props.actionUrl || ''}
                onChange={(e) => updateProps({ actionUrl: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="https://exemplo.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Texto do Botão
              </label>
              <input
                type="text"
                value={component.props.buttonText || ''}
                onChange={(e) => updateProps({ buttonText: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Ver mais"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.clickable || false}
                onChange={(e) => updateProps({ clickable: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Clicável
              </label>
            </div>
          </div>
        );

      case 'text':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Conteúdo do Texto
              </label>
              <div className="space-y-2">
                <textarea
                  value={component.props.text || ''}
                  onChange={(e) => updateProps({ text: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                  placeholder="Conteúdo do texto"
                  rows={3}
                />
                <button
                  onClick={() => updateProps({ text: '' })}
                  className="px-2 py-1 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕ Limpar texto
                </button>
              </div>
            </div>
          </div>
        );

      case 'input':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Placeholder
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.props.placeholder || ''}
                  onChange={(e) => updateProps({ placeholder: e.target.value })}
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Texto do placeholder"
                />
                <button
                  onClick={() => updateProps({ placeholder: '' })}
                  className="px-2 py-2 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
                  title="Limpar campo"
                >
                  ✕
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Tipo do Input
              </label>
              <select
                value={component.props.inputType || 'text'}
                onChange={(e) => updateProps({ inputType: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="text">Texto</option>
                <option value="email">Email</option>
                <option value="password">Senha</option>
                <option value="number">Número</option>
                <option value="tel">Telefone</option>
                <option value="url">URL</option>
                <option value="search">Busca</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Valor Padrão
              </label>
              <input
                type="text"
                value={component.props.defaultValue || ''}
                onChange={(e) => updateProps({ defaultValue: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Valor padrão"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Nome do Campo
              </label>
              <input
                type="text"
                value={component.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="nome_do_campo"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.required || false}
                onChange={(e) => updateProps({ required: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Obrigatório
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.disabled || false}
                onChange={(e) => updateProps({ disabled: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Desabilitado
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.readOnly || false}
                onChange={(e) => updateProps({ readOnly: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Somente Leitura
              </label>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Texto do Checkbox
              </label>
              <input
                type="text"
                value={component.props.text || ''}
                onChange={(e) => updateProps({ text: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Texto do checkbox"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.checked || false}
                onChange={(e) => updateProps({ checked: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Marcado por padrão
              </label>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Texto do Radio
              </label>
              <input
                type="text"
                value={component.props.text || ''}
                onChange={(e) => updateProps({ text: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Texto do radio"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.checked || false}
                onChange={(e) => updateProps({ checked: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Selecionado por padrão
              </label>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Título da Tabela
              </label>
              <input
                type="text"
                value={component.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Título da tabela"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Número de Colunas
              </label>
              <input
                type="number"
                value={component.props.columns || 3}
                onChange={(e) => updateProps({ columns: parseInt(e.target.value) || 3 })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                min="1"
                max="10"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Número de Linhas
              </label>
              <input
                type="number"
                value={component.props.rows || 3}
                onChange={(e) => updateProps({ rows: parseInt(e.target.value) || 3 })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                min="1"
                max="20"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Cabeçalho da Coluna 1
              </label>
              <input
                type="text"
                value={component.props.header1 || 'Coluna 1'}
                onChange={(e) => updateProps({ header1: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Nome da coluna"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Cabeçalho da Coluna 2
              </label>
              <input
                type="text"
                value={component.props.header2 || 'Coluna 2'}
                onChange={(e) => updateProps({ header2: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Nome da coluna"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Cabeçalho da Coluna 3
              </label>
              <input
                type="text"
                value={component.props.header3 || 'Coluna 3'}
                onChange={(e) => updateProps({ header3: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Nome da coluna"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.striped || false}
                onChange={(e) => updateProps({ striped: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Listras alternadas
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.bordered || true}
                onChange={(e) => updateProps({ bordered: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Com bordas
              </label>
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Título do Gráfico
              </label>
              <input
                type="text"
                value={component.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Título do gráfico"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Tipo do Gráfico
              </label>
              <select
                value={component.props.chartType || 'bar'}
                onChange={(e) => updateProps({ chartType: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="bar">Barras</option>
                <option value="line">Linha</option>
                <option value="pie">Pizza</option>
                <option value="doughnut">Rosquinha</option>
                <option value="area">Área</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Dados (JSON)
              </label>
              <textarea
                value={component.props.data || '{"labels": ["A", "B", "C", "D"], "values": [10, 20, 15, 25]}'}
                onChange={(e) => updateProps({ data: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                placeholder='{"labels": ["A", "B", "C"], "values": [10, 20, 15]}'
                rows={4}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Cor Primária
              </label>
              <input
                type="color"
                value={component.props.primaryColor || '#3b82f6'}
                onChange={(e) => updateProps({ primaryColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Cor Secundária
              </label>
              <input
                type="color"
                value={component.props.secondaryColor || '#10b981'}
                onChange={(e) => updateProps({ secondaryColor: e.target.value })}
                className="w-full h-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.showLegend || true}
                onChange={(e) => updateProps({ showLegend: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Mostrar legenda
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.showGrid || true}
                onChange={(e) => updateProps({ showGrid: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Mostrar grade
              </label>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                URL da Imagem
              </label>
              <input
                type="url"
                value={component.props.src || ''}
                onChange={(e) => updateProps({ src: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Texto Alternativo
              </label>
              <input
                type="text"
                value={component.props.alt || ''}
                onChange={(e) => updateProps({ alt: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Descrição da imagem"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Título da Imagem
              </label>
              <input
                type="text"
                value={component.props.title || ''}
                onChange={(e) => updateProps({ title: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Título da imagem"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Largura (px)
              </label>
              <input
                type="number"
                value={component.props.width || ''}
                onChange={(e) => updateProps({ width: parseInt(e.target.value) || '' })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Largura em pixels"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Altura (px)
              </label>
              <input
                type="number"
                value={component.props.height || ''}
                onChange={(e) => updateProps({ height: parseInt(e.target.value) || '' })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="Altura em pixels"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Objeto de Posição
              </label>
              <select
                value={component.props.objectFit || 'cover'}
                onChange={(e) => updateProps({ objectFit: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="cover">Cobrir</option>
                <option value="contain">Conter</option>
                <option value="fill">Preencher</option>
                <option value="scale-down">Reduzir</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.lazy || false}
                onChange={(e) => updateProps({ lazy: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Carregamento preguiçoso
              </label>
            </div>
          </div>
        );

      case 'container':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                ID do Container
              </label>
              <input
                type="text"
                value={component.props.id || ''}
                onChange={(e) => updateProps({ id: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="container-id"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Classe CSS
              </label>
              <input
                type="text"
                value={component.props.className || ''}
                onChange={(e) => updateProps({ className: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                placeholder="minha-classe"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Direção do Layout
              </label>
              <select
                value={component.props.direction || 'column'}
                onChange={(e) => updateProps({ direction: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="column">Coluna</option>
                <option value="row">Linha</option>
                <option value="column-reverse">Coluna Reversa</option>
                <option value="row-reverse">Linha Reversa</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Alinhamento
              </label>
              <select
                value={component.props.align || 'stretch'}
                onChange={(e) => updateProps({ align: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="stretch">Esticar</option>
                <option value="flex-start">Início</option>
                <option value="center">Centro</option>
                <option value="flex-end">Fim</option>
                <option value="space-between">Espaçar Entre</option>
                <option value="space-around">Espaçar Ao Redor</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.wrap || false}
                onChange={(e) => updateProps({ wrap: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Quebrar linha
              </label>
            </div>
          </div>
        );

      case 'spacer':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Altura (px)
              </label>
              <input
                type="number"
                value={component.props.height || 20}
                onChange={(e) => updateProps({ height: parseInt(e.target.value) || 20 })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                min="1"
                max="500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Largura (px)
              </label>
              <input
                type="number"
                value={component.props.width || 20}
                onChange={(e) => updateProps({ width: parseInt(e.target.value) || 20 })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
                min="1"
                max="500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/70 mb-1">
                Tipo de Espaçamento
              </label>
              <select
                value={component.props.type || 'margin'}
                onChange={(e) => updateProps({ type: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-white/50"
              >
                <option value="margin">Margem</option>
                <option value="padding">Preenchimento</option>
                <option value="both">Ambos</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={component.props.responsive || false}
                onChange={(e) => updateProps({ responsive: e.target.checked })}
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-white/90">
                Responsivo
              </label>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-gray-500">
            Nenhuma propriedade específica disponível para este tipo de componente.
          </div>
        );
    }
  };

  const clearAllProps = () => {
    if (confirm('Tem certeza que deseja limpar todas as propriedades deste componente?')) {
      updateComponent(component.id, {
        props: {}
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-white/90">
            Propriedades do Componente
          </label>
          <button
            onClick={clearAllProps}
            className="px-2 py-1 text-xs text-white/70 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors border border-white/20"
            title="Limpar todas as propriedades"
          >
            🗑️ Limpar Tudo
          </button>
        </div>
        {renderPropsEditor()}
      </div>
    </div>
  );
};
