import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Sparkles, TrendingUp, Building, MapPin, ExternalLink } from 'lucide-react';
import { useJobStore } from '../../store/jobStore';

const JobUpdates: React.FC = () => {
  const { getNewJobs, getRecommendedJobs } = useJobStore();
  
  const newJobs = getNewJobs();
  const recommendedJobs = getRecommendedJobs();
  
  return (
    <div className="space-y-8">
      {/* New Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <Sparkles size={20} className="text-primary-600 mr-2" />
            New Jobs
          </h2>
          <Link 
            to="/jobs?filter=new" 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-3">
          {newJobs.slice(0, 3).map(job => (
            <Link
              key={job.id}
              to={`/jobs?id=${job.id}`}
              className="block bg-white rounded-lg p-3 border border-secondary-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {job.logoUrl ? (
                    <img 
                      src={job.logoUrl} 
                      alt={job.company} 
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  ) : (
                    <Building size={20} className="text-secondary-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{job.title}</h3>
                  <div className="flex items-center text-sm text-secondary-600">
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full mr-2">
                    New
                  </span>
                  <ExternalLink size={16} className="text-secondary-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Recommended Jobs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <TrendingUp size={20} className="text-primary-600 mr-2" />
            Recommended for You
          </h2>
          <Link 
            to="/jobs?filter=recommended" 
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-3">
          {recommendedJobs.slice(0, 3).map(job => (
            <Link
              key={job.id}
              to={`/jobs?id=${job.id}`}
              className="block bg-white rounded-lg p-3 border border-secondary-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {job.logoUrl ? (
                    <img 
                      src={job.logoUrl} 
                      alt={job.company} 
                      className="w-8 h-8 rounded-md object-cover"
                    />
                  ) : (
                    <Building size={20} className="text-secondary-400" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-secondary-900">{job.title}</h3>
                  <div className="flex items-center text-sm text-secondary-600">
                    <span>{job.company}</span>
                    <span className="mx-2">•</span>
                    <MapPin size={14} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-xs bg-accent-50 text-accent-700 px-2 py-1 rounded-full mr-2">
                    Match
                  </span>
                  <ExternalLink size={16} className="text-secondary-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Job Alerts */}
      <div className="bg-primary-50 rounded-lg p-4">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <Bell size={20} className="text-primary-600" />
          </div>
          <div>
            <h3 className="font-medium text-primary-900 mb-1">
              Get Job Alerts
            </h3>
            <p className="text-sm text-primary-700 mb-3">
              Never miss a job opportunity. Set up alerts for your preferred roles and locations.
            </p>
            <button className="text-sm font-medium text-primary-700 hover:text-primary-800">
              Create Alert →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobUpdates;