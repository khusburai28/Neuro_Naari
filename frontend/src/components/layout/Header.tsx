import {
  BookOpen,
  Brain,
  Briefcase,
  Calendar,
  ChevronDown,
  FileText,
  Heart,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  User,
  Users,
  X
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const isHomePage = location.pathname === '/';
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/events', label: 'Events', icon: Calendar },
    { path: '/mentorship', label: 'Mentorship', icon: Users },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/applications', label: 'Applications', icon: FileText },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled || !isHomePage 
          ? 'bg-white shadow-subtle py-3' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl transition-colors ${
                scrolled || !isHomePage 
                  ? 'bg-white' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <div className="relative">
                <Brain 
                  className={`h-8 w-8 ${
                    scrolled || !isHomePage ? 'text-primary-600' : 'text-white'
                  }`} 
                />
                <Sparkles 
                  className={`h-4 w-4 absolute -top-1 -right-1 ${
                    scrolled || !isHomePage ? 'text-accent-500' : 'text-primary-200'
                  }`} 
                />
                <Heart 
                  className={`h-3 w-3 absolute -bottom-1 -right-1 ${
                    scrolled || !isHomePage ? 'text-primary-400' : 'text-primary-200'
                  }`} 
                />
              </div>
                <div className="hidden sm:block">
                <span className={`text-xl font-bold ${
                  scrolled || !isHomePage ? 'text-primary-700' : 'text-white'
                }`}>
                  JobsForHer
                </span>
                <span className={`text-[10px] block ${
                  scrolled || !isHomePage ? 'text-primary-500' : 'text-primary-200'
                }`}>
                  By Team Neuro Naari
                </span>
                </div>
            </Link>
            
            {/* Desktop Navigation */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-1">
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link 
                    key={path}
                    to={path} 
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === path
                        ? 'bg-primary-100 text-primary-700'
                        : scrolled || !isHomePage
                        ? 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </nav>
            )}
          </div>
          
          {/* Right Side: Auth & User Menu */}
          <div className="flex items-center space-x-2">
            <Link 
              to="/about" 
              className={`hidden md:flex items-center px-3 py-2 rounded-lg transition-colors ${
                scrolled || !isHomePage
                  ? 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Info size={18} className="mr-2" />
              <span className="font-medium">About</span>
            </Link>
            
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    scrolled || !isHomePage
                      ? 'hover:bg-primary-50'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border-2 border-white"
                    />
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      scrolled || !isHomePage
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-white/10 text-white'
                    }`}>
                      <User size={18} />
                    </div>
                  )}
                  <span className={`text-sm font-medium ${
                    scrolled || !isHomePage ? 'text-gray-700' : 'text-white'
                  }`}>
                    {user.name}
                  </span>
                  <ChevronDown size={16} className={
                    scrolled || !isHomePage ? 'text-gray-500' : 'text-white/70'
                  } />
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    >
                      <User size={16} className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  to="/login"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    scrolled || !isHomePage
                      ? 'text-primary-600 hover:bg-primary-50 hover:text-primary-700'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup"
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    scrolled || !isHomePage
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-white text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  Sign up
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled || !isHomePage
                  ? 'text-gray-700 hover:bg-primary-50'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-subtle">
          <nav className="flex flex-col space-y-2">
            <Link 
              to="/about" 
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700"
            >
              <Info size={18} className="mr-2" />
              <span className="font-medium">About</span>
            </Link>
            
            {isAuthenticated && (
              <>
                {navItems.map(({ path, label, icon: Icon }) => (
                  <Link 
                    key={path}
                    to={path} 
                    className={`flex items-center px-3 py-2 rounded-lg ${
                      location.pathname === path
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-primary-50 hover:text-primary-700'
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </>
            )}
            
            {/* Mobile Authentication */}
            {!isAuthenticated ? (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link 
                  to="/login"
                  className="block px-3 py-2 rounded-lg text-center text-primary-600 hover:bg-primary-50 hover:text-primary-700 font-medium"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup"
                  className="block px-3 py-2 rounded-lg text-center bg-primary-600 text-white hover:bg-primary-700 font-medium"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center px-3 py-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover border border-primary-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700">
                      <User size={18} />
                    </div>
                  )}
                  <span className="ml-2 font-medium text-gray-700">{user?.name}</span>
                </div>
                <Link 
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                >
                  <User size={18} className="mr-2" />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-700"
                >
                  <LogOut size={18} className="mr-2" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;