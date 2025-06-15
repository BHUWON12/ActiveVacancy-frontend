import React, { useState, useEffect } from 'react';
import { ClipboardList, Briefcase, LogOut, Users, FileText } from 'lucide-react';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminJobs from '../../pages/admin/AdminJobs';
import { authService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs'>('applications');
  const [applicationCount, setApplicationCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('applications')}
              className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'applications'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ClipboardList className="h-5 w-5 mr-2" />
              Applications {applicationCount}
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === 'jobs'
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Jobs {jobCount}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {activeTab === 'applications' ? (
            <AdminDashboard onCountChange={setApplicationCount} />
          ) : (
            <AdminJobs onCountChange={setJobCount} />
          )}
        </div>
      </main>
    </div>
  );
} 