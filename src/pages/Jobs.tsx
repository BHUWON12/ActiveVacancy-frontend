import React, { useState, useMemo, useEffect } from 'react';
import { useJobs } from '../hooks/useJobs';
import JobCard from '../components/Jobs/JobCard';
import JobFilters from '../components/Jobs/JobFilters';
import ApplicationModal from '../components/Jobs/ApplicationModal';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';
import AdSenseAd from '../components/AdSense/AdSenseAd';
import { Job, ApplicationFormData } from '../types';
import { applicationsService } from '../services/api';
import { Search, MapPin, Briefcase, Clock } from 'lucide-react';

export default function Jobs() {
  const { jobs, loading, error, isInitialized } = useJobs();
  const [locationFilter, setLocationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];
    return jobs.filter(job => {
      const matchesLocation = !locationFilter || 
        job.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesSearch = !searchTerm || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesLocation && matchesSearch;
    });
  }, [jobs, locationFilter, searchTerm]);

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationModalOpen(true);
  };

  const handleApplicationSubmit = async (data: ApplicationFormData & { jobId: string }) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      await applicationsService.create(data);
      setIsApplicationModalOpen(false);
    } catch (error: any) {
      setSubmitError(error.response?.data?.detail || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading && !isInitialized) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Job
            <span className="block text-primary-600 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Start Your Journey</span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover opportunities that match your skills and aspirations
          </p>
        </div>

        {/* Job Filters */}
        <JobFilters
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
            {locationFilter && ` in ${locationFilter}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </p>
        </div>

        {/* Job Listings with AdSense Ads */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <React.Fragment key={job.id}>
              <JobCard job={job} onApply={handleApply} />
              
              {/* Insert AdSense Ad every 3 jobs */}
              {(index + 1) % 3 === 0 && index < filteredJobs.length - 1 && (
                <div key={`ad-${index}`} className="w-full">
                  <AdSenseAd 
                    slot={`jobs-listing-${index + 1}`}
                    format="horizontal"
                    className="bg-gray-50 py-4"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* No Results */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No jobs found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          isOpen={isApplicationModalOpen}
          onClose={() => setIsApplicationModalOpen(false)}
          job={selectedJob}
          onSubmit={handleApplicationSubmit}
          error={submitError}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}