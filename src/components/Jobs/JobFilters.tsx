import React from 'react';
import { Search, MapPin, Filter } from 'lucide-react';

interface JobFiltersProps {
  locationFilter: string;
  onLocationChange: (location: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function JobFilters({
  locationFilter,
  onLocationChange,
  searchTerm,
  onSearchChange,
}: JobFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100/50 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
          <Filter className="h-5 w-5 text-primary-600" />
        </div>
        <h2 className="ml-3 text-lg font-semibold text-gray-900">Filter Jobs</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-primary-600" />
          </div>
          <input
            type="text"
            placeholder="Search job titles..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pl-10 w-full h-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
          />
        </div>

        {/* Location Filter */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <MapPin className="h-5 w-5 text-primary-600" />
          </div>
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => onLocationChange(e.target.value)}
            className="input-field pl-10 w-full h-12 px-4 rounded-xl border-2 border-gray-200 shadow-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-200 text-base transition-all duration-200"
          />
        </div>
      </div>
    </div>
  );
}