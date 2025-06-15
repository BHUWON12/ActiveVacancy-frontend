import { useEffect, useCallback, useState } from 'react';
import { useApp } from '../context/AppContext';
import { jobsService } from '../services/api';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Cache structure
interface JobsCache {
  data: any[];
  timestamp: number;
}

let jobsCache: JobsCache | null = null;

export function useJobs() {
  const { state, dispatch } = useApp();
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchJobs = useCallback(async (forceRefresh = false) => {
    // Check if we have valid cached data
    const now = Date.now();
    if (!forceRefresh && jobsCache && (now - jobsCache.timestamp) < CACHE_DURATION) {
      dispatch({ type: 'SET_JOBS', payload: jobsCache.data });
      return;
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const jobs = await jobsService.getAll();
      
      // Transform job data to map _id to id
      const transformedJobs = jobs.map(job => ({
        ...job,
        id: job._id,
        postedDate: job.posted_date
      }));
      
      // Update cache
      jobsCache = {
        data: transformedJobs,
        timestamp: now
      };
      
      dispatch({ type: 'SET_JOBS', payload: transformedJobs });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch jobs' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
      setIsInitialized(true);
    }
  }, [dispatch]);

  // Only fetch jobs when the component is mounted and not initialized
  useEffect(() => {
    if (!isInitialized) {
      fetchJobs();
    }
  }, [fetchJobs, isInitialized]);

  const filterJobsByLocation = useCallback((location: string) => {
    if (!location) return state.jobs;
    return state.jobs.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }, [state.jobs]);

  return {
    jobs: state.jobs,
    loading: state.loading,
    error: state.error,
    filterJobsByLocation,
    refreshJobs: () => fetchJobs(true),
    isInitialized
  };
}