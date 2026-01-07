import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, FileText, Plus, Edit, Trash2, Play, Pause, Clock, Users, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ScheduleExportModal from '../components/ScheduleExportModal';
import ReportTemplateBuilder from '../components/ReportTemplateBuilder';
import { ScheduledExport, ReportTemplate } from '../types/scheduling';
import { exportToCSV } from '../utils/dataExport';

export default function AdminDashboard() {
  const { user, hasPermission } = useAuth();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showTemplateBuilder, setShowTemplateBuilder] = useState(false);
  const [activeTab, setActiveTab] = useState<'schedules' | 'templates'>('schedules');
  const [editingSchedule, setEditingSchedule] = useState<ScheduledExport | undefined>();
  const [editingTemplate, setEditingTemplate] = useState<ReportTemplate | undefined>();

  // Mock data - replace with actual API calls
  const [schedules, setSchedules] = useState<ScheduledExport[]>([
    {
      id: '1',
      name: 'Monthly Tourism Report',
      description: 'Comprehensive tourism analytics',
      reportType: 'tourism',
      format: 'pdf',
      frequency: 'monthly',
      scheduledTime: '09:00',
      dayOfMonth: 1,
      recipients: ['admin@dubaidet.gov.ae', 'team@dubaidet.gov.ae'],
      isActive: true,
      createdBy: 'admin@dubaidet.gov.ae',
      createdAt: '2024-01-01T00:00:00Z',
      lastRun: '2024-01-01T09:00:00Z',
      nextRun: '2024-02-01T09:00:00Z'
    },
    {
      id: '2',
      name: 'Weekly FDI Summary',
      description: 'Foreign investment weekly update',
      reportType: 'fdi',
      format: 'excel',
      frequency: 'weekly',
      scheduledTime: '08:00',
      dayOfWeek: 1,
      recipients: ['stakeholders@dubaidet.gov.ae'],
      isActive: true,
      createdBy: 'admin@dubaidet.gov.ae',
      createdAt: '2024-01-01T00:00:00Z',
      nextRun: '2024-01-08T08:00:00Z'
    }
  ]);

  const [templates, setTemplates] = useState<ReportTemplate[]>([
    {
      id: '1',
      name: 'Executive Summary',
      description: 'High-level overview for executives',
      type: 'overview',
      sections: [
        { id: 's1', type: 'kpi', title: 'Key Metrics', dataSource: 'revenue', order: 0 },
        { id: 's2', type: 'chart', title: 'Revenue Trends', dataSource: 'revenue', chartType: 'area', order: 1 },
        { id: 's3', type: 'table', title: 'Top Performers', dataSource: 'visitors', order: 2 }
      ],
      filters: [],
      styling: {
        primaryColor: '#8B1538',
        secondaryColor: '#C5A572',
        fontFamily: 'Dubai',
        footerText: 'Dubai Department of Economy and Tourism - Confidential',
        pageSize: 'A4',
        orientation: 'landscape'
      },
      isPublic: true,
      createdBy: 'admin@dubaidet.gov.ae',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      usageCount: 45
    }
  ]);

  // Check if user has admin permissions
  if (!hasPermission('canManageUsers')) {
    return <Navigate to="/" replace />;
  }

  const handleCreateSchedule = (schedule: Omit<ScheduledExport, 'id' | 'createdAt' | 'createdBy'>) => {
    const newSchedule: ScheduledExport = {
      ...schedule,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.email || 'admin'
    };
    setSchedules([...schedules, newSchedule]);
    alert('Schedule created successfully!');
  };

  const handleSaveTemplate = (template: Omit<ReportTemplate, 'id' | 'createdAt' | 'createdBy' | 'usageCount'>) => {
    const newTemplate: ReportTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      createdBy: user?.email || 'admin',
      usageCount: 0
    };
    setTemplates([...templates, newTemplate]);
    alert('Template saved successfully!');
  };

  const toggleScheduleStatus = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
  };

  const deleteSchedule = (id: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(schedules.filter(s => s.id !== id));
    }
  };

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter(t => t.id !== id));
    }
  };

  const exportSchedules = () => {
    const data = schedules.map(s => ({
      Name: s.name,
      Type: s.reportType,
      Format: s.format,
      Frequency: s.frequency,
      Time: s.scheduledTime,
      Recipients: s.recipients.join(', '),
      Status: s.isActive ? 'Active' : 'Inactive',
      'Next Run': s.nextRun || 'N/A'
    }));
    exportToCSV(data, 'scheduled_exports');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-det-primary mb-2">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage scheduled exports and report templates</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
            Admin Access
          </span>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-md border-l-4 border-det-primary"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Schedules</p>
              <p className="text-3xl font-bold text-det-primary mt-1">
                {schedules.filter(s => s.isActive).length}
              </p>
            </div>
            <Calendar className="text-det-primary" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-md border-l-4 border-det-secondary"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Report Templates</p>
              <p className="text-3xl font-bold text-det-secondary mt-1">{templates.length}</p>
            </div>
            <FileText className="text-det-secondary" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-md border-l-4 border-det-accent"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Recipients</p>
              <p className="text-3xl font-bold text-det-accent mt-1">
                {new Set(schedules.flatMap(s => s.recipients)).size}
              </p>
            </div>
            <Users className="text-det-accent" size={32} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Template Usage</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {templates.reduce((sum, t) => sum + t.usageCount, 0)}
              </p>
            </div>
            <Download className="text-green-600" size={32} />
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('schedules')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'schedules'
                  ? 'text-det-primary border-b-2 border-det-primary bg-det-primary/5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Calendar className="inline-block mr-2" size={18} />
              Scheduled Exports
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'text-det-primary border-b-2 border-det-primary bg-det-primary/5'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="inline-block mr-2" size={18} />
              Report Templates
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'schedules' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Scheduled Exports</h3>
                <div className="flex gap-2">
                  <button
                    onClick={exportSchedules}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download size={16} />
                    Export List
                  </button>
                  <button
                    onClick={() => {
                      setEditingSchedule(undefined);
                      setShowScheduleModal(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-det-primary hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus size={16} />
                    New Schedule
                  </button>
                </div>
              </div>

              {schedules.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">No scheduled exports yet</p>
                  <p className="text-sm text-gray-500">Create your first automated export schedule</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {schedules.map((schedule) => (
                    <motion.div
                      key={schedule.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{schedule.name}</h4>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              schedule.isActive 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-200 text-gray-600'
                            }`}>
                              {schedule.isActive ? 'Active' : 'Inactive'}
                            </span>
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 uppercase">
                              {schedule.format}
                            </span>
                          </div>
                          {schedule.description && (
                            <p className="text-sm text-gray-600 mb-2">{schedule.description}</p>
                          )}
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {schedule.frequency} at {schedule.scheduledTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users size={14} />
                              {schedule.recipients.length} recipient{schedule.recipients.length > 1 ? 's' : ''}
                            </span>
                            {schedule.nextRun && (
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                Next: {new Date(schedule.nextRun).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => toggleScheduleStatus(schedule.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title={schedule.isActive ? 'Pause' : 'Resume'}
                          >
                            {schedule.isActive ? (
                              <Pause size={18} className="text-orange-600" />
                            ) : (
                              <Play size={18} className="text-green-600" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              setEditingSchedule(schedule);
                              setShowScheduleModal(true);
                            }}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteSchedule(schedule.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
                <button
                  onClick={() => {
                    setEditingTemplate(undefined);
                    setShowTemplateBuilder(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-det-primary hover:bg-primary-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus size={16} />
                  New Template
                </button>
              </div>

              {templates.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">No templates created yet</p>
                  <p className="text-sm text-gray-500">Build your first custom report template</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{template.name}</h4>
                            {template.isPublic && (
                              <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
                                Public
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                            <span>{template.sections.length} sections</span>
                            <span>•</span>
                            <span>{template.filters.length} filters</span>
                            <span>•</span>
                            <span>{template.usageCount} uses</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => {
                              setEditingTemplate(template);
                              setShowTemplateBuilder(true);
                            }}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => deleteTemplate(template.id)}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} className="text-red-600" />
                          </button>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Created by {template.createdBy}</span>
                          <span>•</span>
                          <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ScheduleExportModal
        isOpen={showScheduleModal}
        onClose={() => {
          setShowScheduleModal(false);
          setEditingSchedule(undefined);
        }}
        onSchedule={handleCreateSchedule}
        existingSchedule={editingSchedule}
      />

      <ReportTemplateBuilder
        isOpen={showTemplateBuilder}
        onClose={() => {
          setShowTemplateBuilder(false);
          setEditingTemplate(undefined);
        }}
        onSave={handleSaveTemplate}
        existingTemplate={editingTemplate}
      />
    </div>
  );
}
