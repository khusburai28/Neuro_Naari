import React, { useState } from 'react';
import { Users, Briefcase, Award, Clock, Calendar, MessageSquare, Search, Filter, UserCheck } from 'lucide-react';

// Sample mentor data
const mentors = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    role: 'Chief Technology Officer',
    company: 'TechInnovate Solutions',
    experience: 15,
    skills: ['Leadership', 'Technology Strategy', 'Product Development', 'Team Building'],
    bio: 'Dr. Sharma has over 15 years of experience in technology leadership roles. She specializes in helping women navigate the tech industry and build successful careers.',
    imageUrl: 'https://images.pexels.com/photos/3772511/pexels-photo-3772511.jpeg?auto=compress&cs=tinysrgb&w=350'
  },
  {
    id: '2',
    name: 'Ananya Patel',
    role: 'Senior Product Manager',
    company: 'GlobalTech',
    experience: 8,
    skills: ['Product Strategy', 'User Research', 'Agile', 'Market Analysis'],
    bio: 'Ananya has helped numerous women transition into product management roles. She provides practical guidance on building user-centric products and career advancement.',
    imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=350'
  },
  {
    id: '3',
    name: 'Neha Reddy',
    role: 'VP of Engineering',
    company: 'InnovateTech',
    experience: 12,
    skills: ['Engineering Leadership', 'Software Architecture', 'Scaling Teams', 'Career Development'],
    bio: 'Neha specializes in helping women engineers advance in their careers. She provides guidance on technical leadership and navigating career challenges.',
    imageUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=350'
  },
  {
    id: '4',
    name: 'Sonia Mehta',
    role: 'Data Science Director',
    company: 'Analytics Nexus',
    experience: 10,
    skills: ['Data Science', 'Machine Learning', 'Team Leadership', 'Career Transitions'],
    bio: 'Sonia helps women enter and advance in data science careers. She offers guidance on skill development and overcoming challenges in the analytics field.',
    imageUrl: 'https://images.pexels.com/photos/1181691/pexels-photo-1181691.jpeg?auto=compress&cs=tinysrgb&w=350'
  },
  {
    id: '5',
    name: 'Maya Krishnan',
    role: 'Marketing Executive',
    company: 'Global Brands Inc.',
    experience: 14,
    skills: ['Marketing Strategy', 'Brand Management', 'Leadership', 'Career Planning'],
    bio: 'Maya specializes in helping women build successful marketing careers. She offers guidance on personal branding and leadership development.',
    imageUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=350'
  },
  {
    id: '6',
    name: 'Kavita Desai',
    role: 'HR Director',
    company: 'Future Workforce Solutions',
    experience: 12,
    skills: ['Talent Management', 'Leadership Development', 'Career Coaching', 'Workplace Inclusion'],
    bio: 'Kavita is passionate about helping women navigate workplace challenges and advance in their careers through effective HR practices and career development.',
    imageUrl: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=350'
  }
];

// Sample mentorship programs
const programs = [
  {
    id: '1',
    title: 'Leadership Development Program',
    description: 'A 3-month structured program focused on developing leadership skills for women in mid-career stages.',
    duration: '3 months',
    format: '1:1 Mentoring + Group Sessions',
    requirements: 'Minimum 5 years of work experience',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '2',
    title: 'Career Transition Support',
    description: 'Designed for women looking to change industries or roles, this program provides guidance and support through the transition.',
    duration: '4 months',
    format: 'Weekly 1:1 Sessions',
    requirements: 'Currently employed professionals',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: '3',
    title: 'Return to Work Program',
    description: 'Supporting women who are returning to the workforce after a career break with skill updates and confidence building.',
    duration: '6 months',
    format: 'Bi-weekly Sessions + Workshops',
    requirements: 'Previous work experience of at least 2 years',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const MentorshipPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<typeof mentors[0] | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Industries for filter
  const industries = [
    'Technology', 
    'Marketing', 
    'Finance', 
    'Healthcare', 
    'Education', 
    'Human Resources'
  ];
  
  // Filter mentors based on search term and industries
  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = searchTerm === '' || 
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesIndustry = selectedIndustries.length === 0 || 
      selectedIndustries.some(industry => {
        if (industry === 'Technology') {
          return mentor.role.includes('Tech') || mentor.role.includes('Engineer') || mentor.role.includes('Data');
        }
        if (industry === 'Marketing') {
          return mentor.role.includes('Market');
        }
        if (industry === 'Finance') {
          return mentor.role.includes('Finance') || mentor.role.includes('Financial');
        }
        if (industry === 'Human Resources') {
          return mentor.role.includes('HR') || mentor.role.includes('Human Resource');
        }
        return false;
      });
    
    return matchesSearch && matchesIndustry;
  });
  
  // Toggle industry filter
  const toggleIndustryFilter = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };
  
  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustries([]);
  };
  
  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  return (
    <div className="bg-secondary-50 mt-10 pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Mentor</h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Connect with experienced professionals who can guide you through career challenges and help you achieve your goals.
          </p>
        </div>
        
        {/* Mentorship Programs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Mentorship Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {programs.map(program => (
              <div key={program.id} className="card overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={program.imageUrl} 
                  alt={program.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-secondary-600 mb-4">{program.description}</p>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-secondary-500">
                      <Clock size={16} className="mr-2" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-500">
                      <Calendar size={16} className="mr-2" />
                      <span>{program.format}</span>
                    </div>
                    <div className="flex items-center text-sm text-secondary-500">
                      <UserCheck size={16} className="mr-2" />
                      <span>{program.requirements}</span>
                    </div>
                  </div>
                  <button className="btn-primary w-full">Apply Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Find a Mentor Section */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Find Individual Mentors</h2>
            
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
                    <Search size={20} className="text-secondary-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, role, skills, or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full input-field"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="hidden md:block w-full md:w-72 flex-shrink-0 space-y-6">
              <div className="bg-white rounded-lg shadow-card p-6">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                
                {/* Industry Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Industry</h4>
                  <div className="space-y-2">
                    {industries.map(industry => (
                      <label key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedIndustries.includes(industry)}
                          onChange={() => toggleIndustryFilter(industry)}
                          className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-secondary-700">{industry}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Clear Filters */}
                <button 
                  onClick={clearFilters}
                  className="btn-secondary w-full"
                  disabled={!searchTerm && selectedIndustries.length === 0}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            
            {/* Filters - Mobile */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 z-50 bg-secondary-900 bg-opacity-50 flex items-end sm:items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Filters</h3>
                      <button 
                        onClick={toggleMobileFilter} 
                        className="text-secondary-500 hover:text-secondary-700"
                      >
                        <Filter size={24} />
                      </button>
                    </div>
                    
                    {/* Industry Filter */}
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Industry</h4>
                      <div className="space-y-2">
                        {industries.map(industry => (
                          <label key={industry} className="flex items-center">
                            <input
                              type="checkbox"
                              checked={selectedIndustries.includes(industry)}
                              onChange={() => toggleIndustryFilter(industry)}
                              className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                            />
                            <span className="ml-2 text-secondary-700">{industry}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={() => {
                          clearFilters();
                          toggleMobileFilter();
                        }}
                        className="btn-secondary flex-1"
                        disabled={!searchTerm && selectedIndustries.length === 0}
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
            
            {/* Mentors Grid */}
            <div className="flex-1">
              {filteredMentors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMentors.map(mentor => (
                    <div 
                      key={mentor.id} 
                      className="card overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => setSelectedMentor(mentor)}
                    >
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <img 
                            src={mentor.imageUrl} 
                            alt={mentor.name} 
                            className="w-16 h-16 rounded-full object-cover mr-4"
                          />
                          <div>
                            <h3 className="text-lg font-semibold">{mentor.name}</h3>
                            <p className="text-secondary-600 text-sm">{mentor.role}</p>
                            <p className="text-secondary-500 text-sm">{mentor.company}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-5">
                          <div className="flex items-center text-sm text-secondary-600">
                            <Briefcase size={16} className="mr-2 text-primary-600" />
                            <span>{mentor.experience} years experience</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {mentor.skills.slice(0, 3).map((skill, index) => (
                              <span 
                                key={index} 
                                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {mentor.skills.length > 3 && (
                              <span className="text-xs text-secondary-500">
                                +{mentor.skills.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="space-x-2">
                          <button className="btn-primary">
                            <MessageSquare size={16} className="mr-2" />
                            Connect
                          </button>
                          <button 
                            className="btn-secondary"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMentor(mentor);
                            }}
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-card p-8 text-center">
                  <p className="text-secondary-500 mb-2">No mentors match your search criteria</p>
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
        
        {/* Mentor Details Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 z-50 bg-secondary-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <img 
                      src={selectedMentor.imageUrl} 
                      alt={selectedMentor.name} 
                      className="w-20 h-20 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-2xl font-bold">{selectedMentor.name}</h2>
                      <p className="text-secondary-600">{selectedMentor.role}</p>
                      <p className="text-secondary-500">{selectedMentor.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedMentor(null)}
                    className="text-secondary-500 hover:text-secondary-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-secondary-700">{selectedMentor.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Experience</h3>
                    <div className="flex items-center space-x-2">
                      <Award size={20} className="text-primary-600" />
                      <span className="text-secondary-700">{selectedMentor.experience} years of professional experience</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMentor.skills.map((skill, index) => (
                        <span 
                          key={index} 
                          className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Mentorship Style</h3>
                    <p className="text-secondary-700">
                      Weekly one-on-one sessions focused on practical career development and personalized guidance.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-secondary-200">
                    <h3 className="text-lg font-semibold mb-4">Schedule a Session</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="btn-primary flex-1">
                        <MessageSquare size={18} className="mr-2" />
                        Connect with Mentor
                      </button>
                      <button 
                        onClick={() => setSelectedMentor(null)}
                        className="btn-secondary flex-1"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white py-16 mt-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Learn more about our mentorship programs and how they can help you advance your career.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto divide-y divide-secondary-200">
            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">How does mentorship work?</h3>
              <p className="text-secondary-600">
                Our mentorship program connects you with experienced professionals who can provide guidance, advice, and support tailored to your career goals. Sessions can be conducted virtually or in-person based on mutual convenience.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">How much time commitment is required?</h3>
              <p className="text-secondary-600">
                Most mentorship relationships involve a 1-hour session every 2-4 weeks, depending on the program and your specific arrangement with your mentor. Additional communication may occur via email or messaging.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Is there a cost associated with mentorship?</h3>
              <p className="text-secondary-600">
                Basic mentorship connections are free for JobsForHer members. Premium structured programs may have associated fees, which are detailed on each program page.
              </p>
            </div>
            
            <div className="py-5">
              <h3 className="text-xl font-semibold mb-2">Can I change mentors if it's not a good fit?</h3>
              <p className="text-secondary-600">
                Yes, we understand that not all mentorship matches work out perfectly. If you feel your current mentorship isn't meeting your needs, you can request a different mentor through our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Accelerate Your Career?</h2>
          <p className="text-xl text-primary-50 max-w-2xl mx-auto mb-8">
            Connect with experienced mentors who can guide you through challenges and help you achieve your professional goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary bg-white text-primary-700 hover:bg-primary-50">
              Find a Mentor
            </button>
            <button className="btn-secondary bg-transparent text-white border-white hover:bg-primary-700">
              Become a Mentor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;