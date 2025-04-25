import { create } from 'zustand';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'Workshop' | 'Webinar' | 'Conference' | 'Networking';
  location: string;
  imageUrl: string;
  registrationUrl?: string;
  isFeatured?: boolean;
  speakers?: {
    name: string;
    role: string;
    company: string;
    imageUrl?: string;
  }[];
}

interface EventState {
  events: Event[];
  filteredEvents: Event[];
  searchTerm: string;
  filter: {
    types: string[];
    upcoming: boolean;
  };
  
  // Actions
  setSearchTerm: (term: string) => void;
  toggleFilter: (filterType: 'types' | 'upcoming', value: string | boolean) => void;
  clearFilters: () => void;
  applyFilters: () => void;
}

// Sample events data
const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Women in Leadership Summit',
    description: 'Join us for this inspirational summit featuring women leaders from various industries sharing their journeys, challenges, and strategies for success.',
    date: '2023-06-20',
    time: '10:00 AM - 5:00 PM',
    type: 'Conference',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/2041627/pexels-photo-2041627.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-summit',
    isFeatured: true,
    speakers: [
      {
        name: 'Priya Sharma',
        role: 'CEO',
        company: 'TechInnovate',
        imageUrl: 'https://images.pexels.com/photos/3772509/pexels-photo-3772509.jpeg?auto=compress&cs=tinysrgb&w=60'
      },
      {
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'Global Systems',
        imageUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    ]
  },
  {
    id: '2',
    title: 'Resume Building Workshop',
    description: 'Learn how to craft a compelling resume that highlights your skills and experiences effectively. This workshop will provide practical tips and personalized feedback.',
    date: '2023-06-15',
    time: '2:00 PM - 4:00 PM',
    type: 'Workshop',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-workshop',
    speakers: [
      {
        name: 'Meera Patel',
        role: 'Career Coach',
        company: 'JobsForHer Foundation',
        imageUrl: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    ]
  },
  {
    id: '3',
    title: 'Tech Career Paths Webinar',
    description: 'Explore various career paths in the technology industry. This webinar will cover roles in development, product management, data science, and more.',
    date: '2023-06-28',
    time: '11:00 AM - 12:30 PM',
    type: 'Webinar',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-webinar',
    speakers: [
      {
        name: 'Divya Khosla',
        role: 'Director of Engineering',
        company: 'SoftTech Solutions',
        imageUrl: 'https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=60'
      }
    ]
  },
  {
    id: '4',
    title: 'Networking Mixer: Women in Finance',
    description: 'Connect with professionals in the finance industry, share experiences, and build your network in this informal mixer event.',
    date: '2023-07-05',
    time: '6:00 PM - 8:00 PM',
    type: 'Networking',
    location: 'Bangalore',
    imageUrl: 'https://images.pexels.com/photos/1181622/pexels-photo-1181622.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-mixer',
    isFeatured: true
  },
  {
    id: '5',
    title: 'Interview Preparation Masterclass',
    description: 'Master the art of interviewing with this comprehensive masterclass. Learn techniques to showcase your strengths and handle challenging questions with confidence.',
    date: '2023-07-10',
    time: '3:00 PM - 5:00 PM',
    type: 'Workshop',
    location: 'Virtual',
    imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-masterclass'
  },
  {
    id: '6',
    title: 'Women Entrepreneurs Forum',
    description: 'A platform for women entrepreneurs to share insights, discuss challenges, and explore collaboration opportunities. Join us for inspiring talks and productive discussions.',
    date: '2023-07-18',
    time: '10:00 AM - 3:00 PM',
    type: 'Conference',
    location: 'Mumbai',
    imageUrl: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
    registrationUrl: '#register-forum',
    isFeatured: true
  }
];

export const useEventStore = create<EventState>((set, get) => ({
  events: sampleEvents,
  filteredEvents: sampleEvents,
  searchTerm: '',
  filter: {
    types: [],
    upcoming: true
  },
  
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    get().applyFilters();
  },
  
  toggleFilter: (filterType: 'types' | 'upcoming', value: string | boolean) => {
    set(state => {
      if (filterType === 'upcoming') {
        return {
          filter: {
            ...state.filter,
            upcoming: value as boolean
          }
        };
      } else {
        const currentFilters = [...state.filter.types];
        const filterValue = value as string;
        const index = currentFilters.indexOf(filterValue);
        
        if (index === -1) {
          currentFilters.push(filterValue);
        } else {
          currentFilters.splice(index, 1);
        }
        
        return {
          filter: {
            ...state.filter,
            types: currentFilters
          }
        };
      }
    });
    
    get().applyFilters();
  },
  
  clearFilters: () => {
    set({
      searchTerm: '',
      filter: {
        types: [],
        upcoming: true
      }
    });
    
    get().applyFilters();
  },
  
  applyFilters: () => {
    const { searchTerm, filter, events } = get();
    
    let filtered = [...events];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.type.toLowerCase().includes(term)
      );
    }
    
    // Apply type filters
    if (filter.types.length > 0) {
      filtered = filtered.filter(event => filter.types.includes(event.type));
    }
    
    // Filter for upcoming events
    if (filter.upcoming) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today;
      });
    }
    
    set({ filteredEvents: filtered });
  }
}));