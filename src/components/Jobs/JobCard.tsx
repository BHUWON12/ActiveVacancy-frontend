import React from 'react';
import { Clock, MapPin, DollarSign } from 'lucide-react';
import { Job } from '../../types';

interface JobCardProps {
  job: Job;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, onApply }: JobCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100/50 group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-4">
            <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
              <MapPin className="h-4 w-4 mr-1 text-primary-600" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onApply(job)}
          className="btn-primary inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg shadow-primary-600/20 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-0.5"
        >
          Apply Now
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
            <Clock className="h-4 w-4 mr-2 text-primary-600" />
            <span>{job.type}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
            <DollarSign className="h-4 w-4 mr-2 text-primary-600" />
            <span>{job.salary}</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

      <div className="flex flex-wrap gap-2">
        {job.requirements.map((requirement, index) => (
          <span
            key={`${job.id}-requirement-${index}`}
            className="px-3 py-1 bg-gray-50 text-gray-700 rounded-lg text-sm hover:bg-primary-50 hover:text-primary-600 transition-colors duration-300"
          >
            {requirement}
          </span>
        ))}
      </div>
    </div>
  );
}