// Data export utilities for dashboard visualizations

export const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Convert data to CSV format
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Handle values with commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Sheet1') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create Excel-compatible HTML table
  const headers = Object.keys(data[0]);
  const htmlTable = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel">
      <head>
        <meta charset="utf-8">
        <style>
          table { border-collapse: collapse; width: 100%; }
          th { background-color: #8B1538; color: white; font-weight: bold; padding: 8px; border: 1px solid #ddd; }
          td { padding: 8px; border: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(row => `<tr>${headers.map(h => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const blob = new Blob([htmlTable], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.xls`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (data: any[], filename: string, title: string = 'Data Export') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create PDF-ready HTML content
  const headers = Object.keys(data[0]);
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          @page { size: A4 landscape; margin: 20mm; }
          body { font-family: 'Dubai', Arial, sans-serif; margin: 0; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #8B1538; padding-bottom: 15px; }
          .header h1 { color: #8B1538; margin: 0; font-size: 24px; }
          .header p { color: #666; margin: 5px 0 0 0; font-size: 12px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
          th { background-color: #8B1538; color: white; padding: 10px 8px; text-align: left; font-weight: bold; border: 1px solid #ddd; }
          td { padding: 8px; border: 1px solid #ddd; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .footer { margin-top: 30px; text-align: center; font-size: 10px; color: #666; border-top: 1px solid #ddd; padding-top: 10px; }
          .logo { color: #8B1538; font-weight: bold; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">Dubai Economy & Tourism - BI Dashboard</div>
          <h1>${title}</h1>
          <p>Generated on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
        </div>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${data.map(row => `<tr>${headers.map(h => `<td>${row[h] ?? ''}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <div class="footer">
          <p>Dubai Department of Economy and Tourism | External Stakeholder BI Dashboard</p>
          <p>This report is confidential and intended for authorized users only.</p>
        </div>
      </body>
    </html>
  `;

  // Open print dialog with PDF-ready content
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    
    // Trigger print dialog after content loads
    printWindow.onload = () => {
      printWindow.print();
      // Close window after printing (optional)
      setTimeout(() => {
        printWindow.close();
      }, 100);
    };
  } else {
    alert('Please allow popups to export PDF');
  }
};

export const exportToJSON = (data: any[], filename: string) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportChartImage = (chartId: string, filename: string) => {
  const chartElement = document.getElementById(chartId);
  if (!chartElement) {
    alert('Chart not found');
    return;
  }

  // This would require html2canvas or similar library for actual implementation
  // For now, show a message
  alert(`Chart export feature - would export ${filename} as image`);
};

export const printDashboard = () => {
  window.print();
};

// Export type for format selection
export type ExportFormat = 'csv' | 'excel' | 'pdf' | 'json';

export const exportData = (data: any[], filename: string, format: ExportFormat, title?: string) => {
  switch (format) {
    case 'csv':
      exportToCSV(data, filename);
      break;
    case 'excel':
      exportToExcel(data, filename);
      break;
    case 'pdf':
      exportToPDF(data, filename, title || filename);
      break;
    case 'json':
      exportToJSON(data, filename);
      break;
    default:
      alert('Invalid export format');
  }
};
