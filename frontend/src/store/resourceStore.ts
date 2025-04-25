import { create } from 'zustand';

export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'template' | 'course';
  category: string;
  description: string;
  imageUrl: string;
  author?: string;
  date: string;
  readTime?: string;
  duration?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags: string[];
  url?: string;
  isBookmarked?: boolean;
  downloads?: number;
  views?: number;
  rating?: number;
}

interface ResourceState {
  resources: Resource[];
  filteredResources: Resource[];
  searchTerm: string;
  filters: {
    types: string[];
    categories: string[];
    levels: string[];
    tags: string[];
  };
  
  // Actions
  setSearchTerm: (term: string) => void;
  toggleFilter: (filterType: keyof ResourceState['filters'], value: string) => void;
  clearFilters: () => void;
  applyFilters: () => void;
  toggleBookmark: (resourceId: string) => void;
}

// Sample resources data
const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Building a Successful Career in Tech as a Woman',
    type: 'article',
    category: 'Career Development',
    description: 'Insights and strategies for navigating the tech industry and overcoming common challenges faced by women.',
    imageUrl: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=350',
    author: 'Dr. Priya Sharma',
    date: '2023-06-10',
    readTime: '8 min',
    tags: ['Technology', 'Career Growth', 'Women in Tech'],
    views: 1250,
    rating: 4.8
  },
  // Add more sample resources...
];

export const useResourceStore = create<ResourceState>((set, get) => ({
  resources: sampleResources,
  filteredResources: sampleResources,
  searchTerm: '',
  filters: {
    types: [],
    categories: [],
    levels: [],
    tags: []
  },
  
  setSearchTerm: (term: string) => {
    set({ searchTerm: term });
    get().applyFilters();
  },
  
  toggleFilter: (filterType: keyof ResourceState['filters'], value: string) => {
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
        categories: [],
        levels: [],
        tags: []
      }
    });
    
    set({ filteredResources: get().resources });
  },
  
  applyFilters: () => {
    const { searchTerm, filters, resources } = get();
    
    let filtered = [...resources];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(term) ||
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([filterType, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter(resource => {
          switch (filterType) {
            case 'types':
              return values.includes(resource.type);
            case 'categories':
              return values.includes(resource.category);
            case 'levels':
              return values.includes(resource.level || '');
            case 'tags':
              return resource.tags.some(tag => values.includes(tag));
            default:
              return true;
          }
        });
      }
    });
    
    set({ filteredResources: filtered });
  },
  
  toggleBookmark: (resourceId: string) => {
    set(state => ({
      resources: state.resources.map(resource =>
        resource.id === resourceId
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
      ),
      filteredResources: state.filteredResources.map(resource =>
        resource.id === resourceId
          ? { ...resource, isBookmarked: !resource.isBookmarked }
          : resource
      )
    }));
  }
}));