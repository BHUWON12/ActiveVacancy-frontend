import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Briefcase, Building, Users, Sparkles } from 'lucide-react';
import AdSenseAd from '../components/AdSense/AdSenseAd';

const trustedCompanies = [
  {
    name: 'Google',
    logo: '/images/companies/google.png',
  },
  {
    name: 'Microsoft',
    logo: '/images/companies/microsoft.png',
  },
  {
    name: 'Amazon',
    logo: '/images/companies/amazon.png',
  },
  {
    name: 'Meta',
    logo: '/images/companies/meta.png',
  },
  {
    name: 'Apple',
    logo: '/images/companies/apple.png',
  },
  {
    name: 'Netflix',
    logo: '/images/companies/netflix.png',
  },
];

export default function Home() {
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-primary-500/5 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Find Your Dream Job
              <span className="block text-primary-600 mt-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Build Your Future</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Discover opportunities that match your skills and aspirations. Start your journey to success today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/jobs"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
              >
                Browse Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-200/70 hover:-translate-y-0.5"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Companies Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Trusted by Leading Companies</h2>
            <p className="mt-2 text-gray-600">Join thousands of professionals working at top companies</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full h-32 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 group"
              >
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-gray-700 font-medium group-hover:text-primary-600 transition-colors duration-300">{company.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Search className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Smart Job Matching</h3>
              <p className="mt-2 text-gray-500">Find jobs that match your skills and preferences</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Building className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Top Companies</h3>
              <p className="mt-2 text-gray-500">Connect with leading employers in your industry</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg transition-all duration-300 group">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Career Growth</h3>
              <p className="mt-2 text-gray-500">Access resources to advance your career</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose activevacancy?</h2>
            <p className="mt-4 text-lg text-gray-600">
              We're committed to making your job search experience better
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Sparkles className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Smart Matching</h3>
              </div>
              <p className="mt-4 text-gray-500">
                Our AI-powered platform matches you with the perfect job opportunities based on your skills and preferences.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Briefcase className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Career Resources</h3>
              </div>
              <p className="mt-4 text-gray-500">
                Access valuable resources to help you prepare for interviews and advance your career.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 group">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <Building className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">Company Insights</h3>
              </div>
              <p className="mt-4 text-gray-500">
                Get detailed information about companies, their culture, and what it's like to work there.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AdSense Section */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSenseAd
            slot="home-page-bottom"
            format="horizontal"
            className="flex justify-center"
          />
        </div>
      </div>
    </div>
  );
}
