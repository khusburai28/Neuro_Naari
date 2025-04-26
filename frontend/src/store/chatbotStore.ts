import { create } from 'zustand';

export type MessageType = 'user' | 'bot';

export interface Message {
  id: string;
  type: MessageType;
  text: string;
  timestamp: number;
}

interface ChatbotState {
  isOpen: boolean;
  messages: Message[];
  isTyping: boolean;
  
  // Actions
  toggleChatbot: () => void;
  sendMessage: (text: string) => void;
  clearMessages: () => void;
}

// Welcome message
const welcomeMessage = "Hi there! 👋 I'm Asha, your AI career assistant from JobsForHer Foundation. I can help you with job searches, career advice, resume tips, and more!";

export const useChatbotStore = create<ChatbotState>((set, get) => ({
  isOpen: false,
  messages: [],
  isTyping: false,
  
  toggleChatbot: () => {
    const { isOpen, messages } = get();
    
    set({ isOpen: !isOpen });
    
    // If opening the chatbot and no messages, send welcome message
    if (!isOpen && messages.length === 0) {
      setTimeout(() => {
        set(state => ({
          messages: [
            ...state.messages,
            {
              id: Date.now().toString(),
              type: 'bot',
              text: welcomeMessage,
              timestamp: Date.now()
            }
          ]
        }));
      }, 500);
    }
  },
  
  sendMessage: async (text: string) => {
    // Add user message
    set(state => ({
      messages: [
        ...state.messages,
        {
          id: Date.now().toString(),
          type: 'user',
          text,
          timestamp: Date.now()
        }
      ],
      isTyping: true
    }));
    
    try {
      // Call the API
      const response = await fetch('https://neuro-naari.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'bot',
            text: data.response,
            timestamp: Date.now()
          }
        ],
        isTyping: false
      }));
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Fallback error message
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'bot',
            text: "Sorry, I'm having trouble connecting right now. Please try again later.",
            timestamp: Date.now()
          }
        ],
        isTyping: false
      }));
    }
  },
  
  clearMessages: () => {
    set({ messages: [] });
  }
}));
