import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, FileSpreadsheet, FileDown, Download, Check } from 'lucide-react';
import { ExportFormat } from '../utils/dataExport';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
  title: string;
  dataPreview?: string;
}

export default function ExportModal({ isOpen, onClose, onExport, title, dataPreview }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [isExporting, setIsExporting] = useState(false);

  const formats = [
    {
      type: 'csv' as ExportFormat,
      name: 'CSV',
      description: 'Comma-separated values for Excel/Sheets',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    {
      type: 'excel' as ExportFormat,
      name: 'Excel',
      description: 'Microsoft Excel format (.xls)',
      icon: FileSpreadsheet,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      type: 'pdf' as ExportFormat,
      name: 'PDF',
      description: 'Portable Document Format',
      icon: FileDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      type: 'json' as ExportFormat,
      name: 'JSON',
      description: 'JavaScript Object Notation',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onExport(selectedFormat);
    setIsExporting(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-det-primary to-primary-800 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Download size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Export Data</h2>
                      <p className="text-sm text-white/80 mt-1">{title}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-6">
                  Select your preferred export format. The data will be downloaded to your device.
                </p>

                {/* Format Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {formats.map((format) => {
                    const Icon = format.icon;
                    const isSelected = selectedFormat === format.type;
                    
                    return (
                      <motion.button
                        key={format.type}
                        onClick={() => setSelectedFormat(format.type)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`
                          relative p-4 rounded-xl border-2 transition-all text-left
                          ${isSelected 
                            ? `${format.borderColor} ${format.bgColor} shadow-md` 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${isSelected ? format.bgColor : 'bg-gray-50'}`}>
                            <Icon size={24} className={isSelected ? format.color : 'text-gray-400'} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className={`font-bold ${isSelected ? format.color : 'text-gray-900'}`}>
                                {format.name}
                              </h3>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className={`p-1 rounded-full ${format.bgColor}`}
                                >
                                  <Check size={16} className={format.color} />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{format.description}</p>
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Data Preview */}
                {dataPreview && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Data Preview</h4>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs text-gray-600 font-mono">{dataPreview}</p>
                    </div>
                  </div>
                )}

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">i</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Export Information</h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        <li>• File will include current filter selections</li>
                        <li>• Timestamp will be added to filename</li>
                        <li>• PDF exports will open in print dialog</li>
                        <li>• Excel files are compatible with Microsoft Excel and Google Sheets</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleExport}
                    disabled={isExporting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-det-primary hover:bg-primary-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isExporting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Download size={20} />
                        </motion.div>
                        <span>Exporting...</span>
                      </>
                    ) : (
                      <>
                        <Download size={20} />
                        <span>Export as {formats.find(f => f.type === selectedFormat)?.name}</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
