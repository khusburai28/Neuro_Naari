import { create } from 'zustand';

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected';
  appliedDate: string;
  lastUpdated: string;
  notes: string;
  nextSteps?: string;
  interviewDate?: string;
  location: string;
  salary?: string;
  jobType: string;
  source: string;
  contactPerson?: string;
  contactEmail?: string;
  followUpDate?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

interface ApplicationState {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'appliedDate' | 'lastUpdated'>) => void;
  updateApplication: (id: string, updates: Partial<Application>) => void;
  deleteApplication: (id: string) => void;
  getApplicationsByStatus: (status: Application['status']) => Application[];
}

// Sample applications data
const sampleApplications: Application[] = [
  {
    id: '1',
    jobId: 'job1',
    jobTitle: 'Senior Product Manager',
    company: 'TechCorp Solutions',
    status: 'interview',
    appliedDate: '2023-06-01',
    lastUpdated: '2023-06-10',
    notes: 'Had initial screening call. Technical interview scheduled.',
    nextSteps: 'Prepare for technical interview',
    interviewDate: '2023-06-15T10:00',
    location: 'Bangalore',
    salary: '18-25 LPA',
    jobType: 'Full-time',
    source: 'LinkedIn',
    contactPerson: 'Priya Sharma',
    contactEmail: 'priya.s@techcorp.com',
    followUpDate: '2023-06-16'
  },
  {
    id: '2',
    jobId: 'job2',
    jobTitle: 'UX Designer',
    company: 'Creative Innovations',
    status: 'reviewing',
    appliedDate: '2023-06-05',
    lastUpdated: '2023-06-08',
    notes: 'Application under review. Portfolio well-received.',
    location: 'Remote',
    jobType: 'Full-time',
    source: 'Company Website',
    contactPerson: 'Rahul Mehta'
  },
  {
    id: '3',
    jobId: 'job3',
    jobTitle: 'Data Scientist',
    company: 'Analytics Nexus',
    status: 'pending',
    appliedDate: '2023-06-08',
    lastUpdated: '2023-06-08',
    notes: 'Submitted application with portfolio of projects',
    location: 'Hyderabad',
    salary: '15-20 LPA',
    jobType: 'Full-time',
    source: 'JobsForHer'
  },
  {
    id: '4',
    jobId: 'job4',
    jobTitle: 'Frontend Developer',
    company: 'WebTech Solutions',
    status: 'offer',
    appliedDate: '2023-05-15',
    lastUpdated: '2023-06-07',
    notes: 'Received offer letter. Negotiating terms.',
    nextSteps: 'Review and respond to offer',
    location: 'Pune',
    salary: '12-15 LPA',
    jobType: 'Full-time',
    source: 'Referral',
    contactPerson: 'Amit Shah',
    contactEmail: 'amit.s@webtech.com'
  },
  {
    id: '5',
    jobId: 'job5',
    jobTitle: 'Marketing Manager',
    company: 'Global Brands',
    status: 'rejected',
    appliedDate: '2023-05-20',
    lastUpdated: '2023-06-05',
    notes: 'Position filled internally. Keep in touch for future opportunities.',
    location: 'Mumbai',
    jobType: 'Full-time',
    source: 'Company Website'
  }
];

export const useApplicationStore = create<ApplicationState>((set, get) => ({
  applications: sampleApplications,
  
  addApplication: (applicationData) => {
    const newApplication: Application = {
      id: Date.now().toString(),
      ...applicationData,
      appliedDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    };
    
    set(state => ({
      applications: [...state.applications, newApplication]
    }));
  },
  
  updateApplication: (id, updates) => {
    set(state => ({
      applications: state.applications.map(app => 
        app.id === id 
          ? { 
              ...app, 
              ...updates, 
              lastUpdated: new Date().toISOString() 
            }
          : app
      )
    }));
  },
  
  deleteApplication: (id) => {
    set(state => ({
      applications: state.applications.filter(app => app.id !== id)
    }));
  },
  
  getApplicationsByStatus: (status) => {
    return get().applications.filter(app => app.status === status);
  }
}));