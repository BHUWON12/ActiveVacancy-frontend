import React, { useState, useEffect } from 'react';
import { Users, FileText, Search, Mail, MapPin, Calendar, Trash2, Eye, Phone, X, Menu } from 'lucide-react';
import { VisaJobApplication } from '../../types';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { visaJobApplicationsService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface AdminVisaJobApplicationsProps {
  onCountChange: (count: number) => void;
}

export default function AdminVisaJobApplications({ onCountChange }: AdminVisaJobApplicationsProps) {
  const [applications, setApplications] = useState<VisaJobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState<VisaJobApplication | null>(null);
  const [applicationToDelete, setApplicationToDelete] = useState<VisaJobApplication | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [expandedApplicationCards, setExpandedApplicationCards] = useState<Set<string>>(new Set());
  const { showToast } = useToast();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle application card expansion on mobile
  const toggleApplicationCard = (appId: string) => {
    const newExpanded = new Set(expandedApplicationCards);
    if (newExpanded.has(appId)) {
      newExpanded.delete(appId);
    } else {
      newExpanded.add(appId);
    }
    setExpandedApplicationCards(newExpanded);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await visaJobApplicationsService.getAll();
      
      if (Array.isArray(response)) {
        setApplications(response);
        onCountChange(response.length);
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

  const handleDelete = async () => {
  if (!applicationToDelete) return;

  try {
    const appId = applicationToDelete._id || applicationToDelete.id; // handle both cases
    await visaJobApplicationsService.delete(appId);

    // Remove deleted app from state instantly
    setApplications(prevApplications =>
      prevApplications.filter(app => (app._id || app.id) !== appId)
    );

    // Close modal
    setApplicationToDelete(null);

    // Update counter
    onCountChange(applications.length - 1);

    // Show success toast
    showToast('Application deleted successfully', 'success');
  } catch (error) {
    console.error('Error deleting application:', error);
    setError('Failed to delete application');
    showToast('Failed to delete application', 'error');
  }
};


  const filteredApplications = applications.filter(app =>
    app.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job_role.toLowerCase().includes(searchTerm.toLowerCase())
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

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
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
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8 sm:p-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            <div className={`${isMobileView ? 'hidden' : 'block'} overflow-x-auto`}>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Job Role</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Contact</th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Date</th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                            <div className="text-sm font-medium text-gray-900 truncate">{application.full_name}</div>
                            <div className="text-xs sm:text-sm text-gray-500 truncate">{application.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 hidden lg:table-cell">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{application.job_role}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 hidden md:table-cell">
                        <div className="text-sm text-gray-900">{application.contact_number}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">
                        {new Date(application.applied_date).toLocaleDateString()}
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
                            onClick={() => {
                              console.log("Deleting application with ID:", application.id);
                              setApplicationToDelete(application);
                            }}
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
            <div className="sm:hidden">
              {filteredApplications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No applications found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">{application.full_name}</h3>
                              <button
                                onClick={() => toggleApplicationCard(application.id)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <Menu 
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    expandedApplicationCards.has(application.id) ? 'rotate-180' : ''
                                  }`} 
                                />
                              </button>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <FileText className="h-3 w-3 mr-1" />
                              <span className="truncate">{application.job_role}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expandable Content */}
                      {expandedApplicationCards.has(application.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                          <div className="flex items-center text-sm text-gray-900">
                            <Mail className="h-4 w-4 text-gray-400 mr-1" />
                            {application.email}
                          </div>
                          <div className="flex items-center text-sm text-gray-900">
                            <Phone className="h-4 w-4 text-gray-400 mr-1" />
                            {application.contact_number}
                          </div>
                          <div className="flex items-center text-sm text-gray-900">
                            <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                            {application.desired_country}
                          </div>
                          <div className="flex items-center text-sm text-gray-900">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            {new Date(application.applied_date).toLocaleDateString()}
                          </div>
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => setSelectedApplication(application)}
                              className="flex items-center px-3 py-2 bg-primary-50 text-primary-600 rounded-md text-xs hover:bg-primary-100 transition-colors duration-150 flex-1 justify-center"
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </button>
                            <button
                              onClick={() => setApplicationToDelete(application)}
                              className="flex items-center px-3 py-2 bg-red-50 text-red-600 rounded-md text-xs hover:bg-red-100 transition-colors duration-150 flex-1 justify-center"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

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

      {selectedApplication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-3 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setSelectedApplication(null)}
            />
            <div className="relative bg-white rounded-xl px-4 sm:px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4 sm:mb-6 sticky top-0 bg-white pb-2 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150 p-1"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">Applicant Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><Users className="h-4 w-4 text-primary-600" /></div>
                        <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.full_name}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><Mail className="h-4 w-4 text-primary-600" /></div>
                        <p className="text-sm text-gray-900 ml-3 break-all">{selectedApplication.email}</p>
                      </div>
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><Phone className="h-4 w-4 text-primary-600" /></div>
                        <p className="text-sm text-gray-900 ml-3">{selectedApplication.contact_number}</p>
                      </div>
                      <div className="flex items-start">
                        <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><MapPin className="h-4 w-4 text-primary-600" /></div>
                        <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.desired_country}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                    <h4 className="text-sm font-medium text-gray-500 mb-3 sm:mb-4">Job Details</h4>
                    <div className="flex items-start">
                      <div className="p-2 bg-primary-50 rounded-lg flex-shrink-0"><FileText className="h-4 w-4 text-primary-600" /></div>
                      <p className="text-sm text-gray-900 ml-3 break-words">{selectedApplication.job_role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">Delete Application</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Are you sure you want to delete this application? This action cannot be undone.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center"
                    onClick={handleDelete}
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
    </div>
  );
}
