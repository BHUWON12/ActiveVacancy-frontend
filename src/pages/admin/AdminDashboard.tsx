import React, { useState, useEffect } from 'react';
import { Users, FileText, Download, Search, Mail, MapPin, Calendar, File, Trash2, Eye, Phone, ExternalLink, X, ChevronRight, ChevronLeft, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Application } from '../../types';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { applicationsService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import ExcelJS from 'exceljs';
import { useToast } from '../../context/ToastContext';

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
  // Mobile responsive states
  const [isTableCollapsed, setIsTableCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const { showToast } = useToast();

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
        showToast('Failed to load applications', 'error');
      }
    } catch (err: any) {
      console.error('Error fetching applications:', err);
      setError(err.response?.data?.detail || 'Failed to fetch applications');
      showToast('Failed to load applications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCV = async (cvUrl: string) => {
    try {
      // Extract original filename from URL
      const originalFilename = cvUrl.split('/').pop() || 'document';
      // Ensure filename ends with .pdf
      const filename = originalFilename.toLowerCase().endsWith('.pdf') 
        ? originalFilename 
        : `${originalFilename.split('.')[0]}.pdf`;

      // Fetch the file
      const response = await fetch(cvUrl);
      const blob = await response.blob();
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.type = 'application/pdf';
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showToast('CV downloaded successfully', 'success');
    } catch (error) {
      console.error('Error downloading CV:', error);
      showToast('Failed to download CV', 'error');
    }
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
      
      showToast('Applications exported successfully', 'success');
      setShowExportModal(false);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      setError('Failed to export applications to Excel');
      showToast('Failed to export applications', 'error');
    }
  };

  // Filtered applications based on search term - responsive helper
  const filteredApplications = applications.filter(app =>
    app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center text-sm sm:text-base">
            <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        </div>
      )}

      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        {/* Search and Stats - Mobile First */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 w-full sm:w-80 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 rounded-lg border border-gray-300"
            />
          </div>
          {/* Mobile Stats Display */}
          <div className="flex sm:hidden items-center justify-center bg-primary-50 text-primary-700 px-3 py-2 rounded-lg text-sm font-medium">
            <Users className="h-4 w-4 mr-1" />
            {filteredApplications.length} Applications
          </div>
        </div>
        
        {/* Action Buttons - Responsive */}
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
          {/* Mobile Table Toggle */}
          {isMobileView && (
            <button
              onClick={() => setIsTableCollapsed(!isTableCollapsed)}
              className="flex items-center justify-center w-full xs:w-auto bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm"
            >
              <Menu className="h-4 w-4 mr-2" />
              {isTableCollapsed ? 'Show Details' : 'Hide Details'}
            </button>
          )}
          
          <button
            onClick={() => setShowExportModal(true)}
            className="btn-primary flex items-center justify-center w-full xs:w-auto bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
          >
            <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="whitespace-nowrap">Export Excel</span>
          </button>
        </div>
      </div>

      {/* Applications List - Responsive Table/Cards */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8 sm:p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Table View */}
            <div className={`${isMobileView ? 'hidden' : 'block'} overflow-x-auto`}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Job
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-3 sm:px-6 py-4">
                        <div className="flex items-center min-w-0">
                          <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" />
                          </div>
                          <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {application.applicantName}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">
                              {application.applicantEmail}
                            </div>
                            {/* Mobile: Show job title under name */}
                            <div className="text-xs text-gray-400 truncate lg:hidden mt-1">
                              {application.jobTitle}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{application.jobTitle}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-900">{application.applicantPhone}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{application.applicantLocation}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                          <button
                            onClick={() => setSelectedApplication(application)}
                            className="text-primary-600 hover:text-primary-900 p-1 transition-colors duration-150"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                          <button
                            onClick={() => setApplicationToDelete(application)}
                            className="text-red-600 hover:text-red-900 p-1 transition-colors duration-150"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className={`${isMobileView ? 'block' : 'hidden'} divide-y divide-gray-200`}>
              {filteredApplications.map((application) => (
                <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                        <Users className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm">{application.applicantName}</div>
                        <div className="text-xs text-gray-500 truncate mt-1">{application.applicantEmail}</div>
                        {!isTableCollapsed && (
                          <>
                            <div className="text-xs text-gray-600 mt-1 truncate">{application.jobTitle}</div>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {application.applicantPhone}
                              </span>
                              <span className="flex items-center truncate">
                                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                                {application.applicantLocation}
                              </span>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(application.appliedDate).toLocaleDateString()}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-2">
                      <button
                        onClick={() => setSelectedApplication(application)}
                        className="text-primary-600 hover:text-primary-900 p-2 transition-colors duration-150"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setApplicationToDelete(application)}
                        className="text-red-600 hover:text-red-900 p-2 transition-colors duration-150"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredApplications.length === 0 && !loading && (
              <div className="text-center py-8 sm:py-12">
                <Users className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm sm:text-base">
                  {searchTerm ? 'No applications match your search.' : 'No applications found.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Application Details Modal - Responsive */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => {
                setSelectedApplication(null);
                setShowCvPreview(false);
              }}
            />
            <div className="relative bg-white rounded-xl px-4 sm:px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header - Responsive */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-white pb-2 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Application Details
                </h3>
                <button
                  onClick={() => {
                    setSelectedApplication(null);
                    setShowCvPreview(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150 p-1"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              
              {/* Modal Content - Responsive Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Application Info */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">Applicant Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                          <Users className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.applicantName}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                          <Mail className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3 break-all">{selectedApplication.applicantEmail}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                          <Phone className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.applicantPhone}</p>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                          <MapPin className="h-4 w-4 text-primary-600" />
                        </div>
                        <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.applicantLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">Job Details</h4>
                    <div className="flex items-start">
                      <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0">
                        <FileText className="h-4 w-4 text-primary-600" />
                      </div>
                      <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.jobTitle}</p>
                    </div>
                  </div>

                  {/* CV Actions - Responsive */}
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">CV</h4>
                    {selectedApplication.cvUrl ? (
                      <div className="space-y-3">
                        <button
                          onClick={() => setShowCvPreview(!showCvPreview)}
                          className="btn-outline flex items-center w-full justify-center bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg px-3 sm:px-4 py-2 transition-all duration-200 text-sm sm:text-base"
                        >
                          <Eye className="h-4 w-4 mr-2 flex-shrink-0" />
                          {showCvPreview ? 'Hide Preview' : 'Preview CV'}
                        </button>
                        <button
                          onClick={() => handleDownloadCV(selectedApplication.cvUrl)}
                          className="btn-primary flex items-center w-full justify-center bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-3 sm:px-4 py-2 transition-all duration-200 text-sm sm:text-base"
                        >
                          <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                          Download CV
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No CV uploaded</p>
                    )}
                  </div>
                </div>

                {/* CV Preview - Responsive */}
                {showCvPreview && selectedApplication.cvUrl && (
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">CV Preview</h4>
                    <div className="h-64 sm:h-96 lg:h-[600px]">
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

      {/* Delete Confirmation Modal - Responsive */}
      {applicationToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setApplicationToDelete(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-lg mx-3">
              <div className="p-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 sm:mx-0">
                    <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left flex-1">
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                      Delete Application
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this application? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center"
                    onClick={async () => {
                      try {
                        await applicationsService.delete(applicationToDelete.id);
                        setApplicationToDelete(null);
                        const updatedApplications = applications.filter(app => app.id !== applicationToDelete.id);
                        setApplications(updatedApplications);
                        onCountChange(updatedApplications.length);
                        showToast('Application deleted successfully', 'success');
                      } catch (error) {
                        console.error('Error deleting application:', error);
                        setError('Failed to delete application');
                        showToast('Failed to delete application', 'error');
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal - Responsive */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowExportModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-lg mx-3">
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100">
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-gray-900">
                    Export Applications
                  </h3>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-2xl">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4 sm:mb-6">Select Date Range</h4>
                    <div className="grid grid-cols-1 gap-4 sm:gap-6">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                          Start Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="date"
                            id="startDate"
                            value={exportDateRange.startDate}
                            onChange={(e) => setExportDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                            className="block w-full h-10 sm:h-12 pl-10 sm:pl-12 px-3 sm:px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                          End Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                          <input
                            type="date"
                            id="endDate"
                            value={exportDateRange.endDate}
                            onChange={(e) => setExportDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                            className="block w-full h-10 sm:h-12 pl-10 sm:pl-12 px-3 sm:px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    onClick={() => setShowExportModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-primary-600 rounded-xl text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center justify-center"
                    onClick={handleExportToExcel}
                  >
                    <Download className="h-4 w-4 mr-2 flex-shrink-0" />
                    Export to Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}