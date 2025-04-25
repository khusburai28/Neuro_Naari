import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Remote';
  salary?: string;
  skills: string[];
  description: string;
  postedDate: string;
  logoUrl?: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  companyDescription: string;
  experienceLevel: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  industry: string[];
  applicationDeadline?: string;
  isBookmarked?: boolean;
  isNew?: boolean;
  views: number;
  applicants: number;
  lastUpdated: string;
  source: string;
}

interface JobState {
  jobs: JobListing[];
  filteredJobs: JobListing[];
  savedJobs: JobListing[];
  searchTerm: string;
  filters: {
    types: string[];
    locations: string[];
    skills: string[];
    experience: string[];
    industries: string[];
  };
  
  // Actions
  setSearchTerm: (term: string) => void;
  toggleFilter: (filterType: keyof JobState['filters'], value: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  toggleBookmark: (jobId: string) => void;
  getSavedJobs: () => JobListing[];
  getNewJobs: () => JobListing[];
  getRecommendedJobs: () => JobListing[];
  incrementJobView: (jobId: string) => void;
}

// Sample jobs data
const sampleJobs: JobListing[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechCorp Solutions',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹25-35 LPA',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'System Design'],
    description: 'Looking for an experienced software engineer to lead development of our cloud-based enterprise solutions.',
    postedDate: '2024-03-15',
    logoUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'B.Tech/M.Tech in Computer Science or related field',
      '5+ years of experience in full-stack development',
      'Strong knowledge of cloud architecture',
      'Experience with microservices'
    ],
    responsibilities: [
      'Lead development of key features',
      'Mentor junior developers',
      'Contribute to system architecture',
      'Code reviews and best practices'
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Stock options',
      'Learning budget'
    ],
    companyDescription: 'Leading enterprise software company with global presence',
    experienceLevel: 'Senior',
    industry: ['Technology', 'Enterprise Software'],
    isNew: true,
    views: 450,
    applicants: 25,
    lastUpdated: '2024-03-15',
    source: 'LinkedIn'
  },
  {
    id: '2',
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹18-25 LPA',
    skills: ['Python', 'Machine Learning', 'SQL', 'Deep Learning', 'Statistics'],
    description: 'Join our data science team to build ML models for real-world business problems.',
    postedDate: '2024-03-14',
    logoUrl: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Masters in Data Science/Statistics',
      '3+ years experience in ML',
      'Strong programming skills',
      'Experience with deep learning frameworks'
    ],
    responsibilities: [
      'Develop ML models',
      'Data analysis and visualization',
      'Model deployment and monitoring',
      'Stakeholder communication'
    ],
    benefits: [
      'Flexible work hours',
      'Health coverage',
      'Remote work options',
      'Conference budget'
    ],
    companyDescription: 'AI-driven analytics company working with Fortune 500 clients',
    experienceLevel: 'Mid',
    industry: ['Data Science', 'AI/ML'],
    views: 320,
    applicants: 18,
    lastUpdated: '2024-03-14',
    source: 'Indeed'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Creative Digital',
    location: 'Remote',
    type: 'Remote',
    salary: '₹12-18 LPA',
    skills: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Adobe XD'],
    description: 'Create beautiful and intuitive user interfaces for our digital products.',
    postedDate: '2024-03-13',
    logoUrl: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Bachelors in Design/HCI',
      '3+ years of UI/UX experience',
      'Strong portfolio',
      'Experience with design systems'
    ],
    responsibilities: [
      'User interface design',
      'Usability testing',
      'Design system maintenance',
      'Team collaboration'
    ],
    benefits: [
      'Remote work',
      'Health insurance',
      'Design tool subscriptions',
      'Learning allowance'
    ],
    companyDescription: 'Digital design agency creating exceptional user experiences',
    experienceLevel: 'Mid',
    industry: ['Design', 'Technology'],
    isNew: true,
    views: 280,
    applicants: 22,
    lastUpdated: '2024-03-13',
    source: 'Behance'
  },
  {
    id: '4',
    title: 'Product Marketing Manager',
    company: 'MarketPro',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹20-28 LPA',
    skills: ['Digital Marketing', 'Content Strategy', 'Analytics', 'Product Launch', 'SEO'],
    description: 'Lead product marketing initiatives for our B2B SaaS platform.',
    postedDate: '2024-03-12',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'MBA in Marketing',
      '5+ years in product marketing',
      'B2B SaaS experience',
      'Strong analytical skills'
    ],
    responsibilities: [
      'Product launch strategy',
      'Market research',
      'Content development',
      'Performance tracking'
    ],
    benefits: [
      'Performance bonus',
      'Health coverage',
      'Flexible hours',
      'Training budget'
    ],
    companyDescription: 'Leading B2B SaaS platform for marketing automation',
    experienceLevel: 'Senior',
    industry: ['Marketing', 'SaaS'],
    views: 245,
    applicants: 15,
    lastUpdated: '2024-03-12',
    source: 'Company Website'
  },
  {
    id: '5',
    title: 'Frontend Developer',
    company: 'WebTech Solutions',
    location: 'Pune',
    type: 'Full-time',
    salary: '₹8-12 LPA',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Redux', 'Testing'],
    description: 'Join our frontend team to build responsive web applications.',
    postedDate: '2024-03-11',
    logoUrl: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Bachelor\'s degree in CS/IT',
      '1-3 years experience',
      'Strong JavaScript skills',
      'Testing experience'
    ],
    responsibilities: [
      'Frontend development',
      'Component creation',
      'Performance optimization',
      'Bug fixing'
    ],
    benefits: [
      'Health insurance',
      'Flexible timing',
      'Learning opportunities',
      'Team events'
    ],
    companyDescription: 'Web development company specializing in modern applications',
    experienceLevel: 'Entry',
    industry: ['Technology', 'Web Development'],
    views: 380,
    applicants: 45,
    lastUpdated: '2024-03-11',
    source: 'LinkedIn'
  },
  {
    id: '6',
    title: 'HR Business Partner',
    company: 'People First',
    location: 'Delhi',
    type: 'Full-time',
    salary: '₹15-20 LPA',
    skills: ['HR Management', 'Employee Relations', 'Talent Development', 'Organization Development'],
    description: 'Strategic HR role partnering with business units to drive organizational success.',
    postedDate: '2024-03-10',
    logoUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'MBA in HR',
      '5+ years HR experience',
      'Strong communication skills',
      'Change management experience'
    ],
    responsibilities: [
      'HR strategy development',
      'Employee engagement',
      'Performance management',
      'Talent development'
    ],
    benefits: [
      'Medical insurance',
      'Professional development',
      'Work-life balance',
      'Performance bonus'
    ],
    companyDescription: 'HR consulting firm focused on organizational development',
    experienceLevel: 'Senior',
    industry: ['Human Resources', 'Consulting'],
    views: 190,
    applicants: 12,
    lastUpdated: '2024-03-10',
    source: 'Naukri'
  },
  {
    id: '7',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹18-25 LPA',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    description: 'Build and maintain our cloud infrastructure and deployment pipelines.',
    postedDate: '2024-03-09',
    logoUrl: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'B.Tech in CS/IT',
      '3+ years DevOps experience',
      'Strong cloud platform knowledge',
      'Automation experience'
    ],
    responsibilities: [
      'Infrastructure management',
      'Pipeline automation',
      'Security implementation',
      'Performance optimization'
    ],
    benefits: [
      'Competitive salary',
      'Health benefits',
      'Remote work options',
      'Learning allowance'
    ],
    companyDescription: 'Cloud solutions provider for enterprise clients',
    experienceLevel: 'Mid',
    industry: ['Technology', 'Cloud Computing'],
    views: 275,
    applicants: 20,
    lastUpdated: '2024-03-09',
    source: 'LinkedIn'
  },
  {
    id: '8',
    title: 'Content Writer',
    company: 'Digital Content Co',
    location: 'Remote',
    type: 'Part-time',
    salary: '₹6-8 LPA',
    skills: ['Content Writing', 'SEO', 'Research', 'Editing', 'Social Media'],
    description: 'Create engaging content for our digital platforms and clients.',
    postedDate: '2024-03-08',
    logoUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Bachelor\'s in English/Journalism',
      '2+ years writing experience',
      'SEO knowledge',
      'Portfolio of published work'
    ],
    responsibilities: [
      'Content creation',
      'SEO optimization',
      'Research and fact-checking',
      'Editorial calendar management'
    ],
    benefits: [
      'Flexible schedule',
      'Remote work',
      'Performance bonuses',
      'Writing tools access'
    ],
    companyDescription: 'Digital content agency serving global clients',
    experienceLevel: 'Entry',
    industry: ['Content', 'Digital Media'],
    views: 180,
    applicants: 25,
    lastUpdated: '2024-03-08',
    source: 'Indeed'
  },
  {
    id: '9',
    title: 'Financial Analyst',
    company: 'FinCorp',
    location: 'Mumbai',
    type: 'Full-time',
    salary: '₹12-15 LPA',
    skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Reporting', 'Forecasting'],
    description: 'Analyze financial data and create reports for business decision-making.',
    postedDate: '2024-03-07',
    logoUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'MBA Finance',
      '2-4 years experience',
      'Advanced Excel skills',
      'Financial modeling expertise'
    ],
    responsibilities: [
      'Financial analysis',
      'Report preparation',
      'Forecasting',
      'Budget planning'
    ],
    benefits: [
      'Health insurance',
      'Performance bonus',
      'Professional development',
      'Gym membership'
    ],
    companyDescription: 'Leading financial services firm',
    experienceLevel: 'Mid',
    industry: ['Finance', 'Banking'],
    views: 220,
    applicants: 18,
    lastUpdated: '2024-03-07',
    source: 'Company Website'
  },
  {
    id: '10',
    title: 'Project Manager',
    company: 'ProjectPro',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹20-28 LPA',
    skills: ['Project Management', 'Agile', 'Stakeholder Management', 'Risk Management', 'JIRA'],
    description: 'Lead technology projects from inception to delivery.',
    postedDate: '2024-03-06',
    logoUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'PMP Certification',
      '5+ years project management',
      'Agile certification',
      'Strong leadership skills'
    ],
    responsibilities: [
      'Project planning',
      'Team leadership',
      'Risk management',
      'Stakeholder communication'
    ],
    benefits: [
      'Competitive salary',
      'Health coverage',
      'Stock options',
      'Training budget'
    ],
    companyDescription: 'Project management consulting firm',
    experienceLevel: 'Senior',
    industry: ['Technology', 'Consulting'],
    views: 290,
    applicants: 22,
    lastUpdated: '2024-03-06',
    source: 'LinkedIn'
  },
  {
    id: '11',
    title: 'Sales Executive',
    company: 'SalesPro',
    location: 'Delhi',
    type: 'Full-time',
    salary: '₹8-12 LPA + Commission',
    skills: ['B2B Sales', 'Negotiation', 'CRM', 'Lead Generation', 'Relationship Building'],
    description: 'Drive B2B sales for our enterprise software solutions.',
    postedDate: '2024-03-05',
    logoUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Bachelor\'s degree',
      '2+ years B2B sales',
      'CRM experience',
      'Strong communication skills'
    ],
    responsibilities: [
      'Lead generation',
      'Sales presentations',
      'Contract negotiation',
      'Client relationship management'
    ],
    benefits: [
      'Base + Commission',
      'Health insurance',
      'Sales training',
      'Travel allowance'
    ],
    companyDescription: 'Enterprise software sales organization',
    experienceLevel: 'Mid',
    industry: ['Sales', 'Technology'],
    views: 210,
    applicants: 28,
    lastUpdated: '2024-03-05',
    source: 'Indeed'
  },
  {
    id: '12',
    title: 'Quality Assurance Engineer',
    company: 'QualityTech',
    location: 'Pune',
    type: 'Full-time',
    salary: '₹10-15 LPA',
    skills: ['Manual Testing', 'Automation Testing', 'Selenium', 'API Testing', 'Test Planning'],
    description: 'Ensure software quality through comprehensive testing strategies.',
    postedDate: '2024-03-04',
    logoUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'B.Tech in CS/IT',
      '3+ years QA experience',
      'Automation testing expertise',
      'ISTQB certification'
    ],
    responsibilities: [
      'Test planning',
      'Automation framework development',
      'Bug tracking',
      'Quality reporting'
    ],
    benefits: [
      'Health insurance',
      'Flexible hours',
      'Certification support',
      'Team events'
    ],
    companyDescription: 'Software quality assurance company',
    experienceLevel: 'Mid',
    industry: ['Technology', 'Quality Assurance'],
    views: 185,
    applicants: 15,
    lastUpdated: '2024-03-04',
    source: 'Naukri'
  },
  {
    id: '13',
    title: 'Business Analyst',
    company: 'BizSolutions',
    location: 'Hyderabad',
    type: 'Full-time',
    salary: '₹12-18 LPA',
    skills: ['Business Analysis', 'Requirements Gathering', 'Process Modeling', 'Agile', 'Documentation'],
    description: 'Bridge the gap between business needs and technical solutions.',
    postedDate: '2024-03-03',
    logoUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'MBA/B.Tech',
      '3+ years BA experience',
      'Strong analytical skills',
      'Process modeling expertise'
    ],
    responsibilities: [
      'Requirements analysis',
      'Process improvement',
      'Stakeholder management',
      'Solution design'
    ],
    benefits: [
      'Competitive salary',
      'Health benefits',
      'Professional development',
      'Work-life balance'
    ],
    companyDescription: 'Business consulting and solutions firm',
    experienceLevel: 'Mid',
    industry: ['Consulting', 'Technology'],
    views: 230,
    applicants: 20,
    lastUpdated: '2024-03-03',
    source: 'LinkedIn'
  },
  {
    id: '14',
    title: 'Digital Marketing Specialist',
    company: 'DigitalPro',
    location: 'Remote',
    type: 'Contract',
    salary: '₹8-12 LPA',
    skills: ['SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Analytics'],
    description: 'Drive digital marketing initiatives across multiple channels.',
    postedDate: '2024-03-02',
    logoUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'Bachelor\'s in Marketing',
      '2+ years digital marketing',
      'Google certifications',
      'Analytics experience'
    ],
    responsibilities: [
      'Campaign management',
      'SEO optimization',
      'Social media strategy',
      'Performance analysis'
    ],
    benefits: [
      'Remote work',
      'Flexible hours',
      'Performance bonus',
      'Tool subscriptions'
    ],
    companyDescription: 'Digital marketing agency',
    experienceLevel: 'Mid',
    industry: ['Marketing', 'Digital Media'],
    views: 175,
    applicants: 23,
    lastUpdated: '2024-03-02',
    source: 'Indeed'
  },
  {
    id: '15',
    title: 'System Administrator',
    company: 'TechOps',
    location: 'Bangalore',
    type: 'Full-time',
    salary: '₹10-15 LPA',
    skills: ['Linux', 'Windows Server', 'Networking', 'Security', 'Scripting'],
    description: 'Manage and maintain our IT infrastructure and systems.',
    postedDate: '2024-03-01',
    logoUrl: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=60',
    requirements: [
      'B.Tech in IT/CS',
      '3+ years sysadmin experience',
      'Linux certification',
      'Security knowledge'
    ],
    responsibilities: [
      'System administration',
      'Security management',
      'User support',
      'Infrastructure maintenance'
    ],
    benefits: [
      'Health insurance',
      'Shift allowance',
      'Certification support',
      'Gym membership'
    ],
    companyDescription: 'IT infrastructure management company',
    experienceLevel: 'Mid',
    industry: ['Technology', 'IT Infrastructure'],
    views: 195,
    applicants: 16,
    lastUpdated: '2024-03-01',
    source: 'Naukri'
  }
];

export const useJobStore = create<JobState>()(
  persist(
    (set, get) => ({
      jobs: sampleJobs,
      filteredJobs: sampleJobs,
      savedJobs: [],
      searchTerm: '',
      filters: {
        types: [],
        locations: [],
        skills: [],
        experience: [],
        industries: []
      },
      
      setSearchTerm: (term: string) => {
        set({ searchTerm: term });
        get().applyFilters();
      },
      
      toggleFilter: (filterType: keyof JobState['filters'], value: string) => {
        set(state => {
          const currentFilters = [...state.filters[filterType]];
          const index = currentFilters.indexOf(value);
          
          if (index === -1) {
            currentFilters.push(value);
          } else {
            currentFilters.splice(index, 1);
          }
          
          return {
            filters: {
              ...state.filters,
              [filterType]: currentFilters
            }
          };
        });
        
        get().applyFilters();
      },
      
      clearFilters: () => {
        set({
          searchTerm: '',
          filters: {
            types: [],
            locations: [],
            skills: [],
            experience: [],
            industries: []
          }
        });
        
        set({ filteredJobs: get().jobs });
      },
      
      applyFilters: () => {
        const { searchTerm, filters, jobs } = get();
        
        let filtered = [...jobs];
        
        // Apply search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(job => 
            job.title.toLowerCase().includes(term) ||
            job.company.toLowerCase().includes(term) ||
            job.description.toLowerCase().includes(term) ||
            job.skills.some(skill => skill.toLowerCase().includes(term))
          );
        }
        
        // Apply filters
        Object.entries(filters).forEach(([filterType, values]) => {
          if (values.length > 0) {
            filtered = filtered.filter(job => {
              switch (filterType) {
                case 'types':
                  return values.includes(job.type);
                case 'locations':
                  return values.includes(job.location);
                case 'skills':
                  return job.skills.some(skill => values.includes(skill));
                case 'experience':
                  return values.includes(job.experienceLevel);
                case 'industries':
                  return job.industry.some(ind => values.includes(ind));
                default:
                  return true;
              }
            });
          }
        });
        
        set({ filteredJobs: filtered });
      },
      
      toggleBookmark: (jobId: string) => {
        set(state => {
          const job = state.jobs.find(j => j.id === jobId);
          if (!job) return state;
          
          const isCurrentlyBookmarked = job.isBookmarked;
          const updatedJobs = state.jobs.map(j =>
            j.id === jobId ? { ...j, isBookmarked: !isCurrentlyBookmarked } : j
          );
          
          const updatedSavedJobs = isCurrentlyBookmarked
            ? state.savedJobs.filter(j => j.id !== jobId)
            : [...state.savedJobs, { ...job, isBookmarked: true }];
          
          return {
            jobs: updatedJobs,
            filteredJobs: state.filteredJobs.map(j =>
              j.id === jobId ? { ...j, isBookmarked: !isCurrentlyBookmarked } : j
            ),
            savedJobs: updatedSavedJobs
          };
        });
      },
      
      getSavedJobs: () => {
        return get().jobs.filter(job => job.isBookmarked);
      },
      
      getNewJobs: () => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        
        return get().jobs.filter(job => {
          const postedDate = new Date(job.postedDate);
          return postedDate >= threeDaysAgo;
        });
      },
      
      getRecommendedJobs: () => {
        // In a real app, this would use an algorithm based on user preferences
        // For now, return jobs with high views and low applicants
        return get().jobs
          .filter(job => job.views > 200 && job.applicants < 20)
          .sort((a, b) => b.views / b.applicants - a.views / a.applicants)
          .slice(0, 5);
      },
      
      incrementJobView: (jobId: string) => {
        set(state => ({
          jobs: state.jobs.map(job =>
            job.id === jobId ? { ...job, views: job.views + 1 } : job
          ),
          filteredJobs: state.filteredJobs.map(job =>
            job.id === jobId ? { ...job, views: job.views + 1 } : job
          )
        }));
      }
    }),
    {
      name: 'job-store',
      partialize: (state) => ({ savedJobs: state.savedJobs }),
    }
  )
);