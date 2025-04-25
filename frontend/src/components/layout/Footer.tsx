import {
  Brain,
  Facebook,
  Heart,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Twitter,
  Youtube
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative mr-3">
                <Brain className="h-8 w-8 text-white" />
                <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-accent-400" />
                <Heart className="h-3 w-3 absolute -bottom-1 -right-1 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">JobsForHer Foundation</span>
                <span className="text-sm block text-white">By Team Neuro Naari</span>
              </div>
            </div>
            <p className="text-white text-lg mb-6">
              Empowering women to achieve their full potential in the workforce through innovative solutions and comprehensive support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/jobs" className="text-white hover:text-accent-400 transition-colors">Find Jobs</Link>
              </li>
              <li>
                <Link to="/events" className="text-white hover:text-accent-400 transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/mentorship" className="text-white hover:text-accent-400 transition-colors">Mentorship</Link>
              </li>
              <li>
                <Link to="/resources" className="text-white hover:text-accent-400 transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-accent-400 transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <MapPin size={20} className="text-white mr-3 mt-1 flex-shrink-0" />
                <span className="text-white">
                  Bangalore, Karnataka, India
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-white mr-3 flex-shrink-0" />
                <span className="text-white">team@neuronaari.com</span>
              </li>
            </ul>
          </div>
          
          {/* Team */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Team Neuro Naari</h3>
            <ul className="space-y-3 text-lg">
              <li className="text-white">Khusbu Rai - Team Leader</li>
              <li className="text-white">Manya Joshi - Team Member</li>
              <li className="text-white">Nikita Babbar - Team Member</li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/20 my-8" />
        
        {/* Copyright and Credits */}
        <div className="flex flex-col md:flex-row justify-between items-center text-white text-base">
          <div className="mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobsForHer Foundation. All rights reserved.
          </div>
          <div className="flex items-center space-x-2">
            <Brain size={16} className="text-white" />
            <span>Developed By Team Neuro Naari</span>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white hover:text-accent-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:text-accent-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;