import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Filter, X } from 'lucide-react';
import { useJobStore, JobListing } from '../store/jobStore';
import JobApplicationForm from '../components/jobs/JobApplicationForm';
import { toast } from 'react-toastify';

const JobsPage: React.FC = () => {
  const { 
    jobs, 
    filteredJobs, 
    searchTerm, 
    filters,
    setSearchTerm, 
    toggleFilter, 
    clearFilters,
    toggleBookmark
  } = useJobStore();
  
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  
  // Job types for filters
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote'];
  
  // Locations for filters
  const locations = Array.from(new Set(jobs.map(job => job.location)));
  
  // Skills for filters
  const allSkills = jobs.flatMap(job => job.skills);
  const uniqueSkills = Array.from(new Set(allSkills));
  
  // Set first job as selected on initial load
  useEffect(() => {
    if (filteredJobs.length > 0 && !selectedJob) {
      setSelectedJob(filteredJobs[0]);
    } else if (filteredJobs.length === 0) {
      setSelectedJob(null);
    } else if (selectedJob && !filteredJobs.find(job => job.id === selectedJob.id)) {
      setSelectedJob(filteredJobs[0]);
    }
  }, [filteredJobs, selectedJob]);
  
  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  // Handle job application
  const handleApply = () => {
    setShowApplicationForm(true);
  };

  // Handle bookmark
  const handleBookmark = (jobId: string) => {
    toggleBookmark(jobId);
    toast.success('Job saved successfully!');
  };
  
  return (
    <div className="bg-gray-50 pt-24 mt-10 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Opportunities</h1>
          
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden btn-secondary flex items-center"
            onClick={toggleMobileFilter}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs, skills, or companies"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full input-field"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={clearFilters}
                className="btn-secondary flex-shrink-0"
                disabled={!searchTerm && Object.values(filters).every(f => f.length === 0)}
              >
                <X size={18} className="mr-2" />
                Clear
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-full lg:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Job Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Job Type</h3>
                <div className="space-y-2">
                  {jobTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={() => toggleFilter('types', type)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Location Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Location</h3>
                <div className="space-y-2">
                  {locations.map(location => (
                    <label key={location} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.locations.includes(location)}
                        onChange={() => toggleFilter('locations', location)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{location}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Skills Filter */}
              <div>
                <h3 className="font-medium mb-3">Skills</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {uniqueSkills.map(skill => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.skills.includes(skill)}
                        onChange={() => toggleFilter('skills', skill)}
                        className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={toggleMobileFilter} className="text-gray-500 hover:text-gray-700">
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Job Type Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.types.includes(type)}
                            onChange={() => toggleFilter('types', type)}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Location Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="space-y-2">
                      {locations.map(location => (
                        <label key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.locations.includes(location)}
                            onChange={() => toggleFilter('locations', location)}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700">{location}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Skills Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Skills</h3>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uniqueSkills.map(skill => (
                        <label key={skill} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filters.skills.includes(skill)}
                            onChange={() => toggleFilter('skills', skill)}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-gray-700">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => {
                        clearFilters();
                        toggleMobileFilter();
                      }}
                      className="btn-secondary flex-1"
                    >
                      Clear Filters
                    </button>
                    
                    <button 
                      onClick={toggleMobileFilter}
                      className="btn-primary flex-1"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex-1 flex flex-col lg:flex-row gap-6">
            {/* Job Listings */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-card overflow-hidden h-full">
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold">{filteredJobs.length} Jobs Found</h2>
                </div>
                
                <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
                  {filteredJobs.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {filteredJobs.map(job => (
                        <div 
                          key={job.id}
                          onClick={() => setSelectedJob(job)}
                          className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedJob?.id === job.id ? 'bg-primary-50 border-l-4 border-primary-500' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              {job.logoUrl ? (
                                <img 
                                  src={job.logoUrl} 
                                  alt={job.company} 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <Briefcase size={16} className="text-gray-500" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold mb-1">{job.title}</h3>
                              <p className="text-sm text-gray-600 mb-2">{job.company}</p>
                              <div className="flex items-center text-xs text-gray-500 mb-2">
                                <MapPin size={14} className="mr-1" />
                                <span>{job.location}</span>
                                <span className="mx-2">•</span>
                                <span>{job.type}</span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {job.skills.slice(0, 2).map(skill => (
                                  <span 
                                    key={skill} 
                                    className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {job.skills.length > 2 && (
                                  <span className="text-xs text-gray-500">
                                    +{job.skills.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-500 mb-2">No jobs match your search criteria</p>
                      <button 
                        onClick={clearFilters}
                        className="text-primary-600 font-medium hover:text-primary-700"
                      >
                        Clear filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Job Details */}
            <div className="flex-1 lg:block">
              {selectedJob ? (
                <div className="bg-white rounded-lg shadow-card p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start">
                      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        {selectedJob.logoUrl ? (
                          <img 
                            src={selectedJob.logoUrl} 
                            alt={selectedJob.company} 
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <Briefcase size={24} className="text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold mb-1">{selectedJob.title}</h1>
                        <p className="text-gray-600 mb-2">{selectedJob.company}</p>
                        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase size={16} className="mr-1" />
                            <span>{selectedJob.type}</span>
                          </div>
                          {selectedJob.salary && (
                            <div>
                              <span>💰 {selectedJob.salary}</span>
                            </div>
                          )}
                          <div>
                            <span>📅 Posted on {selectedJob.postedDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-2">Required Skills</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedJob.skills.map(skill => (
                        <span 
                          key={skill} 
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                    <p className="text-gray-700">{selectedJob.description}</p>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Requirements</h2>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index} className="text-gray-700">{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Responsibilities</h2>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedJob.responsibilities.map((resp, index) => (
                        <li key={index} className="text-gray-700">{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3">Benefits</h2>
                    <ul className="list-disc list-inside space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-700">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={handleApply}
                      className="btn-primary flex-1"
                    >
                      Apply Now
                    </button>
                    <button 
                      onClick={() => handleBookmark(selectedJob.id)}
                      className={`btn-secondary flex-1 ${
                        selectedJob.isBookmarked ? 'bg-primary-50 text-primary-700' : ''
                      }`}
                    >
                      {selectedJob.isBookmarked ? 'Saved' : 'Save Job'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-card p-8 text-center h-64 flex items-center justify-center">
                  <div>
                    <p className="text-gray-500 mb-2">Select a job to view details</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && selectedJob && (
        <JobApplicationForm
          jobId={selectedJob.id}
          jobTitle={selectedJob.title}
          company={selectedJob.company}
          onClose={() => setShowApplicationForm(false)}
          onSubmit={() => {
            setShowApplicationForm(false);
            toast.success('Application submitted successfully!');
          }}
        />
      )}
    </div>
  );
};

export default JobsPage;