import React, { useState, useEffect } from 'react';
import { Users, FileText, Download, Search, Mail, MapPin, Calendar, File, Trash2, Eye, Phone, ExternalLink, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application } from '../../types';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { applicationsService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ExcelJS from 'exceljs';

interface AdminDashboardProps {
  onCountChange: (count: number) => void;
}

export default function AdminDashboard({ onCountChange }: AdminDashboardProps) {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0
  });
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportDateRange, setExportDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showCvPreview, setShowCvPreview] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await applicationsService.getAll();
      
      if (Array.isArray(response)) {
        const formattedData = response.map(app => ({
          id: app._id,
          jobId: app.job_id,
          jobTitle: app.job_title,
          applicantName: app.applicant_name,
          applicantEmail: app.applicant_email,
          applicantLocation: app.applicant_location,
          applicantPhone: app.applicant_phone,
          cvUrl: app.cv_url,
          appliedDate: app.applied_date
        }));
        
        setApplications(formattedData);
        setStats({
          total: formattedData.length
        });
        onCountChange(formattedData.length);
      } else {
        console.error('Invalid data format received:', response);
        setError('Invalid data format received from server');
      }
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.response?.data?.detail || 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = (cvUrl: string) => {
    window.open(cvUrl, '_blank');
  };

  const getPreviewUrl = (cvUrl: string) => {
    // Handle Google Drive URLs
    if (cvUrl.includes('drive.google.com')) {
      const fileId = cvUrl.match(/[-\w]{25,}/);
      return fileId ? `https://drive.google.com/file/d/${fileId[0]}/preview` : cvUrl;
    }
    
    // Handle PDFs and other documents
    if (cvUrl.toLowerCase().endsWith('.pdf')) {
      return `${cvUrl}#view=FitH`;
    }
    
    // For other file types, use Google Docs Viewer
    return `https://docs.google.com/viewer?url=${encodeURIComponent(cvUrl)}&embedded=true`;
  };

  const handleExportToExcel = async () => {
    try {
      // Filter applications based on date range if provided
      let filteredApplications = applications;
      if (exportDateRange.startDate && exportDateRange.endDate) {
        const startDate = new Date(exportDateRange.startDate);
        const endDate = new Date(exportDateRange.endDate);
        endDate.setHours(23, 59, 59, 999); // Set to end of day

        filteredApplications = applications.filter(app => {
          const appliedDate = new Date(app.appliedDate);
          return appliedDate >= startDate && appliedDate <= endDate;
        });
      }

      // Create a new workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');

      // Define columns
      worksheet.columns = [
        { header: 'Applicant Name', key: 'applicantName', width: 20 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Location', key: 'location', width: 20 },
        { header: 'Job Title', key: 'jobTitle', width: 30 },
        { header: 'Applied Date', key: 'appliedDate', width: 15 },
        { header: 'CV URL', key: 'cvUrl', width: 50 }
      ];

      // Add rows
      filteredApplications.forEach(app => {
        worksheet.addRow({
          applicantName: app.applicantName,
          email: app.applicantEmail,
          phone: app.applicantPhone,
          location: app.applicantLocation,
          jobTitle: app.jobTitle,
          appliedDate: new Date(app.appliedDate).toLocaleDateString(),
          cvUrl: app.cvUrl
        });
      });

      // Style the header row
      worksheet.getRow(1).font = { bold: true };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE0E0E0' }
      };

      // Generate filename with date range if applicable
      let filename = 'applications';
      if (exportDateRange.startDate && exportDateRange.endDate) {
        const start = new Date(exportDateRange.startDate).toLocaleDateString().replace(/\//g, '-');
        const end = new Date(exportDateRange.endDate).toLocaleDateString().replace(/\//g, '-');
        filename += `_${start}_to_${end}`;
      }
      filename += '.xlsx';

      // Save the file
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
      
      setShowExportModal(false);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      setError('Failed to export applications to Excel');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center">
            <X className="h-5 w-5 mr-2" />
            {error}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full md:w-80 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
            />
          </div>
        </div>
        
        <button
          onClick={() => setShowExportModal(true)}
          className="btn-primary flex items-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <FileText className="h-4 w-4 mr-2" />
          Export to Excel
        </button>
      </div>

      {/* Applications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {application.applicantName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.applicantEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.jobTitle}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.applicantPhone}</div>
                      <div className="text-sm text-gray-500">{application.applicantLocation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-150"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setApplicationToDelete(application)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Details Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => {
                setSelectedApplication(null);
                setShowCvPreview(false);
              }}
            />
            <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => {
                    setSelectedApplication(null);
                    setShowCvPreview(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Application Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Applicant Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <Users className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.applicantName}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <Mail className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.applicantEmail}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <Phone className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.applicantPhone}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg">
                          <MapPin className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.applicantLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Job Details</h4>
                    <div className="flex items-center">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <FileText className="h-4 w-4 text-primary-600" />
                      </div>
                      <p className="text-sm text-gray-900 ml-3">{selectedApplication.jobTitle}</p>
                    </div>
                  </div>

                  {/* CV Actions */}
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">CV</h4>
                    {selectedApplication.cvUrl ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowCvPreview(!showCvPreview)}
                          className="btn-outline flex items-center w-full justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-4 py-2 transition-all duration-200"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {showCvPreview ? 'Hide Preview' : 'Preview CV'}
                        </button>
                        <button
                          onClick={() => handleDownloadCV(selectedApplication.cvUrl)}
                          className="btn-primary flex items-center w-full justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-4 py-2 transition-all duration-200"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download CV
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No CV uploaded</p>
                    )}
                  </div>
                </div>

                {/* CV Preview */}
                {showCvPreview && selectedApplication.cvUrl && (
                  <div className="bg-gray-50 p-6 rounded-xl h-[600px]">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">CV Preview</h4>
                    <div className="h-full">
                      <iframe
                        src={getPreviewUrl(selectedApplication.cvUrl)}
                        className="w-full h-full rounded-lg shadow-sm"
                        title="CV Preview"
                        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                        style={{ border: 'none' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {applicationToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setApplicationToDelete(null)}
            />
            <div className="inline-block align-bottom bg-white rounded-xl px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Delete Application
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this application? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
                  onClick={async () => {
                    try {
                      await applicationsService.delete(applicationToDelete.id);
                      setApplicationToDelete(null);
                      const updatedApplications = applications.filter(app => app.id !== applicationToDelete.id);
                      setApplications(updatedApplications);
                      onCountChange(updatedApplications.length);
                    } catch (error) {
                      console.error('Error deleting application:', error);
                      setError('Failed to delete application');
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200"
                  onClick={() => setApplicationToDelete(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowExportModal(false)}
            />
            <div className="inline-block w-full max-w-lg transform transition-all">
              <div className="relative bg-white rounded-2xl shadow-2xl">
                {/* Close button */}
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => setShowExportModal(false)}
                    className="text-gray-400 hover:text-gray-500 transition-colors duration-150"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                      <Download className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="ml-4 text-xl font-semibold text-gray-900">
                      Export Applications
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                      <h4 className="text-base font-semibold text-gray-700 mb-6">Select Date Range</h4>
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Start Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="date"
                              id="startDate"
                              value={exportDateRange.startDate}
                              onChange={(e) => setExportDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                              className="block w-full h-12 pl-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                            End Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="date"
                              id="endDate"
                              value={exportDateRange.endDate}
                              onChange={(e) => setExportDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                              className="block w-full h-12 pl-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                      onClick={() => setShowExportModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 rounded-xl text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center justify-center"
                      onClick={handleExportToExcel}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export to Excel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}