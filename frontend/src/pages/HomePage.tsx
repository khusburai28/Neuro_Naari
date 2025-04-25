import React from 'react';
import { Link } from 'react-router-dom';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useAuthStore } from '../store/authStore';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  const [heroText] = useTypewriter({
    words: ['Elevate.', 'Excel.', 'Inspire.'],
    loop: true,
    delaySpeed: 2000,
    typeSpeed: 70,
    deleteSpeed: 50
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800"
      >
        <div className="absolute inset-0 bg-[url('/wt4.jpeg')] bg-cover bg-center opacity-20"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              {heroText}
              <Cursor cursorStyle="_" />
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              For the Equal Future of Women at Work and Beyond
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link 
                  to="/dashboard" 
                  className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg inline-block text-center"
                >
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link 
                    to="/signup" 
                    className="px-8 py-4 bg-white text-primary-700 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg inline-block text-center"
                  >
                    Join Now
                  </Link>
                  <Link 
                    to="/about" 
                    className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors text-lg inline-block text-center"
                  >
                    Learn More
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary-800">Meet Team Neuro Naari</h2>
          <p className="text-xl text-center text-primary-700 mb-12 max-w-3xl mx-auto">
            Passionate about revolutionizing women's employment through AI innovation and comprehensive career support. Our team is dedicated to creating an inclusive platform that empowers women in their professional journeys.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/khusbu.jpg" 
                alt="Khusbu Rai" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 border-t-4 border-primary-500">
                <h3 className="text-xl font-bold mb-2 text-primary-700">Khusbu Rai</h3>
                <p className="text-primary-600 mb-4">Team Leader</p>
                <p className="text-gray-600">
                  Leading the development of Asha AI Assistant and our innovative job-matching algorithms. Passionate about using technology to create equal opportunities for women in the workforce.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/manya.jpeg" 
                alt="Manya Joshi" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 border-t-4 border-primary-500">
                <h3 className="text-xl font-bold mb-2 text-primary-700">Manya Joshi</h3>
                <p className="text-primary-600 mb-4">AI Innovation Specialist</p>
                <p className="text-gray-600">
                  Passionate about developing intelligent algorithms for career guidance and skill mapping. Expertise in machine learning, recommendation systems, and data analytics for personalized job matching.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/nikita.jpeg" 
                alt="Nikita Babbar" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6 border-t-4 border-primary-500">
                <h3 className="text-xl font-bold mb-2 text-primary-700">Nikita Babbar</h3>
                <p className="text-primary-600 mb-4">Technology & Innovation Lead</p>
                <p className="text-gray-600">
                  Driving technological innovation with expertise in full-stack development and AI integration. Passionate about creating scalable solutions that bridge the gender gap in the workforce.
                </p>
              </div>
            </div>
          </div>

           {/* Asha AI Feature */}
           <div className="mt-16 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Meet Asha AI Assistant</h3>
                <p className="text-gray-600 mb-6">
                  Our innovative AI-powered career assistant combines advanced machine learning with comprehensive career support to create meaningful opportunities for women in the workforce. Asha provides personalized guidance and real-time assistance throughout your professional journey.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2">Smart Job Matching</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Skill-based recommendations
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Experience level matching
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Location preferences
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2">Resume Analysis</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        ATS optimization tips
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Skill gap analysis
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Improvement suggestions
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2">Career Development</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Personalized learning paths
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Industry insights
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Skill development tracking
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2">Interview Preparation</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Role-specific practice
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Common questions
                      </li>
                      <li className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-primary-500 rounded-full mr-2"></span>
                        Feedback & improvement
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/3 space-y-4">
                {/* Chatbot Interface Preview */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-primary-100">
                  {/* Chatbot Header */}
                  <div className="bg-primary-600 text-white p-4">
                    <h4 className="font-semibold">Asha AI Assistant</h4>
                  </div>
                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 bg-gray-50">
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                        <p className="text-sm text-gray-800">Hi! I'm Asha, your AI career assistant. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-primary-600 text-white rounded-lg p-3 shadow-sm max-w-[80%]">
                        <p className="text-sm">I'm looking for job opportunities in tech.</p>
                      </div>
                    </div>
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg p-3 shadow-sm max-w-[80%]">
                        <p className="text-sm text-gray-800">I'll help you find the perfect tech role! Let's start by analyzing your skills and preferences.</p>
                      </div>
                    </div>
                  </div>
                  {/* Input Area */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center bg-gray-50 rounded-lg p-2">
                      <input
                        type="text"
                        placeholder="Type your message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                        disabled
                      />
                      <button className="text-primary-600 px-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Additional Image */}
                <img 
                  src="/cb.jpeg" 
                  alt="AI Assistant Visualization" 
                  className="w-full rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20 bg-primary-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Impact</h2>
            <p className="text-xl text-primary-100">Making a difference in women's careers across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <p className="text-primary-700">Women Empowered</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">1,000+</div>
              <p className="text-primary-700">Partner Companies</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <p className="text-primary-700">Cities Reached</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">Get in Touch</h2>
              <p className="text-xl text-primary-700">Connect with us to learn more about our initiatives</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all border-t-4 border-primary-500">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-primary-700">Address</h3>
                <p className="text-gray-600">
                  11 Kemwell House, Tumkur Road,<br />
                  Bengaluru – 560022
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all border-t-4 border-primary-500">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-primary-700">Phone</h3>
                <p className="text-gray-600">+91 81473 78390</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all border-t-4 border-primary-500">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2 text-primary-700">Website</h3>
                <p className="text-gray-600">jobsforherfoundation.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;