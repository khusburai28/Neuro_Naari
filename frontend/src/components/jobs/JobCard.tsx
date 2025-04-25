import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Bookmark, Clock, Users, ExternalLink } from 'lucide-react';
import { JobListing } from '../../store/jobStore';

interface JobCardProps {
  job: JobListing;
  onBookmark: (jobId: string) => void;
  showStats?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onBookmark, showStats = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary-200 p-4 hover:shadow-md transition-all">
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
              {job.isNew && (
                <span className="text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded-full">
                  New
                </span>
              )}
            </div>
            
            {showStats && (
              <div className="flex items-center space-x-4 text-xs text-secondary-500 mb-3">
                <div className="flex items-center">
                  <Users size={12} className="mr-1" />
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="flex items-center">
                  <Clock size={12} className="mr-1" />
                  <span>Posted {formatDate(job.postedDate)}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index}
                  className="text-xs bg-secondary-50 text-secondary-700 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 3 && (
                <span className="text-xs text-secondary-500">
                  +{job.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <button
            onClick={() => onBookmark(job.id)}
            className={`p-2 rounded-full transition-colors ${
              job.isBookmarked
                ? 'text-primary-600 bg-primary-50'
                : 'text-secondary-400 hover:bg-secondary-50'
            }`}
          >
            <Bookmark size={18} className={job.isBookmarked ? 'fill-current' : ''} />
          </button>
          
          <Link
            to={`/jobs/${job.id}`}
            className="p-2 text-secondary-400 hover:bg-secondary-50 rounded-full transition-colors"
          >
            <ExternalLink size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;