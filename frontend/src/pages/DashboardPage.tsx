import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BriefcaseIcon, 
  Calendar, 
  Users, 
  BookOpen, 
  FileText, 
  Bell, 
  ArrowRight, 
  MessageSquare,
  TrendingUp,
  Target,
  Award,
  CheckCircle,
  Clock,
  ChevronRight,
  Star,
  Bookmark,
  BarChart,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useChatbotStore } from '../store/chatbotStore';
import { useJobStore } from '../store/jobStore';
import SavedJobsList from '../components/jobs/SavedJobsList';
import JobUpdates from '../components/jobs/JobUpdates';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleChatbot } = useChatbotStore();
  const { getSavedJobs } = useJobStore();
  
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'learning'>('overview');
  
  // Sample data for dashboard metrics
  const metrics = {
    applications: 12,
    interviews: 3,
    savedJobs: getSavedJobs().length,
    upcomingEvents: 2,
    coursesInProgress: 3,
    mentorshipSessions: 1,
    profileViews: 45,
    profileStrength: 85,
  };
  
  // Sample upcoming events
  const upcomingEvents = [
    {
      id: '1',
      title: 'Technical Interview Preparation',
      type: 'Workshop',
      date: '2023-06-15',
      time: '10:00 AM',
      duration: '2 hours'
    },
    {
      id: '2',
      title: 'Women in Tech Leadership Panel',
      type: 'Webinar',
      date: '2023-06-18',
      time: '2:00 PM',
      duration: '1.5 hours'
    }
  ];
  
  // Sample learning progress
  const learningProgress = [
    {
      id: '1',
      title: 'Data Science Fundamentals',
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      nextModule: 'Machine Learning Basics'
    },
    {
      id: '2',
      title: 'Leadership Skills',
      progress: 40,
      totalModules: 8,
      completedModules: 3,
      nextModule: 'Team Management'
    },
    {
      id: '3',
      title: 'Digital Marketing',
      progress: 90,
      totalModules: 10,
      completedModules: 9,
      nextModule: 'Final Project'
    }
  ];
  
  return (
    <div className="bg-secondary-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 md:p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-primary-100 mb-4 md:mb-0">
                Your career dashboard shows everything you need to succeed
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => toggleChatbot()}
                className="btn bg-white text-primary-600 hover:bg-primary-50 flex items-center px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <MessageSquare size={18} className="mr-2" />
                Chat with Asha
              </button>
              <Link
                to="/profile"
                className="btn bg-primary-500 text-white hover:bg-primary-400 flex items-center px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <FileText size={20} className="text-primary-600" />
              </div>
              <span className="text-2xl font-bold text-primary-600">{metrics.applications}</span>
            </div>
            <h3 className="text-secondary-600 text-sm">Applications</h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Calendar size={20} className="text-accent-600" />
              </div>
              <span className="text-2xl font-bold text-accent-600">{metrics.interviews}</span>
            </div>
            <h3 className="text-secondary-600 text-sm">Interviews</h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Bookmark size={20} className="text-secondary-600" />
              </div>
              <span className="text-2xl font-bold text-secondary-600">{metrics.savedJobs}</span>
            </div>
            <h3 className="text-secondary-600 text-sm">Saved Jobs</h3>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-secondary-100">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Star size={20} className="text-primary-600" />
              </div>
              <span className="text-2xl font-bold text-primary-600">{metrics.profileStrength}%</span>
            </div>
            <h3 className="text-secondary-600 text-sm">Profile Strength</h3>
          </div>
        </div>
        
        {/* Main Content Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-100 overflow-hidden mb-8">
          <div className="border-b border-secondary-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-600 hover:text-primary-600'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'jobs'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-600 hover:text-primary-600'
                }`}
              >
                Job Updates
              </button>
              <button
                onClick={() => setActiveTab('learning')}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'learning'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-secondary-600 hover:text-primary-600'
                }`}
              >
                Learning Progress
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Application Status */}
                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Application Status</h2>
                    <Link 
                      to="/applications" 
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      View all
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-secondary-600">Pending</div>
                      <div className="flex-1">
                        <div className="h-2 bg-secondary-200 rounded-full">
                          <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium">4</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-secondary-600">Reviewing</div>
                      <div className="flex-1">
                        <div className="h-2 bg-secondary-200 rounded-full">
                          <div className="h-2 bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium">3</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-secondary-600">Interview</div>
                      <div className="flex-1">
                        <div className="h-2 bg-secondary-200 rounded-full">
                          <div className="h-2 bg-purple-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium">2</div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-secondary-600">Offer</div>
                      <div className="flex-1">
                        <div className="h-2 bg-secondary-200 rounded-full">
                          <div className="h-2 bg-green-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                      <div className="w-12 text-right text-sm font-medium">1</div>
                    </div>
                  </div>
                </div>
                
                {/* Upcoming Events */}
                <div className="bg-secondary-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Upcoming Events</h2>
                    <Link 
                      to="/events" 
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center"
                    >
                      View all
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium mb-1">{event.title}</h3>
                            <div className="flex items-center text-sm text-secondary-600">
                              <Calendar size={14} className="mr-1" />
                              <span>{new Date(event.date).toLocaleDateString()}</span>
                              <span className="mx-2">•</span>
                              <Clock size={14} className="mr-1" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                          <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                            {event.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'jobs' && (
              <div className="space-y-8">
                <JobUpdates />
                <div>
                  <h2 className="text-lg font-semibold mb-4">Saved Jobs</h2>
                  <SavedJobsList />
                </div>
              </div>
            )}
            
            {activeTab === 'learning' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-semibold mb-6">Courses in Progress</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {learningProgress.map(course => (
                      <div key={course.id} className="bg-white rounded-lg shadow-sm border border-secondary-100 p-4">
                        <h3 className="font-medium mb-2">{course.title}</h3>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-secondary-600 mb-1">
                            <span>{course.completedModules} of {course.totalModules} modules</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-secondary-200 rounded-full">
                            <div 
                              className="h-2 bg-primary-600 rounded-full transition-all duration-300" 
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="text-secondary-600">Next up:</p>
                          <p className="font-medium">{course.nextModule}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <Sparkles size={24} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-primary-900 mb-2">
                        Unlock Your Potential
                      </h3>
                      <p className="text-primary-700 mb-4">
                        Explore our curated learning paths and skill development programs designed for women in tech.
                      </p>
                      <Link 
                        to="/resources"
                        className="inline-flex items-center text-primary-700 font-medium hover:text-primary-800"
                      >
                        Browse courses
                        <ArrowRight size={16} className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;