import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, GripVertical, Save, Eye, FileText, BarChart, Table, Type, Image as ImageIcon } from 'lucide-react';
import { ReportTemplate, ReportSection, TemplateFilter, defaultStyling } from '../types/scheduling';

interface ReportTemplateBuilderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: Omit<ReportTemplate, 'id' | 'createdAt' | 'createdBy' | 'usageCount'>) => void;
  existingTemplate?: ReportTemplate;
}

export default function ReportTemplateBuilder({ 
  isOpen, 
  onClose, 
  onSave,
  existingTemplate 
}: ReportTemplateBuilderProps) {
  const [template, setTemplate] = useState({
    name: existingTemplate?.name || '',
    description: existingTemplate?.description || '',
    type: existingTemplate?.type || 'custom' as const,
    sections: existingTemplate?.sections || [] as ReportSection[],
    filters: existingTemplate?.filters || [] as TemplateFilter[],
    styling: existingTemplate?.styling || defaultStyling,
    isPublic: existingTemplate?.isPublic ?? false,
    updatedAt: new Date().toISOString()
  });

  const [activeTab, setActiveTab] = useState<'sections' | 'filters' | 'styling'>('sections');

  const sectionTypes = [
    { value: 'chart', label: 'Chart', icon: BarChart, color: 'text-blue-600' },
    { value: 'table', label: 'Table', icon: Table, color: 'text-green-600' },
    { value: 'kpi', label: 'KPI Card', icon: FileText, color: 'text-purple-600' },
    { value: 'text', label: 'Text Block', icon: Type, color: 'text-gray-600' },
    { value: 'image', label: 'Image', icon: ImageIcon, color: 'text-orange-600' }
  ];

  const chartTypes = [
    { value: 'area', label: 'Area Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'donut', label: 'Donut Chart' }
  ];

  const dataSources = [
    { value: 'revenue', label: 'Revenue Data' },
    { value: 'visitors', label: 'Visitor Statistics' },
    { value: 'investment', label: 'Investment Data' },
    { value: 'hotel', label: 'Hotel Performance' },
    { value: 'custom', label: 'Custom Query' }
  ];

  const addSection = (type: string) => {
    const newSection: ReportSection = {
      id: `section_${Date.now()}`,
      type: type as any,
      title: `New ${type}`,
      dataSource: 'revenue',
      order: template.sections.length,
      config: {}
    };
    setTemplate(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };

  const removeSection = (id: string) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i }))
    }));
  };

  const updateSection = (id: string, updates: Partial<ReportSection>) => {
    setTemplate(prev => ({
      ...prev,
      sections: prev.sections.map(s => s.id === id ? { ...s, ...updates } : s)
    }));
  };

  const addFilter = () => {
    const newFilter: TemplateFilter = {
      field: 'dateRange',
      label: 'Date Range',
      type: 'select',
      options: ['Last Week', 'Last Month', 'Last Quarter', 'Last Year'],
      required: false
    };
    setTemplate(prev => ({
      ...prev,
      filters: [...prev.filters, newFilter]
    }));
  };

  const removeFilter = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      filters: prev.filters.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    if (!template.name.trim()) {
      alert('Please enter a template name');
      return;
    }
    onSave(template);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-det-primary to-primary-800 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Report Template Builder</h2>
                      <p className="text-sm text-white/80 mt-1">Create custom report templates</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Basic Info */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Name *
                    </label>
                    <input
                      type="text"
                      value={template.name}
                      onChange={(e) => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                      placeholder="e.g., Monthly Executive Summary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={template.description}
                      onChange={(e) => setTemplate(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                      placeholder="Brief description..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={template.isPublic}
                      onChange={(e) => setTemplate(prev => ({ ...prev, isPublic: e.target.checked }))}
                      className="w-4 h-4 text-det-primary border-gray-300 rounded focus:ring-det-primary"
                    />
                    <span className="text-sm text-gray-700">Make template public (visible to all users)</span>
                  </label>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex gap-1 px-6">
                  {(['sections', 'filters', 'styling'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                        activeTab === tab
                          ? 'border-det-primary text-det-primary'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'sections' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Report Sections</h3>
                      <div className="flex gap-2">
                        {sectionTypes.map(type => {
                          const Icon = type.icon;
                          return (
                            <button
                              key={type.value}
                              onClick={() => addSection(type.value)}
                              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                              title={`Add ${type.label}`}
                            >
                              <Icon size={16} className={type.color} />
                              <span className="hidden sm:inline">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {template.sections.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">No sections added yet</p>
                        <p className="text-sm text-gray-500">Click the buttons above to add sections to your report</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {template.sections.map((section, index) => (
                          <div key={section.id} className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                              <div className="cursor-move text-gray-400 mt-2">
                                <GripVertical size={20} />
                              </div>
                              <div className="flex-1 space-y-3">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <input
                                    type="text"
                                    value={section.title}
                                    onChange={(e) => updateSection(section.id, { title: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="Section title"
                                  />
                                  <select
                                    value={section.dataSource}
                                    onChange={(e) => updateSection(section.id, { dataSource: e.target.value })}
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                  >
                                    {dataSources.map(ds => (
                                      <option key={ds.value} value={ds.value}>{ds.label}</option>
                                    ))}
                                  </select>
                                  {section.type === 'chart' && (
                                    <select
                                      value={section.chartType}
                                      onChange={(e) => updateSection(section.id, { chartType: e.target.value as any })}
                                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    >
                                      {chartTypes.map(ct => (
                                        <option key={ct.value} value={ct.value}>{ct.label}</option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={() => removeSection(section.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'filters' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Report Filters</h3>
                      <button
                        onClick={addFilter}
                        className="flex items-center gap-2 px-4 py-2 bg-det-primary hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        <Plus size={16} />
                        Add Filter
                      </button>
                    </div>

                    {template.filters.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <p className="text-gray-600">No filters configured</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {template.filters.map((filter, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3">
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                              <input
                                type="text"
                                value={filter.label}
                                onChange={(e) => {
                                  const newFilters = [...template.filters];
                                  newFilters[index] = { ...filter, label: e.target.value };
                                  setTemplate(prev => ({ ...prev, filters: newFilters }));
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Filter label"
                              />
                              <input
                                type="text"
                                value={filter.field}
                                onChange={(e) => {
                                  const newFilters = [...template.filters];
                                  newFilters[index] = { ...filter, field: e.target.value };
                                  setTemplate(prev => ({ ...prev, filters: newFilters }));
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                placeholder="Field name"
                              />
                              <select
                                value={filter.type}
                                onChange={(e) => {
                                  const newFilters = [...template.filters];
                                  newFilters[index] = { ...filter, type: e.target.value as any };
                                  setTemplate(prev => ({ ...prev, filters: newFilters }));
                                }}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              >
                                <option value="select">Select</option>
                                <option value="date">Date</option>
                                <option value="range">Range</option>
                                <option value="multiselect">Multi-select</option>
                              </select>
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={filter.required}
                                  onChange={(e) => {
                                    const newFilters = [...template.filters];
                                    newFilters[index] = { ...filter, required: e.target.checked };
                                    setTemplate(prev => ({ ...prev, filters: newFilters }));
                                  }}
                                  className="w-4 h-4 text-det-primary border-gray-300 rounded"
                                />
                                <span className="text-sm text-gray-700">Required</span>
                              </label>
                            </div>
                            <button
                              onClick={() => removeFilter(index)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'styling' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Styling</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={template.styling.primaryColor}
                            onChange={(e) => setTemplate(prev => ({
                              ...prev,
                              styling: { ...prev.styling, primaryColor: e.target.value }
                            }))}
                            className="h-10 w-20 rounded border border-gray-300"
                          />
                          <input
                            type="text"
                            value={template.styling.primaryColor}
                            onChange={(e) => setTemplate(prev => ({
                              ...prev,
                              styling: { ...prev.styling, primaryColor: e.target.value }
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Color
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={template.styling.secondaryColor}
                            onChange={(e) => setTemplate(prev => ({
                              ...prev,
                              styling: { ...prev.styling, secondaryColor: e.target.value }
                            }))}
                            className="h-10 w-20 rounded border border-gray-300"
                          />
                          <input
                            type="text"
                            value={template.styling.secondaryColor}
                            onChange={(e) => setTemplate(prev => ({
                              ...prev,
                              styling: { ...prev.styling, secondaryColor: e.target.value }
                            }))}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Page Size
                        </label>
                        <select
                          value={template.styling.pageSize}
                          onChange={(e) => setTemplate(prev => ({
                            ...prev,
                            styling: { ...prev.styling, pageSize: e.target.value as any }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="A4">A4</option>
                          <option value="Letter">Letter</option>
                          <option value="Legal">Legal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Orientation
                        </label>
                        <select
                          value={template.styling.orientation}
                          onChange={(e) => setTemplate(prev => ({
                            ...prev,
                            styling: { ...prev.styling, orientation: e.target.value as any }
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="portrait">Portrait</option>
                          <option value="landscape">Landscape</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Footer Text
                      </label>
                      <textarea
                        value={template.styling.footerText}
                        onChange={(e) => setTemplate(prev => ({
                          ...prev,
                          styling: { ...prev.styling, footerText: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        rows={2}
                        placeholder="Footer text for reports..."
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-det-primary hover:bg-primary-800 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save size={20} />
                    <span>Save Template</span>
                  </button>
                  <button
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye size={20} />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors"
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
