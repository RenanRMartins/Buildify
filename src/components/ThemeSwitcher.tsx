import React from 'react';
import { Sun, Moon, Monitor, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const themes = [
    { key: 'light' as const, icon: Sun, label: t('light') },
    { key: 'dark' as const, icon: Moon, label: t('dark') },
    { key: 'system' as const, icon: Monitor, label: t('system') },
  ];

  const languages = [
    { key: 'pt' as const, label: 'PT', fullLabel: 'Português' },
    { key: 'en' as const, label: 'EN', fullLabel: 'English' },
  ];

  const handleLanguageToggle = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <div className="flex items-center space-x-1">
      {/* Language Switcher */}
      <div className="relative group">
        <button
          onClick={handleLanguageToggle}
          className="p-1.5 rounded-md glass-strong hover:glass-strong transition-all duration-300 group-hover:scale-105 border border-white/10"
          title={`${t('language')}: ${languages.find(l => l.key === language)?.fullLabel}`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-400" />
          <div className="absolute -top-1.5 -right-1.5 w-15 h-15 bg-blue-500 rounded-full flex items-center justify-center border border-white/20 shadow-lg">
            <span className="text-xs font-bold text-white">
              {languages.find(l => l.key === language)?.label}
            </span>
          </div>
        </button>
      </div>

      {/* Theme Switcher */}
      <div className="flex items-center space-x-0.5 p-0.5 rounded-md glass-strong border border-white/10">
        {themes.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`relative p-1.5 rounded-sm transition-all duration-300 ${
              theme === key
                ? 'bg-blue-500/30 text-blue-400 border border-blue-400/30'
                : 'text-white/70 hover:text-blue-400 hover:bg-blue-500/10'
            }`}
            title={label}
          >
            <Icon className="w-3 h-3" />
          </button>
        ))}
      </div>
    </div>
  );
};
