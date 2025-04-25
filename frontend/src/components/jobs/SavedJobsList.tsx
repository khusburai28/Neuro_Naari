import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, MapPin, Building, Clock, ExternalLink } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';

const SavedJobsList: React.FC = () => {
  const { savedJobs, toggleBookmark } = useJobStore();
  
  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-8">
        <Bookmark size={48} className="text-secondary-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
        <p className="text-secondary-600 mb-4">
          Save jobs you're interested in to keep track of them here
        </p>
        <Link 
          to="/jobs" 
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          Browse jobs
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {savedJobs.map(job => (
        <div 
          key={job.id}
          className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                {job.logoUrl ? (
                  <img 
                    src={job.logoUrl} 
                    alt={job.company} 
                    className="w-8 h-8 rounded-md object-cover"
                  />
                ) : (
                  <Building size={24} className="text-secondary-400" />
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                <div className="flex items-center text-sm text-secondary-600 mb-2">
                  <Building size={14} className="mr-1" />
                  <span>{job.company}</span>
                  <span className="mx-2">•</span>
                  <MapPin size={14} className="mr-1" />
                  <span>{job.location}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                  {job.salary && (
                    <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                      {job.salary}
                    </span>
                  )}
                  <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                    {job.experienceLevel}
                  </span>
                </div>
                
                <div className="flex items-center text-xs text-secondary-500">
                  <Clock size={12} className="mr-1" />
                  <span>Saved on {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleBookmark(job.id)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
              >
                <Bookmark size={18} className="fill-current" />
              </button>
              <Link
                to={`/jobs?id=${job.id}`}
                className="p-2 text-secondary-600 hover:bg-secondary-50 rounded-full transition-colors"
              >
                <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedJobsList;