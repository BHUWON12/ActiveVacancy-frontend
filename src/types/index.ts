export interface Job {
  id: string;
  title: string;
  location: string;
  type: string; // "Full-time", "Part-time", "Contract", "Remote"
  salary: string;
  description: string;
  requirements: string[];
  featured: boolean;
  postedDate: string;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantLocation: string;
  applicantPhone?: string;
  cvUrl: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  featured: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface ApplicationFormData {
  jobId: string;
  jobTitle: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  cv: File | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}