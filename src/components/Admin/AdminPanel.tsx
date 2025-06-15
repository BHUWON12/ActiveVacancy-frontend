import React, { useState } from 'react';
import { ClipboardList, Briefcase, LogOut, Users, FileText } from 'lucide-react';
import AdminDashboard from '../../pages/admin/AdminDashboard';
import AdminJobs from '../../pages/admin/AdminJobs';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'applications' | 'jobs'>('applications');
  const [applicationCount, setApplicationCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogout = () => {
    // Clear all stored tokens and data
    localStorage.clear();
    sessionStorage.clear();
    
    // Clear admin status in context
    dispatch({ type: 'SET_ADMIN_STATUS', payload: false });
    
    // Show success message
    showToast('Logged out successfully', 'success');
    
    // Force redirect to login page
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={() => setShowLogoutModal(true)}
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 backdrop-blur-sm"
              onClick={() => setShowLogoutModal(false)}
            />
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
              <div className="p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <LogOut className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Confirm Logout
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to logout? You will need to login again to access the admin panel.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 sm:space-y-0 space-y-3">
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
                    onClick={() => setShowLogoutModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 flex items-center justify-center"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
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