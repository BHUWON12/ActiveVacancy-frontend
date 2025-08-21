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
import { Search, MapPin, Briefcase, Clock, Sparkles, TrendingUp, Users, Award } from 'lucide-react';

export default function Jobs() {
  const { jobs, loading, error, isInitialized } = useJobs();
  const [locationFilter, setLocationFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll detection for sticky effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        <div className="relative z-10 text-center">
          <div className="mb-8">
            <LoadingSpinner size="lg" />
          </div>
          <div className="text-white/80 text-lg font-medium animate-pulse">
            Discovering amazing opportunities for you...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        <div className="relative z-10 max-w-md mx-auto text-center px-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <ErrorMessage message={error} />
            <div className="mt-6">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-rose-400/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10">
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
          <div className={`sticky top-4 z-20 mb-8 transition-all duration-500 ${isScrolled ? 'transform scale-95' : ''}`}>
            <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 border border-white/30">
              <JobFilters
                locationFilter={locationFilter}
                onLocationChange={setLocationFilter}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-slate-700 font-medium">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {filteredJobs.length}
                  </span>
                  {' '}job{filteredJobs.length !== 1 ? 's' : ''} found
                  {locationFilter && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span className="text-blue-600 font-semibold">{locationFilter}</span>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 ml-2">
                      <Search className="w-4 h-4 text-purple-600" />
                      <span className="text-purple-600 font-semibold">"{searchTerm}"</span>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-8">
            {filteredJobs.map((job, index) => (
              <div 
                key={job.id}
                className="transform hover:scale-[1.02] transition-all duration-500 hover:z-10 relative"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <JobCard job={job} onApply={handleApply} />
              </div>
            ))}
          </div>

          {/* Enhanced No Results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-20">
              <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-lg mx-auto border border-white/30">
                <div className="mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto flex items-center justify-center">
                    <Search className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No Jobs Found</h3>
                <p className="text-slate-600 text-lg mb-6">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters to discover more opportunities.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setLocationFilter('');
                      setSearchTerm('');
                    }}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    Clear All Filters
                  </button>
                  <p className="text-sm text-slate-500">
                    Or try searching for popular terms like "remote", "developer", or "marketing"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Application Modal */}
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(1deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(10px) rotate(-1deg); }
          66% { transform: translateY(-5px) rotate(1deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}