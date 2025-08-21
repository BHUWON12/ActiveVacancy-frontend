import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLayout() {
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/admin/login');
  };

  // Close sidebar if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`bg-white border-r w-64 space-y-6 px-4 py-6 absolute md:relative inset-y-0 left-0 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-primary-600 mb-4">Menu</h2>
        <ul>
          <li className="mb-2">
            <Link to="/admin/dashboard" className="block px-2 py-1 rounded hover:bg-gray-200">
              Dashboard
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/admin/jobs" className="block px-2 py-1 rounded hover:bg-gray-200">
              Jobs
            </Link>
          </li>
          <li className="mb-2 ml-4"> {/* Indent sub-item */}
            <Link to="/admin/visa-jobs" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
              Visa Jobs
            </Link>
          </li>
          <li className="mb-2 ml-4"> {/* Indent sub-item */}
            <Link to="/admin/visa-job-applications" className="block px-2 py-1 rounded hover:bg-gray-200 text-sm">
              Visa Job Applications
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <nav className="bg-white shadow-sm border-b px-3 py-2 sm:px-4 sm:py-3 flex justify-between items-center md:ml-64">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden inline-flex items-center p-2 border rounded text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-lg sm:text-xl font-bold text-primary-600">Admin Panel</h1>

          <button
            onClick={handleLogout}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 hover:text-gray-700 focus:outline-none transition"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </nav>

        {/* Page Content */}
        <main className="p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
