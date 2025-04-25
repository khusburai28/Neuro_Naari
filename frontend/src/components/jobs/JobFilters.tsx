import React from 'react';
import { X } from 'lucide-react';

interface JobFiltersProps {
  filters: {
    types: string[];
    locations: string[];
    skills: string[];
    experience: string[];
    industries: string[];
  };
  onToggleFilter: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  availableFilters: {
    types: string[];
    locations: string[];
    skills: string[];
    experience: string[];
    industries: string[];
  };
}

const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onToggleFilter,
  onClearFilters,
  availableFilters
}) => {
  const hasActiveFilters = Object.values(filters).some(filter => filter.length > 0);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>
      
      {/* Job Type */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-900 mb-3">Job Type</h3>
        <div className="space-y-2">
          {availableFilters.types.map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => onToggleFilter('types', type)}
                className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-secondary-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Experience Level */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-900 mb-3">Experience Level</h3>
        <div className="space-y-2">
          {availableFilters.experience.map(level => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.experience.includes(level)}
                onChange={() => onToggleFilter('experience', level)}
                className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-secondary-700">{level}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Location */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-900 mb-3">Location</h3>
        <div className="space-y-2">
          {availableFilters.locations.map(location => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.locations.includes(location)}
                onChange={() => onToggleFilter('locations', location)}
                className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-secondary-700">{location}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Industry */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-secondary-900 mb-3">Industry</h3>
        <div className="space-y-2">
          {availableFilters.industries.map(industry => (
            <label key={industry} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.industries.includes(industry)}
                onChange={() => onToggleFilter('industries', industry)}
                className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
              />
              <span className="ml-2 text-secondary-700">{industry}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Skills */}
      <div>
        <h3 className="text-sm font-medium text-secondary-900 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {availableFilters.skills.map(skill => (
            <button
              key={skill}
              onClick={() => onToggleFilter('skills', skill)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filters.skills.includes(skill)
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              {skill}
              {filters.skills.includes(skill) && (
                <X size={14} className="ml-1 inline-block" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobFilters;