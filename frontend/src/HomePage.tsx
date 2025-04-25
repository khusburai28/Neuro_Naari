import React from 'react';
import { Link } from 'react-router-dom';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
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
        className="min-h-screen flex items-center relative overflow-hidden"
        style={{
          backgroundImage: 'url("https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=1920")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
              {heroText}
              <Cursor cursorStyle="_" />
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90">
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
      
      {/* Leadership Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Neha Bagaria" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Neha Bagaria</h3>
                <p className="text-primary-600 mb-4">Managing Trustee, JobsForHer Foundation</p>
                <p className="text-secondary-600">
                  A Wharton graduate and founder of HerKey, Neha's vision has been instrumental in creating opportunities for women in the workforce. Her work has earned recognition in Forbes India's WPower Trailblazers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/5989925/pexels-photo-5989925.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Ashok Pamidi" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Ashok Pamidi</h3>
                <p className="text-primary-600 mb-4">Project Head – herShakti</p>
                <p className="text-secondary-600">
                  With over 30 years of industry experience, including roles as CEO of NASSCOM Foundation and leadership positions at IBM and HP, Ashok brings valuable expertise to our initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-secondary-600">Making a difference in women's careers across India</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-secondary-50 rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">50,000+</div>
              <p className="text-secondary-600">Women Empowered</p>
            </div>
            
            <div className="bg-secondary-50 rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">1,000+</div>
              <p className="text-secondary-600">Partner Companies</p>
            </div>
            
            <div className="bg-secondary-50 rounded-xl p-8 shadow-lg text-center transform hover:-translate-y-1 transition-all">
              <div className="text-4xl font-bold text-primary-600 mb-2">100+</div>
              <p className="text-secondary-600">Cities Reached</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 bg-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
              <p className="text-xl text-secondary-600">Connect with us to learn more about our initiatives</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Address</h3>
                <p className="text-secondary-600">
                  11 Kemwell House, Tumkur Road,<br />
                  Bengaluru – 560022
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-secondary-600">+91 81473 78390</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all">
                <div className="text-primary-600 mb-4">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Website</h3>
                <p className="text-secondary-600">jobsforherfoundation.org</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;