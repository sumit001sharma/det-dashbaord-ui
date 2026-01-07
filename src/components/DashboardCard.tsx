import { motion } from 'framer-motion';
import { Trash2, Edit, Download, MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import ExportModal from './ExportModal';
import { ExportFormat, exportData } from '../utils/dataExport';

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onDelete?: () => void;
  onEdit?: () => void;
  onExport?: () => void;
  exportData?: any[];
  className?: string;
}

export default function DashboardCard({
  title,
  subtitle,
  children,
  onDelete,
  onEdit,
  onExport,
  exportData: chartData,
  className = ''
}: DashboardCardProps) {
  const { hasPermission } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const hasAnyAction = (onExport && hasPermission('canExportData')) || 
                       (onEdit && hasPermission('canEdit')) || 
                       (onDelete && hasPermission('canDelete'));

  const handleExportClick = () => {
    if (chartData && chartData.length > 0) {
      setShowExportModal(true);
    } else if (onExport) {
      onExport();
    }
  };

  const handleExportFormat = (format: ExportFormat) => {
    if (chartData && chartData.length > 0) {
      const filename = title.toLowerCase().replace(/\s+/g, '_');
      exportData(chartData, filename, format, title);
    }
  };

  const dataPreview = chartData && chartData.length > 0 
    ? `${chartData.length} rows × ${Object.keys(chartData[0]).length} columns`
    : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-det-primary truncate">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        
        {hasAnyAction && (
          <>
            {/* Desktop Actions */}
            <div className="hidden sm:flex items-center gap-2 ml-4">
              {onExport && hasPermission('canExportData') && (
                <button
                  onClick={handleExportClick}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Export Data"
                >
                  <Download size={18} className="text-gray-600 group-hover:text-det-primary" />
                </button>
              )}
              
              {onEdit && hasPermission('canEdit') && (
                <button
                  onClick={onEdit}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                  title="Edit"
                >
                  <Edit size={18} className="text-gray-600 group-hover:text-det-primary" />
                </button>
              )}
              
              {onDelete && hasPermission('canDelete') && (
                <button
                  onClick={onDelete}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                  title="Delete (Super Admin Only)"
                >
                  <Trash2 size={18} className="text-gray-600 group-hover:text-red-600" />
                </button>
              )}
            </div>

            {/* Mobile Actions Menu */}
            <div className="sm:hidden relative ml-2">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical size={18} className="text-gray-600" />
              </button>
              
              {showMobileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowMobileMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[160px] z-20">
                    {onExport && hasPermission('canExportData') && (
                      <button
                        onClick={() => {
                          handleExportClick();
                          setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                      >
                        <Download size={16} className="text-gray-600" />
                        <span className="text-sm">Export</span>
                      </button>
                    )}
                    
                    {onEdit && hasPermission('canEdit') && (
                      <button
                        onClick={() => {
                          onEdit();
                          setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left"
                      >
                        <Edit size={16} className="text-gray-600" />
                        <span className="text-sm">Edit</span>
                      </button>
                    )}
                    
                    {onDelete && hasPermission('canDelete') && (
                      <button
                        onClick={() => {
                          onDelete();
                          setShowMobileMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 text-left text-red-600"
                      >
                        <Trash2 size={16} />
                        <span className="text-sm">Delete</span>
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
      
      <div className="mt-4">
        {children}
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExportFormat}
        title={title}
        dataPreview={dataPreview}
      />
    </motion.div>
  );
}
