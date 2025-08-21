
import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Edit2, Trash2, MapPin, DollarSign, Clock, Star, X, Menu, ChevronDown, Globe, FileText, Users, Calendar } from 'lucide-react';
import { visaJobsService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { VisaJob } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AdminVisaJobsProps {
  onCountChange: (count: number) => void;
}

export default function AdminVisaJobs({ onCountChange }: AdminVisaJobsProps) {
  const [visaJobs, setVisaJobs] = useState<VisaJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<VisaJob | null>(null);
  const [jobToDelete, setJobToDelete] = useState<VisaJob | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  // Mobile responsive states
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedJobCards, setExpandedJobCards] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    title: '',
    country: '',
    visa_type: '',
    salary: '',
    contract_duration: '',
    vacancies: 0,
    processing_time: '',
    includes: [] as string[],
    description: '',
  });
  const { showToast } = useToast();

  useEffect(() => {
    fetchVisaJobs();
  }, []);

  const fetchVisaJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await visaJobsService.getAll();
      
      if (Array.isArray(response)) {
        const formattedData = response.map((job: any) => ({ ...job, id: job._id }));
        setVisaJobs(formattedData);
        onCountChange(response.length);
      } else {
        console.error('Invalid data format received:', response);
        setError('Invalid data format received from server');
        showToast('Failed to load visa jobs', 'error');
      }
    } catch (err: any) {
      console.error('Error fetching visa jobs:', err);
      setError(err.response?.data?.detail || 'Failed to fetch visa jobs');
      showToast('Failed to load visa jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        includes: Array.isArray(formData.includes) ? formData.includes : formData.includes.toString().split(',').map(s => s.trim()),
      };
      
      if (selectedJob) {
        console.log('Selected job for update:', selectedJob);
        await visaJobsService.update(selectedJob.id, dataToSubmit);
        showToast('Visa job updated successfully', 'success');
      } else {
        await visaJobsService.create(dataToSubmit);
        showToast('Visa job created successfully', 'success');
      }
      setShowJobModal(false);
      setSelectedJob(null);
      setFormData({
        title: '',
        country: '',
        visa_type: '',
        salary: '',
        contract_duration: '',
        vacancies: 0,
        processing_time: '',
        includes: [],
        description: '',
      });
      fetchVisaJobs();
    } catch (error) {
      console.error('Error saving visa job:', error);
      setError('Failed to save visa job');
      showToast('Failed to save visa job', 'error');
    }
  };

  const handleEdit = (job: VisaJob) => {
    console.log('Editing job:', job);
    setSelectedJob(job);
    setFormData({
        title: job.title,
        country: job.country,
        visa_type: job.visa_type,
        salary: job.salary,
        contract_duration: job.contract_duration,
        vacancies: job.vacancies,
        processing_time: job.processing_time,
        includes: job.includes,
        description: job.description,
    });
    setShowJobModal(true);
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;
    try {
      await visaJobsService.delete(jobToDelete.id);
      setJobToDelete(null);
      showToast('Visa job deleted successfully', 'success');
      fetchVisaJobs();
    } catch (error) {
      console.error('Error deleting visa job:', error);
      setError('Failed to delete visa job');
      showToast('Failed to delete visa job', 'error');
    }
  };

  // Toggle job card expansion on mobile
  const toggleJobCard = (jobId: string) => {
    const newExpanded = new Set(expandedJobCards);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
    }
    setExpandedJobCards(newExpanded);
  };

  const filteredJobs = visaJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.visa_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {error && (
        <div className="mb-4 p-3 sm:p-4 bg-red-50 text-red-600 rounded-lg shadow-sm animate-fade-in">
          <div className="flex items-center text-sm sm:text-base">
            <X className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
            <span className="break-words">{error}</span>
          </div>
        </div>
      )}

      {/* Responsive Header with Mobile-First Design */}
      <div className="mb-4 sm:mb-6">
        {/* Mobile Header */}
        <div className="flex flex-col space-y-3 sm:hidden">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-gray-900">Visa Jobs ({filteredJobs.length})</h1>
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          
          {/* Collapsible Mobile Search and Add Button */}
          {showMobileFilters && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search visa jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-9 w-full h-10 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                />
              </div>
              <button
                onClick={() => {
                  setSelectedJob(null);
                  setFormData({
                    title: '',
                    country: '',
                    visaType: '',
                    salary: '',
                    contractDuration: '',
                    vacancies: 0,
                    processingTime: '',
                    includes: [],
                    description: '',
                  });
                  setShowJobModal(true);
                }}
                className="btn-primary flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Visa Job
              </button>
            </div>
          )}
        </div>

        {/* Desktop/Tablet Header */}
        <div className="hidden sm:flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search visa jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10 w-full md:w-80 h-11 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>
          
          <button
            onClick={() => {
              setSelectedJob(null);
              setFormData({
                title: '',
                country: '',
                visa_type: '',
                salary: '',
                contract_duration: '',
                vacancies: 0,
                processing_time: '',
                includes: [],
                description: '',
              });
              setShowJobModal(true);
            }}
            className="btn-primary flex items-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Visa Job
          </button>
        </div>
      </div>

      {/* Responsive Jobs Display */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="sm:hidden">
              {filteredJobs.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No visa jobs found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <Globe className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-900 truncate">{job.title}</h3>
                              <button
                                onClick={() => toggleJobCard(job.id)}
                                className="p-1 text-gray-400 hover:text-gray-600"
                              >
                                <ChevronDown 
                                  className={`h-4 w-4 transition-transform duration-200 ${
                                    expandedJobCards.has(job.id) ? 'rotate-180' : ''
                                  }`} 
                                />
                              </button>
                            </div>
                            <div className="mt-1 flex items-center text-xs text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{job.country}</span>
                              <span className="mx-2">•</span>
                              <FileText className="h-3 w-3 mr-1" />
                              <span>{job.visa_type}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Expandable Content */}
                      {expandedJobCards.has(job.id) && (
                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                          <div className="flex items-center text-sm text-gray-900">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            {job.salary}
                          </div>
                          <div className="flex space-x-2 pt-2">
                            <button
                              onClick={() => handleEdit(job)}
                              className="flex items-center px-3 py-2 bg-primary-50 text-primary-600 rounded-md text-xs hover:bg-primary-100 transition-colors duration-150 flex-1 justify-center"
                            >
                              <Edit2 className="h-3 w-3 mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => setJobToDelete(job)}
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

            {/* Tablet/Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Country & Visa Type
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vacancies
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center">
                            <Globe className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {job.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {job.country}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="h-4 w-4 text-gray-400 mr-1" />
                          {job.visaType}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          {job.salary}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <Users className="h-4 w-4 text-gray-400 mr-1" />
                          {job.vacancies}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(job)}
                          className="text-primary-600 hover:text-primary-900 mr-3 lg:mr-4 transition-colors duration-150"
                        >
                          <Edit2 className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                        <button
                          onClick={() => setJobToDelete(job)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-150"
                        >
                          <Trash2 className="h-4 w-4 lg:h-5 lg:w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Responsive Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowJobModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4 max-h-[95vh] overflow-y-auto">
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10">
                <button
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-150 p-1"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary-100">
                    <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-gray-900">
                    {selectedJob ? 'Edit Visa Job' : 'Add New Visa Job'}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  {/* Responsive Form Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {/* Basic Information Card */}
                    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4 sm:mb-6">Basic Information</h4>
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <label htmlFor="title" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Job Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Country
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="text"
                              id="country"
                              value={formData.country}
                              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                              className="block w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="visa_type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Visa Type
                          </label>
                          <input
                            type="text"
                            id="visa_type"
                            value={formData.visa_type}
                            onChange={(e) => setFormData(prev => ({ ...prev, visa_type: e.target.value }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="salary" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Salary
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="text"
                              id="salary"
                              value={formData.salary}
                              onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                              className="block w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Details Card */}
                    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-4 sm:mb-6">Job Details</h4>
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <label htmlFor="contract_duration" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Contract Duration
                          </label>
                          <input
                            type="text"
                            id="contract_duration"
                            value={formData.contract_duration}
                            onChange={(e) => setFormData(prev => ({ ...prev, contract_duration: e.target.value }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="vacancies" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Vacancies
                          </label>
                          <input
                            type="number"
                            id="vacancies"
                            value={formData.vacancies}
                            onChange={(e) => setFormData(prev => ({ ...prev, vacancies: parseInt(e.target.value, 10) }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="processing_time" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Processing Time
                          </label>
                          <input
                            type="text"
                            id="processing_time"
                            value={formData.processing_time}
                            onChange={(e) => setFormData(prev => ({ ...prev, processing_time: e.target.value }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="includes" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Includes (comma-separated)
                          </label>
                          <input
                            type="text"
                            id="includes"
                            value={Array.isArray(formData.includes) ? formData.includes.join(', ') : formData.includes}
                            onChange={(e) => setFormData(prev => ({ ...prev, includes: e.target.value.split(',').map(s => s.trim()) }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="description" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Description
                          </label>
                          <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={5}
                            className="block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200 resize-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Form Actions */}
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                      onClick={() => setShowJobModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-primary-600 rounded-lg sm:rounded-xl text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center justify-center"
                    >
                      {selectedJob ? (
                        <>
                          <Edit2 className="h-4 w-4 mr-2" />
                          Update Visa Job
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Visa Job
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setJobToDelete(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-sm sm:max-w-lg mx-2 sm:mx-4">
              <div className="p-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-red-100 sm:mx-0">
                    <Trash2 className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      Delete Visa Job
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this visa job? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 space-y-3 space-y-reverse sm:space-y-0">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-gray-300 rounded-lg sm:rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    onClick={() => setJobToDelete(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-red-600 rounded-lg sm:rounded-xl text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Visa Job
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
