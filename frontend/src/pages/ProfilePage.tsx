import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useChatbotStore } from '../store/chatbotStore';
import { toast } from 'react-toastify';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  GraduationCap, 
  Upload, 
  Save, 
  Trash2, 
  Plus, 
  Clock, 
  Building, 
  PenTool, 
  FileText,
  Link as LinkIcon,
  Globe,
  Award,
  Star,
  CheckCircle,
  X
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  const { toggleChatbot } = useChatbotStore();
  
  // Profile sections state
  const [activeSection, setActiveSection] = useState<string>('basic');
  const [editMode, setEditMode] = useState<Record<string, boolean>>({});
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Profile data state
  const [profileData, setProfileData] = useState({
    basic: {
      name: user?.name || '',
      email: user?.email || '',
      phone: '9876543210',
      location: 'Bangalore, India',
      bio: 'Experienced software developer with a passion for building user-friendly applications.',
      birthDate: '1990-01-15',
      profileImage: user?.avatar || 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
      headline: 'Senior Software Developer',
      website: 'https://example.com',
      github: 'https://github.com/username',
      linkedin: 'https://linkedin.com/in/username'
    },
    experience: [
      {
        id: '1',
        company: 'TechCorp Solutions',
        title: 'Senior Software Developer',
        location: 'Bangalore',
        startDate: '2018-06',
        endDate: '',
        current: true,
        description: 'Leading development of web applications using React and Node.js. Mentoring junior developers and implementing best practices.',
        achievements: [
          'Increased team productivity by 30% through process improvements',
          'Led successful migration of legacy system to modern tech stack',
          'Mentored 5 junior developers who were promoted to mid-level roles'
        ],
        technologies: ['React', 'Node.js', 'TypeScript', 'AWS']
      },
      {
        id: '2',
        company: 'Digital Innovations',
        title: 'Web Developer',
        location: 'Hyderabad',
        startDate: '2016-03',
        endDate: '2018-05',
        current: false,
        description: 'Developed responsive websites and e-commerce applications for clients across various industries.',
        achievements: [
          'Delivered 15+ successful client projects',
          'Reduced page load time by 40% through optimization',
          'Implemented automated testing reducing bugs by 60%'
        ],
        technologies: ['JavaScript', 'PHP', 'MySQL', 'AWS']
      }
    ],
    education: [
      {
        id: '1',
        institution: 'University of Technology',
        degree: 'B.Tech in Computer Science',
        location: 'Mumbai',
        startDate: '2012-08',
        endDate: '2016-05',
        description: 'Graduated with honors. Specialized in software engineering and database systems.',
        achievements: [
          'First Class with Distinction',
          'Best Project Award',
          'Technical Club President'
        ],
        courses: [
          'Data Structures & Algorithms',
          'Database Management Systems',
          'Software Engineering',
          'Web Technologies'
        ]
      }
    ],
    skills: {
      technical: [
        'JavaScript',
        'React',
        'Node.js',
        'TypeScript',
        'HTML/CSS',
        'SQL',
        'Git',
        'AWS'
      ],
      soft: [
        'Leadership',
        'Problem Solving',
        'Communication',
        'Team Management',
        'Agile Methodologies'
      ]
    },
    certifications: [
      {
        id: '1',
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2022-06',
        expires: '2025-06',
        credentialId: 'AWS-123456',
        url: 'https://aws.amazon.com/certification'
      },
      {
        id: '2',
        name: 'Professional Scrum Master',
        issuer: 'Scrum.org',
        date: '2021-08',
        credentialId: 'PSM-789012',
        url: 'https://www.scrum.org/certificates'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'E-commerce Platform',
        description: 'Built a full-stack e-commerce platform with React, Node.js, and MongoDB.',
        url: 'https://github.com/username/ecommerce',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        highlights: [
          'Implemented secure payment processing',
          'Built responsive UI with Material-UI',
          'Integrated real-time inventory management'
        ]
      },
      {
        id: '2',
        name: 'Task Management App',
        description: 'Developed a collaborative task management application with real-time updates.',
        url: 'https://github.com/username/taskmanager',
        technologies: ['React', 'Firebase', 'TypeScript', 'Tailwind CSS'],
        highlights: [
          'Real-time collaboration features',
          'Drag-and-drop task organization',
          'Advanced filtering and search'
        ]
      }
    ]
  });
  
  // Resume state
  const [resume, setResume] = useState<File | null>(null);
  
  // Handle profile image change
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setProfileData(prev => ({
            ...prev,
            basic: {
              ...prev.basic,
              profileImage: event.target.result
            }
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  // Handle resume upload
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
      toast.success('Resume uploaded successfully!');
    }
  };
  
  // Toggle edit mode for a section
  const toggleEditMode = (section: string) => {
    setEditMode(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Save changes for a section
  const saveChanges = (section: string) => {
    // Validate data
    const validationErrors = validateSection(section);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear errors and edit mode
    setErrors({});
    toggleEditMode(section);
    toast.success('Changes saved successfully!');
  };
  
  // Validate section data
  const validateSection = (section: string): Record<string, string> => {
    const errors: Record<string, string> = {};
    
    if (section === 'basic') {
      if (!profileData.basic.name) errors.name = 'Name is required';
      if (!profileData.basic.email) errors.email = 'Email is required';
      if (!/^\S+@\S+\.\S+$/.test(profileData.basic.email)) {
        errors.email = 'Invalid email format';
      }
    }
    
    return errors;
  };
  
  // Profile sections configuration
  const sections = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Star },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'projects', label: 'Projects', icon: FileText }
  ];
  
  return (
    <div className="bg-secondary-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-secondary-100 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-700"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6 -mt-16">
              <div className="relative">
                <img 
                  src={profileData.basic.profileImage} 
                  alt={profileData.basic.name} 
                  className="w-32 h-full rounded-xl border-4 border-white object-cover shadow-md"
                />
                {editMode.basic && (
                  <label className="absolute bottom-2 right-2 bg-primary-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary-700 transition-colors">
                    <Upload size={16} />
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProfileImageChange} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>
              
              <div className="mt-4 md:mt-0 flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl text-white font-bold text-secondary-900 mb-1">
                      {profileData.basic.name}
                    </h1>
                    <p className="text-secondary-600">{profileData.basic.headline}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex space-x-3">
                    <button 
                      onClick={() => toggleChatbot()}
                      className="btn-secondary"
                    >
                      Get Resume Tips
                    </button>
                    <button 
                      onClick={() => toggleEditMode('basic')}
                      className="btn-primary"
                    >
                      {editMode.basic ? (
                        <>
                          <Save size={18} className="mr-2" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <PenTool size={18} className="mr-2" />
                          Edit Profile
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="flex items-center text-secondary-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{profileData.basic.location}</span>
                  </div>
                  <div className="flex items-center text-secondary-600">
                    <Mail size={16} className="mr-1" />
                    <span>{profileData.basic.email}</span>
                  </div>
                  <div className="flex items-center text-secondary-600">
                    <Globe size={16} className="mr-1" />
                    <a 
                      href={profileData.basic.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary-600"
                    >
                      {profileData.basic.website}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-1 mb-8">
          <div className="flex overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-secondary-600 hover:text-primary-600 hover:bg-secondary-50'
                }`}
              >
                <section.icon size={16} className="mr-2" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            {activeSection === 'basic' && (
              <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Basic Information</h2>
                  <button
                    onClick={() => toggleEditMode('basic')}
                    className="btn-secondary"
                  >
                    {editMode.basic ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                
                {editMode.basic ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.basic.name}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, name: e.target.value }
                          }))}
                          className={`input-field ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={profileData.basic.email}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, email: e.target.value }
                          }))}
                          className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={profileData.basic.phone}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, phone: e.target.value }
                          }))}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={profileData.basic.location}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, location: e.target.value }
                          }))}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Professional Headline
                        </label>
                        <input
                          type="text"
                          value={profileData.basic.headline}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, headline: e.target.value }
                          }))}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-secondary-700 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          value={profileData.basic.website}
                          onChange={(e) => setProfileData(prev => ({
                            ...prev,
                            basic: { ...prev.basic, website: e.target.value }
                          }))}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-secondary-700 mb-1">
                        Professional Bio
                      </label>
                      <textarea
                        value={profileData.basic.bio}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          basic: { ...prev.basic, bio: e.target.value }
                        }))}
                        rows={4}
                        className="input-field"
                      ></textarea>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => toggleEditMode('basic')}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => saveChanges('basic')}
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-secondary-500 mb-1">Full Name</h3>
                        <p className="text-secondary-900">{profileData.basic.name}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-secondary-500 mb-1">Email</h3>
                        <p className="text-secondary-900">{profileData.basic.email}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-secondary-500 mb-1">Phone</h3>
                        <p className="text-secondary-900">{profileData.basic.phone}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-secondary-500 mb-1">Location</h3>
                        <p className="text-secondary-900">{profileData.basic.location}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-secondary-500 mb-1">Professional Bio</h3>
                      <p className="text-secondary-900">{profileData.basic.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-secondary-500 mb-2">Social Links</h3>
                      <div className="flex space-x-4">
                        <a
                          href={profileData.basic.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-600 hover:text-primary-600"
                        >
                          <LinkIcon size={20} />
                        </a>
                        <a
                          href={profileData.basic.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-600 hover:text-primary-600"
                        >
                          <LinkIcon size={20} />
                        </a>
                        <a
                          href={profileData.basic.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary-600 hover:text-primary-600"
                        >
                          <Globe size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Experience Section */}
            {activeSection === 'experience' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  <button className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    Add Experience
                  </button>
                </div>
                
                {profileData.experience.map((exp) => (
                  <div 
                    key={exp.id}
                    className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <Building size={24} className="text-secondary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <p className="text-secondary-600">{exp.company}</p>
                          <div className="flex items-center text-sm text-secondary-500 mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{exp.location}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="text-secondary-400 hover:text-primary-600">
                        <PenTool size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-secondary-700">{exp.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-medium text-secondary-900 mb-2">Key Achievements</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, index) => (
                            <li 
                              key={index}
                              className="flex items-start text-secondary-700"
                            >
                              <CheckCircle size={16} className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-secondary-900 mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Education Section */}
            {activeSection === 'education' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Education</h2>
                  <button className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    Add Education
                  </button>
                </div>
                
                {profileData.education.map((edu) => (
                  <div 
                    key={edu.id}
                    className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                          <GraduationCap size={24} className="text-secondary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <p className="text-secondary-600">{edu.institution}</p>
                          <div className="flex items-center text-sm text-secondary-500 mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{edu.location}</span>
                            <span className="mx-2">•</span>
                            <Clock size={14} className="mr-1" />
                            <span>{edu.startDate} - {edu.endDate}</span>
                          </div>
                        </div>
                      </div>
                      <button className="text-secondary-400 hover:text-primary-600">
                        <PenTool size={18} />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-secondary-700">{edu.description}</p>
                      
                      <div>
                        <h4 className="text-sm font-medium text-secondary-900 mb-2">Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, index) => (
                            <li 
                              key={index}
                              className="flex items-start text-secondary-700"
                            >
                              <Award size={16} className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-secondary-900 mb-2">Key Courses</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.courses.map((course, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Skills Section */}
            {activeSection === 'skills' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <button className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    Add Skill
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.technical.map((skill, index) => (
                          <div 
                            key={index}
                            className="group relative px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
                          >
                            {skill}
                            <button className="hidden group-hover:flex absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.soft.map((skill, index) => (
                          <div 
                            key={index}
                            className="group relative px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm hover:bg-secondary-200 transition-colors"
                          >
                            {skill}
                            <button className="hidden group-hover:flex absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center">
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Certifications Section */}
            {activeSection === 'certifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Certifications</h2>
                  <button className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    Add Certification
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {profileData.certifications.map((cert) => (
                    <div 
                      key={cert.id}
                      className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                            <Award size={24} className="text-secondary-600" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{cert.name}</h3>
                            <p className="text-secondary-600">{cert.issuer}</p>
                            <div className="flex items-center text-sm text-secondary-500 mt-1">
                              <Calendar size={14} className="mr-1" />
                              <span>Issued {cert.date}</span>
                              {cert.expires && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>Expires {cert.expires}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <button className="text-secondary-400 hover:text-primary-600">
                          <PenTool size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="text-secondary-500">Credential ID:</span>
                          <span className="ml-2 text-secondary-700">{cert.credentialId}</span>
                        </div>
                        
                        {cert.url && (
                          <a 
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700 text-sm"
                          >
                            <LinkIcon size={14} className="mr-1" />
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Projects Section */}
            {activeSection === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Projects</h2>
                  <button className="btn-primary">
                    <Plus size={18} className="mr-2" />
                    Add Project
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  {profileData.projects.map((project) => (
                    <div 
                      key={project.id}
                      className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{project.name}</h3>
                          <p className="text-secondary-600 mt-1">{project.description}</p>
                        </div>
                        <button className="text-secondary-400 hover:text-primary-600">
                          <PenTool size={18} />
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-secondary-900 mb-2">Key Highlights</h4>
                          <ul className="space-y-2">
                            {project.highlights.map((highlight, index) => (
                              <li 
                                key={index}
                                className="flex items-start text-secondary-700"
                              >
                                <CheckCircle size={16} className="text-primary-600 mr-2 mt-1 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-secondary-900 mb-2">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {project.url && (
                          <a 
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-primary-600 hover:text-primary-700"
                          >
                            <LinkIcon size={16} className="mr-1" />
                            View Project
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-8">
            {/* Profile Completion */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Completion</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-secondary-600">Overall Progress</span>
                    <span className="font-medium text-primary-600">85%</span>
                  </div>
                  <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-secondary-600">Basic Information</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-secondary-600">Work Experience</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span className="text-secondary-600">Education</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <Clock size={16} className="text-yellow-500 mr-2" />
                    <span className="text-secondary-600">Skills (2 more needed)</span>
                  </li>
                  <li className="flex items-center text-sm">
                    <X size={16} className="text-red-500 mr-2" />
                    <span className="text-secondary-600">Profile Picture</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Resume Section */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Resume</h2>
              
              {resume ? (
                <div className="space-y-4">
                  <div className="flex items-center p-4 border border-secondary-200 rounded-lg">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                      <FileText size={20} className="text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{resume.name}</p>
                      <p className="text-sm text-secondary-500">
                        {(resume.size / 1024 / 1024).toFixed(2)} MB • Updated {new Date().toLocaleDateString()}
                      </p>
                    </div>
                    <button 
                      onClick={() => setResume(null)}
                      className="text-red-600 hover:text-red-700 ml-4"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="bg-primary-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-primary-900 mb-2">Resume Score: 78/100</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-primary-700">Content</span>
                          <span className="text-primary-700">82/100</span>
                        </div>
                        <div className="h-1.5 bg-primary-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '82%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-primary-700">Keywords</span>
                          <span className="text-primary-700">75/100</span>
                        </div>
                        <div className="h-1.5 bg-primary-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-primary-700">Format</span>
                          <span className="text-primary-700">85/100</span>
                        </div>
                        <div className="h-1.5 bg-primary-200 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-600 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => toggleChatbot()}
                    className="btn-primary w-full"
                  >
                    Get Resume Tips
                  </button>
                </div>
              ) : (
                <div className="text-center p-6 border-2 border-dashed border-secondary-300 rounded-lg">
                  <FileText size={36} className="text-secondary-400 mx-auto mb-3" />
                  <p className="text-secondary-600 mb-4">Upload your resume to improve your job matches</p>
                  <input 
                    type="file" 
                    id="resume" 
                    accept=".pdf,.doc,.docx" 
                    onChange={handleResumeUpload}
                    className="hidden" 
                  />
                  <label 
                    htmlFor="resume" 
                    className="btn-primary cursor-pointer inline-block"
                  >
                    <Upload size={18} className="mr-2 inline-block" />
                    Upload Resume
                  </label>
                </div>
              )}
            </div>
            
            {/* Profile Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
              <h2 className="text-lg font-semibold mb-4">Profile Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Profile Views</span>
                  <span className="font-medium">245</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Search Appearances</span>
                  <span className="font-medium">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Job Applications</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-600">Messages</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;