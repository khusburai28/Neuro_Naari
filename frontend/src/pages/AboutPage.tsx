import { Award, Briefcase, Globe, GraduationCap, Heart, Sparkles, Target, Users } from 'lucide-react';

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-16">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Empowering Women's Careers Since 2018
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            JobsForHer Foundation is dedicated to enhancing the status of women in the workplace and beyond, ensuring equal opportunities throughout India.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-6">
              <Target className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To create a world where every woman has the opportunity to achieve her full potential in the workforce, fostering a more inclusive and equitable professional landscape.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-6">
              <Heart className="w-12 h-12 text-primary-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To unlock women's untapped potential and enhance self-confidence through initiatives in education, skill development, and facilitating connections with various opportunities.
            </p>
          </div>
        </div>

        {/* Key Programs */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Innovative Programs</h2>
          
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Sparkles className="w-10 h-10 text-primary-600 mr-4" />
                <h3 className="text-2xl font-semibold">herShakti Program</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A first-of-its-kind government-industry consortium to upskill women in emerging technologies, presented in collaboration with the Karnataka Digital Economy Mission (KDEM).
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['AI/ML', 'Big Data', 'Blockchain', 'Cyber Security', 'IPA', 'Cloud Computing'].map((tech) => (
                  <div key={tech} className="bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-center text-sm">
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex items-center mb-6">
                <Globe className="w-10 h-10 text-primary-600 mr-4" />
                <h3 className="text-2xl font-semibold">DivHERsity.club</h3>
              </div>
              <p className="text-gray-600 mb-6">
                A member-only community for leaders committed to creating diverse and inclusive workplaces. The platform facilitates productive discussions around important DEI issues facing corporate India.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-secondary-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Who Can Join?</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• D&I Leaders</li>
                    <li>• HR & Talent Recruitment Heads</li>
                    <li>• Learning & Development Professionals</li>
                    <li>• VPs/AVPs and Directors</li>
                    <li>• CXOs and Founders</li>
                  </ul>
                </div>
                <div className="bg-secondary-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Benefits</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Exclusive networking opportunities</li>
                    <li>• Best practice sharing</li>
                    <li>• Access to research and insights</li>
                    <li>• Collaborative problem-solving</li>
                    <li>• Industry recognition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Leadership</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="public\neha.jpeg" 
                alt="Neha Bagaria" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Neha Bagaria</h3>
                <p className="text-primary-600 mb-4">Managing Trustee, JobsForHer Foundation</p>
                <p className="text-gray-600 mb-4">
                  A Wharton graduate and founder of HerKey, Neha's vision has been instrumental in creating opportunities for women in the workforce. Her work has earned recognition in Forbes India's WPower Trailblazers list and the BusinessLine Changemaker Awards 2023.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img 
                src="public\ashoksir.jpeg" 
                alt="Ashok Pamidi" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Ashok Pamidi</h3>
                <p className="text-primary-600 mb-4">Project Head – herShakti</p>
                <p className="text-gray-600 mb-4">
                  With 30 years of industry experience, including roles as CEO of NASSCOM Foundation and leadership positions at IBM and HP, Ashok brings valuable expertise to our initiatives.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <Award className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <p className="text-gray-600">Women Empowered</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <Briefcase className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">1,000+</div>
              <p className="text-gray-600">Partner Companies</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <p className="text-gray-600">Training Programs</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <p className="text-gray-600">City Chapters</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Involved</h2>
            <p className="text-xl text-gray-600">Join us in our mission to create equal opportunities for women in the workforce</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-2">Become a Member</h3>
              <p className="text-gray-600">Join our community and access exclusive resources and opportunities</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-2">Partner With Us</h3>
              <p className="text-gray-600">Collaborate with us to create more opportunities for women</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-2">Support Our Cause</h3>
              <p className="text-gray-600">Contribute to our initiatives and help make a difference</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;