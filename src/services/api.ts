import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://stable-geralda-bhuwonsorg-7b46a723.koyeb.app/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login on authentication error
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminAuth');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// Auth Service
export const authService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data.data;
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminAuth', 'true');
    return user;
  },

  verifyToken: async () => {
    const response = await api.post('/auth/verify');
    return response.data.data;
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminAuth');
  },
};

// Applications Service
export const applicationsService = {
  getAll: async () => {
    const response = await api.get('/applications');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/applications/${id}`);
    return response.data.data;
  },

  create: async (data: { [key: string]: string | Blob }) => {
    const formData = new FormData();
    
    // Validate required fields
    if (!data.jobId) {
      throw new Error('Job ID is required');
    }
    
    // Log the data being sent
    console.log('Sending application data:', data);
    
    // Add jobId and jobTitle
    formData.append('job_id', data.jobId as string);
    formData.append('job_title', data.jobTitle as string);
    
    // Add other fields with proper names
    formData.append('applicant_name', data.name as string);
    formData.append('applicant_email', data.email as string);
    formData.append('applicant_phone', data.phone as string);
    formData.append('applicant_location', data.location as string);
    
    // Add CV file
    if (data.cv) {
      formData.append('cv', data.cv);
    }
    
    // Log the FormData contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    
    const response = await api.post('/applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data.data;
  },

  exportToExcel: async () => {
    const response = await api.get('/applications/export', {
      responseType: 'blob',
    });
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/applications/${id}`);
    return response.data.data;
  },
};

// Jobs Service
export const jobsService = {
  getAll: async () => {
    const response = await api.get('/jobs');
    return response.data.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data.data;
  },

  create: async (jobData: any) => {
    const response = await api.post('/jobs', jobData);
    return response.data.data;
  },

  update: async (id: string, jobData: any) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data.data;
  },
};

// Visa Jobs Service
export const visaJobsService = {
  getAll: async () => {
    const response = await api.get('/visa-jobs');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get(`/visa-jobs/${id}`);
    return response.data.data;
  },

  create: async (jobData: any) => {
    const response = await api.post('/visa-jobs', jobData);
    return response.data.data;
  },

  update: async (id: string, jobData: any) => {
    const response = await api.put(`/visa-jobs/${id}`, jobData);
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/visa-jobs/${id}`);
    return response.data.data;
  },
};

// Visa Job Applications Service
export const visaJobApplicationsService = {
  getAll: async () => {
    const response = await api.get('/visa-job-applications');
    return response.data;
  },

  create: async (applicationData: any) => {
    const response = await api.post('/visa-job-applications', applicationData);
    return response.data;
  },

  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/visa-job-applications/${id}/status`, { status });
    return response.data.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/visa-job-applications/${id}`);
    return response.data;
  },
};

export default api; 