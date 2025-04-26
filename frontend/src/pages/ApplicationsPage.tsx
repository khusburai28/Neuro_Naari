import React, { useState } from 'react';
import { useApplicationStore, Application } from '../store/applicationStore';
import { 
  Calendar,
  Clock,
  Building,
  FileText,
  Edit2,
  Trash2,
  Plus,
  X,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  UserCheck,
  MessageSquare
} from 'lucide-react';

const ApplicationsPage: React.FC = () => {
  const { 
    applications, 
    updateApplication, 
    deleteApplication,
    getApplicationsByStatus 
  } = useApplicationStore();
  
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedNotes, setEditedNotes] = useState('');
  const [editedNextSteps, setEditedNextSteps] = useState('');
  const [editedInterviewDate, setEditedInterviewDate] = useState('');
  
  // Get applications by status
  const pendingApplications = getApplicationsByStatus('pending');
  const reviewingApplications = getApplicationsByStatus('reviewing');
  const interviewApplications = getApplicationsByStatus('interview');
  const offerApplications = getApplicationsByStatus('offer');
  const rejectedApplications = getApplicationsByStatus('rejected');
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // Get status badge color
  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'offer':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'reviewing':
        return <FileText size={16} />;
      case 'interview':
        return <UserCheck size={16} />;
      case 'offer':
        return <CheckCircle size={16} />;
      case 'rejected':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };
  
  // Handle application update
  const handleUpdate = () => {
    if (selectedApplication) {
      updateApplication(selectedApplication.id, {
        notes: editedNotes,
        nextSteps: editedNextSteps,
        interviewDate: editedInterviewDate
      });
      setIsEditMode(false);
    }
  };
  
  // Handle application deletion
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(id);
      setSelectedApplication(null);
    }
  };
  
  // Application status section
  const ApplicationStatusSection: React.FC<{
    title: string;
    applications: Application[];
    status: Application['status'];
  }> = ({ title, applications, status }) => (
    <div className="bg-white rounded-lg shadow-card p-3 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center">
        {getStatusIcon(status)}
        <span className="ml-2">{title}</span>
        <span className="ml-2 text-xs sm:text-sm text-secondary-500">({applications.length})</span>
      </h3>
      
      <div className="space-y-2 sm:space-y-3">
        {applications.map(application => (
          <div
            key={application.id}
            onClick={() => {
              setSelectedApplication(application);
              setEditedNotes(application.notes);
              setEditedNextSteps(application.nextSteps || '');
              setEditedInterviewDate(application.interviewDate || '');
              setIsEditMode(false);
            }}
            className={`p-3 sm:p-4 rounded-lg border cursor-pointer transition-all ${
              selectedApplication?.id === application.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-secondary-200 hover:border-primary-300 hover:bg-secondary-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm sm:text-base">{application.jobTitle}</h4>
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                <span className="ml-1 capitalize hidden xs:inline">{application.status}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-secondary-600 mb-1 sm:mb-2">{application.company}</p>
            <div className="flex items-center text-xs text-secondary-500">
              <Calendar size={12} className="mr-1" />
              <span className="truncate">Applied: {formatDate(application.appliedDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="bg-secondary-50 mt-8 sm:mt-10 pt-16 sm:pt-24 pb-12 sm:pb-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1 sm:mb-2">My Applications</h1>
            <p className="text-sm sm:text-base text-secondary-600">
              Track and manage your job applications
            </p>
          </div>
          <div className="mt-3 sm:mt-0 text-sm text-secondary-600">
            Total Applications: {applications.length}
          </div>
        </div>
        
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Application Status Columns - Horizontal scrolling on small screens */}
          <div className="overflow-x-auto pb-4">
            <div className="grid grid-flow-col auto-cols-85 sm:auto-cols-70 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 min-w-full w-max md:w-full">
              <ApplicationStatusSection
                title="Pending"
                applications={pendingApplications}
                status="pending"
              />
              <ApplicationStatusSection
                title="Reviewing"
                applications={reviewingApplications}
                status="reviewing"
              />
              <ApplicationStatusSection
                title="Interview"
                applications={interviewApplications}
                status="interview"
              />
              <ApplicationStatusSection
                title="Offer"
                applications={offerApplications}
                status="offer"
              />
              <ApplicationStatusSection
                title="Rejected"
                applications={rejectedApplications}
                status="rejected"
              />
            </div>
          </div>
          
          {/* Application Details */}
          <div className="w-full lg:w-96 mx-auto lg:mx-0">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-card p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-semibold">Application Details</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className="p-1.5 sm:p-2 text-secondary-600 hover:text-primary-600 rounded-full hover:bg-primary-50"
                    >
                      <Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedApplication.id)}
                      className="p-1.5 sm:p-2 text-secondary-600 hover:text-red-600 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedApplication.jobTitle}</h3>
                    <div className="flex items-center text-secondary-600 mt-1">
                      <Building size={14} className="sm:w-4 sm:h-4 mr-2" />
                      <span className="text-sm">{selectedApplication.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                    <span className="text-xs sm:text-sm text-secondary-500">
                      Last updated: {formatDate(selectedApplication.lastUpdated)}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1">
                      Notes
                    </label>
                    {isEditMode ? (
                      <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        className="input-field min-h-[80px] sm:min-h-[100px] text-sm w-full"
                        placeholder="Add notes about your application..."
                      />
                    ) : (
                      <p className="text-secondary-600 text-xs sm:text-sm">
                        {selectedApplication.notes || 'No notes added'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1">
                      Next Steps
                    </label>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedNextSteps}
                        onChange={(e) => setEditedNextSteps(e.target.value)}
                        className="input-field text-sm w-full"
                        placeholder="What's the next step?"
                      />
                    ) : (
                      <p className="text-secondary-600 text-xs sm:text-sm">
                        {selectedApplication.nextSteps || 'No next steps defined'}
                      </p>
                    )}
                  </div>
                  
                  {selectedApplication.status === 'interview' && (
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-secondary-700 mb-1">
                        Interview Date
                      </label>
                      {isEditMode ? (
                        <input
                          type="datetime-local"
                          value={editedInterviewDate}
                          onChange={(e) => setEditedInterviewDate(e.target.value)}
                          className="input-field text-sm w-full"
                        />
                      ) : (
                        <p className="text-secondary-600 text-xs sm:text-sm">
                          {selectedApplication.interviewDate
                            ? new Date(selectedApplication.interviewDate).toLocaleString()
                            : 'No interview scheduled'}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {isEditMode && (
                    <div className="flex justify-end space-x-3 pt-3 sm:pt-4">
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="btn-secondary text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="btn-primary text-xs sm:text-sm py-1.5 px-3 sm:py-2 sm:px-4"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-4 sm:p-6 text-center">
                <div className="text-secondary-400 mb-3 sm:mb-4">
                  <FileText size={36} className="sm:w-12 sm:h-12 mx-auto" />
                </div>
                <p className="text-secondary-600 text-sm">
                  Select an application to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;