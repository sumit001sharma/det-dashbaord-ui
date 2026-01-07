import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Mail, FileText, Plus, Trash2, Check } from 'lucide-react';
import { ScheduledExport, ScheduleFrequency, ExportFormat, ReportType } from '../types/scheduling';
import { useAuth } from '../context/AuthContext';

interface ScheduleExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (schedule: Omit<ScheduledExport, 'id' | 'createdAt' | 'createdBy'>) => void;
  existingSchedule?: ScheduledExport;
}

export default function ScheduleExportModal({ 
  isOpen, 
  onClose, 
  onSchedule,
  existingSchedule 
}: ScheduleExportModalProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: existingSchedule?.name || '',
    description: existingSchedule?.description || '',
    reportType: existingSchedule?.reportType || 'overview' as ReportType,
    format: existingSchedule?.format || 'pdf' as ExportFormat,
    frequency: existingSchedule?.frequency || 'monthly' as ScheduleFrequency,
    scheduledTime: existingSchedule?.scheduledTime || '09:00',
    scheduledDate: existingSchedule?.scheduledDate || '',
    dayOfWeek: existingSchedule?.dayOfWeek || 1,
    dayOfMonth: existingSchedule?.dayOfMonth || 1,
    recipients: existingSchedule?.recipients || [''],
    isActive: existingSchedule?.isActive ?? true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const frequencies = [
    { value: 'once', label: 'One Time', icon: '📅' },
    { value: 'daily', label: 'Daily', icon: '🔄' },
    { value: 'weekly', label: 'Weekly', icon: '📆' },
    { value: 'monthly', label: 'Monthly', icon: '📊' },
    { value: 'quarterly', label: 'Quarterly', icon: '📈' }
  ];

  const reportTypes = [
    { value: 'overview', label: 'Overview Dashboard' },
    { value: 'tourism', label: 'Tourism Analytics' },
    { value: 'fdi', label: 'FDI Report' },
    { value: 'hotel', label: 'Hotel Performance' },
    { value: 'custom', label: 'Custom Report' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF', color: 'text-red-600' },
    { value: 'excel', label: 'Excel', color: 'text-green-600' },
    { value: 'csv', label: 'CSV', color: 'text-blue-600' }
  ];

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const handleAddRecipient = () => {
    setFormData(prev => ({
      ...prev,
      recipients: [...prev.recipients, '']
    }));
  };

  const handleRemoveRecipient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.filter((_, i) => i !== index)
    }));
  };

  const handleRecipientChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      recipients: prev.recipients.map((r, i) => i === index ? value : r)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Schedule name is required';
    }

    if (formData.frequency === 'once' && !formData.scheduledDate) {
      newErrors.scheduledDate = 'Date is required for one-time schedules';
    }

    const validRecipients = formData.recipients.filter(r => r.trim());
    if (validRecipients.length === 0) {
      newErrors.recipients = 'At least one recipient is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = validRecipients.filter(r => !emailRegex.test(r));
    if (invalidEmails.length > 0) {
      newErrors.recipients = 'All recipients must be valid email addresses';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const schedule: Omit<ScheduledExport, 'id' | 'createdAt' | 'createdBy'> = {
      name: formData.name,
      description: formData.description,
      reportType: formData.reportType,
      format: formData.format,
      frequency: formData.frequency,
      scheduledTime: formData.scheduledTime,
      scheduledDate: formData.frequency === 'once' ? formData.scheduledDate : undefined,
      dayOfWeek: formData.frequency === 'weekly' ? formData.dayOfWeek : undefined,
      dayOfMonth: formData.frequency === 'monthly' ? formData.dayOfMonth : undefined,
      recipients: formData.recipients.filter(r => r.trim()),
      isActive: formData.isActive
    };

    onSchedule(schedule);
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

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full my-8"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-det-primary to-primary-800 p-6 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Schedule Export</h2>
                      <p className="text-sm text-white/80 mt-1">Automate report generation and delivery</p>
                    </div>
                  </div>
                  <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Schedule Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                        placeholder="e.g., Monthly Tourism Report"
                      />
                      {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Report Type
                      </label>
                      <select
                        value={formData.reportType}
                        onChange={(e) => setFormData(prev => ({ ...prev, reportType: e.target.value as ReportType }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                      >
                        {reportTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                      rows={2}
                      placeholder="Optional description..."
                    />
                  </div>

                  {/* Frequency Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Frequency
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {frequencies.map(freq => (
                        <button
                          key={freq.value}
                          onClick={() => setFormData(prev => ({ ...prev, frequency: freq.value as ScheduleFrequency }))}
                          className={`p-3 rounded-lg border-2 transition-all text-center ${
                            formData.frequency === freq.value
                              ? 'border-det-primary bg-det-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{freq.icon}</div>
                          <div className="text-xs font-medium">{freq.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.frequency === 'once' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date *
                        </label>
                        <input
                          type="date"
                          value={formData.scheduledDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                          min={new Date().toISOString().split('T')[0]}
                        />
                        {errors.scheduledDate && <p className="text-xs text-red-600 mt-1">{errors.scheduledDate}</p>}
                      </div>
                    )}

                    {formData.frequency === 'weekly' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Day of Week
                        </label>
                        <select
                          value={formData.dayOfWeek}
                          onChange={(e) => setFormData(prev => ({ ...prev, dayOfWeek: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                        >
                          {daysOfWeek.map((day, index) => (
                            <option key={index} value={index}>{day}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {formData.frequency === 'monthly' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Day of Month
                        </label>
                        <select
                          value={formData.dayOfMonth}
                          onChange={(e) => setFormData(prev => ({ ...prev, dayOfMonth: parseInt(e.target.value) }))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time
                      </label>
                      <input
                        type="time"
                        value={formData.scheduledTime}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduledTime: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                      />
                    </div>
                  </div>

                  {/* Export Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Export Format
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {formats.map(format => (
                        <button
                          key={format.value}
                          onClick={() => setFormData(prev => ({ ...prev, format: format.value as ExportFormat }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            formData.format === format.value
                              ? 'border-det-primary bg-det-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <FileText className={`mx-auto mb-1 ${format.color}`} size={24} />
                          <div className="text-sm font-medium">{format.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recipients */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Recipients *
                    </label>
                    <div className="space-y-2">
                      {formData.recipients.map((recipient, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1 relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                              type="email"
                              value={recipient}
                              onChange={(e) => handleRecipientChange(index, e.target.value)}
                              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-det-primary focus:border-det-primary"
                              placeholder="email@dubaidet.gov.ae"
                            />
                          </div>
                          {formData.recipients.length > 1 && (
                            <button
                              onClick={() => handleRemoveRecipient(index)}
                              className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.recipients && <p className="text-xs text-red-600 mt-1">{errors.recipients}</p>}
                    <button
                      onClick={handleAddRecipient}
                      className="mt-2 flex items-center gap-2 text-sm text-det-primary hover:text-primary-800 font-medium"
                    >
                      <Plus size={16} />
                      Add Recipient
                    </button>
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Active Schedule</h4>
                      <p className="text-sm text-gray-600">Enable or disable this scheduled export</p>
                    </div>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.isActive ? 'bg-det-primary' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-det-primary hover:bg-primary-800 text-white rounded-lg font-medium transition-colors"
                  >
                    <Check size={20} />
                    <span>{existingSchedule ? 'Update Schedule' : 'Create Schedule'}</span>
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
