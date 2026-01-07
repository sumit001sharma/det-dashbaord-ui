// Types for scheduled exports and report templates

export type ScheduleFrequency = 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly';
export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';
export type ReportType = 'overview' | 'tourism' | 'fdi' | 'hotel' | 'custom';

export interface ScheduledExport {
  id: string;
  name: string;
  description?: string;
  reportType: ReportType;
  format: ExportFormat;
  frequency: ScheduleFrequency;
  scheduledTime: string; // HH:MM format
  scheduledDate?: string; // For 'once' frequency
  dayOfWeek?: number; // 0-6 for weekly
  dayOfMonth?: number; // 1-31 for monthly
  recipients: string[]; // Email addresses
  filters?: {
    dateRange?: string;
    region?: string;
    category?: string;
  };
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  lastRun?: string;
  nextRun?: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  type: ReportType;
  sections: ReportSection[];
  filters: TemplateFilter[];
  styling: TemplateStyling;
  isPublic: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  usageCount: number;
}

export interface ReportSection {
  id: string;
  type: 'chart' | 'table' | 'kpi' | 'text' | 'image';
  title: string;
  dataSource: string;
  chartType?: 'area' | 'bar' | 'line' | 'pie' | 'donut';
  columns?: string[];
  order: number;
  config?: Record<string, any>;
}

export interface TemplateFilter {
  field: string;
  label: string;
  type: 'select' | 'date' | 'range' | 'multiselect';
  options?: string[];
  defaultValue?: any;
  required: boolean;
}

export interface TemplateStyling {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  headerLogo?: string;
  footerText?: string;
  pageSize: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
}

export const defaultStyling: TemplateStyling = {
  primaryColor: '#8B1538',
  secondaryColor: '#C5A572',
  fontFamily: 'Dubai',
  footerText: 'Dubai Department of Economy and Tourism - Confidential',
  pageSize: 'A4',
  orientation: 'landscape'
};
