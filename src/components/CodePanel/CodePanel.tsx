import React, { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { useAppStore } from '../../stores/useAppStore';
import { CodeGenerator } from '../../services/CodeGenerator';
import { X, Download, Copy, RefreshCw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useI18n } from '../../contexts/I18nContext';

interface CodePanelProps {
  isOpen: boolean;
}

export const CodePanel: React.FC<CodePanelProps> = ({ isOpen }) => {
  const { canvas, export: exportConfig, toggleCodePanel } = useAppStore();
  const { isDark } = useTheme();
  const { t } = useI18n();
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'react' | 'vue' | 'css'>('react');

  const codeGenerator = new CodeGenerator();

  useEffect(() => {
    if (isOpen) {
      generateCode();
    }
  }, [isOpen, canvas.components, exportConfig]);

  const generateCode = async () => {
    setIsGenerating(true);
    try {
      const code = await codeGenerator.generateCode(canvas.components, {
        ...exportConfig,
        typescript: true,
        prettier: true,
      });
      setGeneratedCode(code);
    } catch (error) {
      console.error('Erro ao gerar código:', error);
      setGeneratedCode('// Erro ao gerar código');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `buildify-${activeTab}.${getFileExtension()}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getFileExtension = () => {
    switch (activeTab) {
      case 'react':
        return 'tsx';
      case 'vue':
        return 'vue';
      case 'css':
        return 'css';
      default:
        return 'txt';
    }
  };

  const getLanguage = () => {
    switch (activeTab) {
      case 'react':
        return 'typescript';
      case 'vue':
        return 'vue';
      case 'css':
        return 'css';
      default:
        return 'text';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full glass-strong border-l border-white/20 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-white/90 gradient-text">{t('generatedCode')}</h2>
          <div className="flex space-x-1">
            {['react', 'vue', 'css'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-3 py-1 text-sm rounded-md transition-colors border ${
                  activeTab === tab
                    ? 'bg-blue-500/30 text-blue-400 border-blue-400/30'
                    : 'text-white/70 border-white/20 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={generateCode}
            disabled={isGenerating}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 disabled:opacity-50 transition-colors border border-white/20 text-white/90"
            title={t('regenerateCode')}
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          </button>
          
          <button
            onClick={handleCopyCode}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white/90"
            title={t('copyCode')}
          >
            <Copy className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDownloadCode}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white/90"
            title={t('downloadCode')}
          >
            <Download className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleCodePanel}
            className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white/90"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        {isGenerating ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/5">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-white/70">{t('generatingCode')}</p>
            </div>
          </div>
        ) : (
          <Editor
            height="100%"
            language={getLanguage()}
            value={generatedCode}
            theme={isDark ? 'vs-dark' : 'vs-light'}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontSize: 14,
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              lineNumbers: 'on',
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/20 bg-white/5">
        <div className="flex items-center justify-between text-xs text-white/70">
          <div>
            {Object.keys(canvas.components).length} {t('components')} • {exportConfig.format.toUpperCase()}
          </div>
          <div>
            {t('generatedAt')} {new Date().toLocaleTimeString(isDark ? 'pt-BR' : 'en-US')}
          </div>
        </div>
      </div>
    </div>
  );
};
