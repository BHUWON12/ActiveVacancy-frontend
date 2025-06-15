import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Edit2, Trash2, MapPin, DollarSign, Clock, Star, X } from 'lucide-react';
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
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
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10 w-full md:w-80 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
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
          className="btn-primary flex items-center w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Job
        </button>
      </div>

      {/* Jobs List */}
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
                    Job Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location & Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        {job.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                        {job.salary}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
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
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-primary-600 hover:text-primary-900 mr-4 transition-colors duration-150"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setJobToDelete(job)}
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

      {/* Job Modal */}
      {showJobModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowJobModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={() => setShowJobModal(false)}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-150"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
                    <Briefcase className="h-6 w-6 text-primary-600" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900">
                    {selectedJob ? 'Edit Job' : 'Add New Job'}
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                      <h4 className="text-base font-semibold text-gray-700 mb-6">Basic Information</h4>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Title
                          </label>
                          <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            className="block w-full h-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="location"
                              value={formData.location}
                              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                              className="block w-full h-12 pl-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                            Job Type
                          </label>
                          <select
                            id="type"
                            value={formData.type}
                            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                            className="block w-full h-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
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
                          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                            Salary
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="salary"
                              value={formData.salary}
                              onChange={(e) => setFormData(prev => ({ ...prev, salary: e.target.value }))}
                              className="block w-full h-12 pl-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 sm:p-8 rounded-2xl">
                      <h4 className="text-base font-semibold text-gray-700 mb-6">Job Details</h4>
                      <div className="space-y-6">
                        <div>
                          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            rows={6}
                            className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                            Requirements (one per line)
                          </label>
                          <textarea
                            id="requirements"
                            value={formData.requirements.join('\n')}
                            onChange={(e) => setFormData(prev => ({ ...prev, requirements: e.target.value.split('\n') }))}
                            rows={6}
                            className="block w-full px-4 py-3 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
                            required
                          />
                        </div>
                        <div className="flex items-center p-4 bg-white rounded-xl border-2 border-gray-200">
                          <input
                            type="checkbox"
                            id="featured"
                            checked={formData.featured}
                            onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                            className="h-5 w-5 rounded border-2 border-gray-300 text-primary-600 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                          />
                          <label htmlFor="featured" className="ml-3 block text-base font-medium text-gray-700">
                            Featured Job
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                      onClick={() => setShowJobModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-6 py-2.5 bg-primary-600 rounded-xl text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 flex items-center justify-center"
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

      {/* Delete Confirmation Modal */}
      {jobToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setJobToDelete(null)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
              <div className="p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <Trash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Delete Job
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this job? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0 space-y-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    onClick={() => setJobToDelete(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center"
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