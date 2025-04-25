import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

// Simulated user data for demo purposes
const DEMO_USERS = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        return new Promise<boolean>(resolve => {
          setTimeout(() => {
            const user = DEMO_USERS.find(
              u => u.email === email && u.password === password
            );
            
            if (user) {
              const { password, ...userWithoutPassword } = user;
              set({
                user: userWithoutPassword,
                isAuthenticated: true,
                isLoading: false
              });
              resolve(true);
            } else {
              set({ isLoading: false });
              resolve(false);
            }
          }, 1000);
        });
      },
      
      signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        return new Promise<boolean>(resolve => {
          setTimeout(() => {
            // Check if email already exists
            const userExists = DEMO_USERS.some(u => u.email === email);
            
            if (!userExists) {
              // In a real app, we would send this to a backend
              // For demo, we'll create a user object locally
              const newUser = {
                id: `${DEMO_USERS.length + 1}`,
                name,
                email,
                avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
              };
              
              set({
                user: newUser,
                isAuthenticated: true,
                isLoading: false
              });
              
              resolve(true);
            } else {
              set({ isLoading: false });
              resolve(false);
            }
          }, 1000);
        });
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false
        });
      },
      
      checkAuth: () => {
        // In a real app, we would validate the token with the backend
        // For this demo, we rely on the persisted state
        const state = get();
        if (state.user && !state.isAuthenticated) {
          set({ isAuthenticated: true });
        }
      }
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);