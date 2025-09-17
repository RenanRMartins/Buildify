import React from 'react';
import { useAppStore } from '../../stores/useAppStore';
import { useI18n } from '../../contexts/I18nContext';
import { Edit3, Calendar, Tag } from 'lucide-react';

export const ProjectInfo: React.FC = () => {
  const { project, setProjectName, setProjectDescription } = useAppStore();
  const { t } = useI18n();
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempName, setTempName] = React.useState(project.name);
  const [tempDescription, setTempDescription] = React.useState(project.description);

  const handleSave = () => {
    setProjectName(tempName);
    setProjectDescription(tempDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempName(project.name);
    setTempDescription(project.description);
    setIsEditing(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return t('never');
    return new Intl.DateTimeFormat(t('language') === 'pt' ? 'pt-BR' : 'en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{t('project')}</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <Edit3 className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t('name')}
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t('enterName')}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              {t('enterDescription')}
            </label>
            <textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
              placeholder={t('enterDescription')}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              {t('save')}
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {project.name}
            </h4>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className="flex items-center text-xs text-gray-500 space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{t('saved')}: {formatDate(project.lastSaved)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Tag className="w-3 h-3" />
              <span>v{project.version}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
