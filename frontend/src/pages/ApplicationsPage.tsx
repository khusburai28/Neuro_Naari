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
    <div className="bg-white rounded-lg shadow-card p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        {getStatusIcon(status)}
        <span className="ml-2">{title}</span>
        <span className="ml-2 text-sm text-secondary-500">({applications.length})</span>
      </h3>
      
      <div className="space-y-3">
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
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedApplication?.id === application.id
                ? 'border-primary-500 bg-primary-50'
                : 'border-secondary-200 hover:border-primary-300 hover:bg-secondary-50'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{application.jobTitle}</h4>
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${getStatusColor(application.status)}`}>
                {getStatusIcon(application.status)}
                <span className="ml-1 capitalize">{application.status}</span>
              </span>
            </div>
            <p className="text-sm text-secondary-600 mb-2">{application.company}</p>
            <div className="flex items-center text-xs text-secondary-500">
              <Calendar size={14} className="mr-1" />
              <span>Applied: {formatDate(application.appliedDate)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="bg-secondary-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-secondary-900 mb-2">My Applications</h1>
            <p className="text-secondary-600">
              Track and manage your job applications
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-secondary-600">
              Total Applications: {applications.length}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Application Status Columns */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
          
          {/* Application Details */}
          <div className="lg:w-96 flex-shrink-0">
            {selectedApplication ? (
              <div className="bg-white rounded-lg shadow-card p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-semibold">Application Details</h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className="p-2 text-secondary-600 hover:text-primary-600 rounded-full hover:bg-primary-50"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(selectedApplication.id)}
                      className="p-2 text-secondary-600 hover:text-red-600 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{selectedApplication.jobTitle}</h3>
                    <div className="flex items-center text-secondary-600 mt-1">
                      <Building size={16} className="mr-2" />
                      <span>{selectedApplication.company}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedApplication.status)}`}>
                      {selectedApplication.status}
                    </span>
                    <span className="text-sm text-secondary-500">
                      Last updated: {formatDate(selectedApplication.lastUpdated)}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Notes
                    </label>
                    {isEditMode ? (
                      <textarea
                        value={editedNotes}
                        onChange={(e) => setEditedNotes(e.target.value)}
                        className="input-field min-h-[100px]"
                        placeholder="Add notes about your application..."
                      />
                    ) : (
                      <p className="text-secondary-600 text-sm">
                        {selectedApplication.notes || 'No notes added'}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-1">
                      Next Steps
                    </label>
                    {isEditMode ? (
                      <input
                        type="text"
                        value={editedNextSteps}
                        onChange={(e) => setEditedNextSteps(e.target.value)}
                        className="input-field"
                        placeholder="What's the next step?"
                      />
                    ) : (
                      <p className="text-secondary-600 text-sm">
                        {selectedApplication.nextSteps || 'No next steps defined'}
                      </p>
                    )}
                  </div>
                  
                  {selectedApplication.status === 'interview' && (
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Interview Date
                      </label>
                      {isEditMode ? (
                        <input
                          type="datetime-local"
                          value={editedInterviewDate}
                          onChange={(e) => setEditedInterviewDate(e.target.value)}
                          className="input-field"
                        />
                      ) : (
                        <p className="text-secondary-600 text-sm">
                          {selectedApplication.interviewDate
                            ? new Date(selectedApplication.interviewDate).toLocaleString()
                            : 'No interview scheduled'}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {isEditMode && (
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setIsEditMode(false)}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-6 text-center">
                <div className="text-secondary-400 mb-4">
                  <FileText size={48} className="mx-auto" />
                </div>
                <p className="text-secondary-600">
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