import React from 'react';
import { BookOpen, Video, FileText, Award, ChevronRight, Download } from 'lucide-react';

// Sample resources data
const resources = {
  // Articles
  articles: [
    {
      id: '1',
      title: 'Building a Successful Career in Tech as a Woman',
      excerpt: 'Insights and strategies for navigating the tech industry and overcoming common challenges faced by women.',
      category: 'Career Development',
      readTime: '8 min read',
      date: 'June 10, 2023',
      imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '2',
      title: 'Effective Negotiation Strategies for Women',
      excerpt: 'Learn proven techniques to confidently negotiate your salary, benefits, and work arrangements.',
      category: 'Leadership',
      readTime: '10 min read',
      date: 'May 25, 2023',
      imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '3',
      title: 'Balancing Work and Family: Practical Approaches',
      excerpt: 'Strategies and insights for managing professional responsibilities while maintaining work-life balance.',
      category: 'Work-Life Balance',
      readTime: '7 min read',
      date: 'May 18, 2023',
      imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '4',
      title: 'Overcoming Imposter Syndrome in the Workplace',
      excerpt: 'Understanding and addressing feelings of inadequacy to build confidence in your professional abilities.',
      category: 'Personal Development',
      readTime: '6 min read',
      date: 'May 12, 2023',
      imageUrl: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=350'
    }
  ],
  
  // Videos
  videos: [
    {
      id: '1',
      title: 'Leading with Authenticity: Women in Leadership',
      duration: '45 min',
      presenter: 'Dr. Priya Sharma, Leadership Coach',
      date: 'June 5, 2023',
      thumbnailUrl: 'https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '2',
      title: 'Mastering Public Speaking for Career Advancement',
      duration: '38 min',
      presenter: 'Ananya Patel, Communications Expert',
      date: 'May 28, 2023',
      thumbnailUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '3',
      title: 'Interview Skills Workshop: Standing Out from the Competition',
      duration: '52 min',
      presenter: 'Kavita Desai, HR Director',
      date: 'May 20, 2023',
      thumbnailUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=350'
    }
  ],
  
  // Templates
  templates: [
    {
      id: '1',
      title: 'Professional Resume Template with ATS Optimization',
      fileType: 'DOCX/PDF',
      downloads: '5.2k',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '2',
      title: 'Cover Letter Template for Career Transitions',
      fileType: 'DOCX/PDF',
      downloads: '3.8k',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '3',
      title: 'Career Development Plan Worksheet',
      fileType: 'PDF/XLS',
      downloads: '2.9k',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '4',
      title: 'Negotiation Preparation Checklist',
      fileType: 'PDF',
      downloads: '4.1k',
      thumbnailUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=350'
    }
  ],
  
  // Courses
  courses: [
    {
      id: '1',
      title: 'Leadership Skills for Women in Management',
      duration: '8 weeks',
      level: 'Intermediate',
      instructor: 'Dr. Maya Krishnan',
      imageUrl: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '2',
      title: 'Digital Marketing Essentials for Career Growth',
      duration: '6 weeks',
      level: 'Beginner',
      instructor: 'Sonia Mehta',
      imageUrl: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=350'
    },
    {
      id: '3',
      title: 'Financial Planning for Professional Women',
      duration: '4 weeks',
      level: 'All Levels',
      instructor: 'Neha Reddy',
      imageUrl: 'https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=350'
    }
  ]
};

const ResourcesPage: React.FC = () => {
  return (
    <div className="bg-secondary-50 mt-10 pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-card p-8 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Career Resources for Women</h1>
            <p className="text-xl text-secondary-600 mb-8">
              Access a wealth of resources designed to support your professional growth and development.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#articles" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <BookOpen size={32} className="text-primary-600 mb-2" />
                <span className="font-medium">Articles</span>
              </a>
              <a href="#videos" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <Video size={32} className="text-primary-600 mb-2" />
                <span className="font-medium">Videos</span>
              </a>
              <a href="#templates" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <FileText size={32} className="text-primary-600 mb-2" />
                <span className="font-medium">Templates</span>
              </a>
              <a href="#courses" className="flex flex-col items-center p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                <Award size={32} className="text-primary-600 mb-2" />
                <span className="font-medium">Courses</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Articles Section */}
        <section id="articles" className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Articles & Guides</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all articles
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.articles.map(article => (
              <div key={article.id} className="card overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {article.category}
                    </span>
                    <span className="text-xs text-secondary-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                  <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-secondary-500">{article.date}</span>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Videos Section */}
        <section id="videos" className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Videos & Webinars</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all videos
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.videos.map(video => (
              <div key={video.id} className="card overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white bg-opacity-75 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-transparent border-l-primary-600 ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-secondary-500">{video.date}</span>
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                  <p className="text-secondary-600 text-sm">
                    Presented by: {video.presenter}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Templates Section */}
        <section id="templates" className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Templates & Tools</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all templates
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.templates.map(template => (
              <div key={template.id} className="card p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                    <FileText size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <span className="text-xs text-secondary-500">{template.fileType}</span>
                    <h3 className="font-semibold line-clamp-1">{template.title}</h3>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-secondary-500">{template.downloads} downloads</span>
                  <button className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-700">
                    <Download size={16} className="mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Courses Section */}
        <section id="courses" className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Online Courses</h2>
            <a href="#" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              View all courses
              <ChevronRight size={18} className="ml-1" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.courses.map(course => (
              <div key={course.id} className="card overflow-hidden hover:shadow-md transition-shadow">
                <img 
                  src={course.imageUrl} 
                  alt={course.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                    <span className="text-xs text-secondary-500">{course.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-secondary-600 text-sm mb-4">
                    Instructor: {course.instructor}
                  </p>
                  <button className="btn-primary w-full text-sm">Enroll Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="bg-white rounded-lg shadow-card p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with Career Resources</h2>
            <p className="text-secondary-600 mb-6">
              Subscribe to our newsletter to receive the latest articles, videos, and resources directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-field flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-secondary-500 mt-3">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from JobsForHer Foundation.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;