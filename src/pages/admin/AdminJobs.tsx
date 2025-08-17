import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Edit2, Trash2, MapPin, DollarSign, Clock, Star, X, Menu, ChevronDown } from 'lucide-react';
import { jobsService } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import { Job } from '../../types';
import { useToast } from '../../context/ToastContext';

interface AdminJobsProps {
  onCountChange: (count: number) => void;
}

export default function AdminJobs({ onCountChange }: AdminJobsProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [showJobModal, setShowJobModal] = useState(false);
  // Mobile responsive states
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedJobCards, setExpandedJobCards] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    requirements: [] as string[],
    featured: false
  });
  const { showToast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await jobsService.getAll();
      
      if (Array.isArray(response)) {
        const formattedData = response.map(job => ({
          id: job._id,
          title: job.title,
          location: job.location,
          type: job.type,
          salary: job.salary,
          description: job.description,
          requirements: job.requirements,
          featured: job.featured,
          postedDate: job.posted_date
        }));
        
        setJobs(formattedData);
        onCountChange(formattedData.length);
      } else {
        console.error('Invalid data format received:', response);
        setError('Invalid data format received from server');
        showToast('Failed to load jobs', 'error');
      }
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      setError(err.response?.data?.detail || 'Failed to fetch jobs');
      showToast('Failed to load jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        requirements: formData.requirements.join('\n').split('\n').filter(r => r.trim())
      };
      
      if (selectedJob) {
        await jobsService.update(selectedJob.id, dataToSubmit);
        showToast('Job updated successfully', 'success');
      } else {
        await jobsService.create(dataToSubmit);
        showToast('Job created successfully', 'success');
      }
      setShowJobModal(false);
      setSelectedJob(null);
      setFormData({
        title: '',
        location: '',
        type: '',
        salary: '',
        description: '',
        requirements: [],
        featured: false
      });
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      setError('Failed to save job');
      showToast('Failed to save job', 'error');
    }
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements,
      featured: job.featured
    });
    setShowJobModal(true);
  };

  const handleDelete = async () => {
    if (!jobToDelete) return;
    try {
      await jobsService.delete(jobToDelete.id);
      setJobToDelete(null);
      showToast('Job deleted successfully', 'success');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Failed to delete job');
      showToast('Failed to delete job', 'error');
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.type.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-lg font-semibold text-gray-900">Jobs ({filteredJobs.length})</h1>
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
                  placeholder="Search jobs..."
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
                    location: '',
                    type: '',
                    salary: '',
                    description: '',
                    requirements: [],
                    featured: false
                  });
                  setShowJobModal(true);
                }}
                className="btn-primary flex items-center justify-center w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Job
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
                placeholder="Search jobs..."
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
                location: '',
                type: '',
                salary: '',
                description: '',
                requirements: [],
                featured: false
              });
              setShowJobModal(true);
            }}
            className="btn-primary flex items-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
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
                  <p>No jobs found</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredJobs.map((job) => (
                    <div key={job.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1 min-w-0">
                          <div className="h-10 w-10 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                            <Briefcase className="h-5 w-5 text-primary-600" />
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
                              <span className="truncate">{job.location}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-3 w-3 mr-1" />
                              <span>{job.type}</span>
                            </div>
                            {job.featured && (
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </span>
                              </div>
                            )}
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
                          <div className="text-sm text-gray-600">
                            Posted {new Date(job.postedDate).toLocaleDateString()}
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
                      Job Details
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location & Type
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Salary
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
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
                            <Briefcase className="h-5 w-5 text-primary-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {job.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Posted {new Date(job.postedDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                          {job.type}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                          {job.salary}
                        </div>
                      </td>
                      <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                        {job.featured ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Standard
                          </span>
                        )}
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
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                  </div>
                  <h3 className="ml-3 sm:ml-4 text-lg sm:text-xl font-semibold text-gray-900">
                    {selectedJob ? 'Edit Job' : 'Add New Job'}
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
                          <label htmlFor="location" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                            <input
                              type="text"
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                              className="block w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-3 sm:pr-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Job Type
                          </label>
                          <select
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="block w-full h-10 sm:h-12 px-3 sm:px-4 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200"
                            required
                          >
                            <option value="">Select type</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                          </select>
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
                        <div>
                          <label htmlFor="requirements" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            Requirements (one per line)
                          </label>
                          <textarea
                            id="requirements"
                            value={formData.requirements.join('\n')}
                            onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value.split('\n') }))}
                            rows={5}
                            className="block w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-sm sm:text-base transition-all duration-200 resize-none"
                            required
                          />
                        </div>
                        <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border-2 border-gray-200">
                          <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                            className="h-4 w-4 sm:h-5 sm:w-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                          />
                          <label htmlFor="featured" className="ml-2 sm:ml-3 block text-sm sm:text-base font-medium text-gray-700">
                            Featured Job
                          </label>
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
                          Update Job
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Job
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
                      Delete Job
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this job? This action cannot be undone.
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
                    Delete Job
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