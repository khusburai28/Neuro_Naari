import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

interface JobSearchProps {
  searchTerm: string;
  onSearch: (term: string) => void;
  onLocationChange?: (location: string) => void;
  onTypeChange?: (type: string) => void;
  selectedLocation?: string;
  selectedType?: string;
}

const JobSearch: React.FC<JobSearchProps> = ({
  searchTerm,
  onSearch,
  onLocationChange,
  onTypeChange,
  selectedLocation,
  selectedType
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4">
      <form className="flex flex-col md:flex-row gap-4" onSubmit={e => e.preventDefault()}>
        {/* Keyword Search */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-secondary-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search jobs by title, skills, or company"
              className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        
        {/* Location Filter */}
        {onLocationChange && (
          <div className="w-full md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={20} className="text-secondary-400" />
              </div>
              <select
                value={selectedLocation}
                onChange={(e) => onLocationChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                <option value="">All Locations</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Job Type Filter */}
        {onTypeChange && (
          <div className="w-full md:w-48">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase size={20} className="text-secondary-400" />
              </div>
              <select
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none bg-white"
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default JobSearch;