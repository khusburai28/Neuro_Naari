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

// Predefined responses for the chatbot
const botResponses: Record<string, string | string[]> = {
  welcome: "Hi there! 👋 I'm Asha, your AI career assistant from JobsForHer Foundation. I can help you with job searches, career advice, resume tips, and more!",
  
  greeting: [
    "Hello! I'm here to support your career journey. How can I assist you today?",
    "Hi! I'm your JobsForHer Foundation assistant. What would you like help with?",
    "Welcome! I'm here to help you achieve your career goals. What can I do for you?"
  ],
  
  jobs: [
    "I can help you find the perfect job opportunity! Would you like to:",
    "1. Search for specific roles",
    "2. Get job application tips",
    "3. Track your applications",
    "4. Receive personalized job recommendations",
    "Just let me know what interests you!"
  ].join('\n'),
  
  applications: [
    "I can help you manage your job applications effectively. Here's what I can do:",
    "1. Track application status",
    "2. Set reminders for follow-ups",
    "3. Prepare for interviews",
    "4. Organize application materials",
    "What would you like to know more about?"
  ].join('\n'),
  
  interview: [
    "Here are some interview preparation tips:",
    "1. Research the company thoroughly",
    "2. Practice common interview questions",
    "3. Prepare relevant examples of your work",
    "4. Have questions ready for the interviewer",
    "Would you like specific tips for any of these areas?"
  ].join('\n'),
  
  resume: [
    "I can help you optimize your resume! Here's what we can focus on:",
    "1. ATS optimization",
    "2. Highlighting key achievements",
    "3. Professional formatting",
    "4. Industry-specific keywords",
    "Which aspect would you like to improve?"
  ].join('\n'),
  
  skills: [
    "Based on current market trends, these skills are in high demand:",
    "1. Data Analysis & AI",
    "2. Digital Marketing",
    "3. Project Management",
    "4. UX/UI Design",
    "Would you like resources to develop any of these skills?"
  ].join('\n'),
  
  mentorship: [
    "Our mentorship program offers:",
    "1. One-on-one guidance from industry experts",
    "2. Career development workshops",
    "3. Networking opportunities",
    "4. Skill-building sessions",
    "Would you like to connect with a mentor?"
  ].join('\n'),
  
  events: [
    "Stay updated with our upcoming events:",
    "1. Career workshops",
    "2. Industry networking sessions",
    "3. Skill development webinars",
    "4. Leadership seminars",
    "Would you like to register for any events?"
  ].join('\n'),
  
  default: [
    "I'm here to help! Would you like to know about:",
    "1. Job opportunities",
    "2. Application tracking",
    "3. Career development",
    "4. Upcoming events",
    "Just let me know what interests you!"
  ].join('\n')
};

// Helper function to get random response from array or return single response
const getResponse = (key: string): string => {
  const response = botResponses[key] || botResponses.default;
  if (Array.isArray(response)) {
    return response[Math.floor(Math.random() * response.length)];
  }
  return response;
};

// Helper to generate responses based on user input
const generateBotResponse = (userMessage: string): string => {
  const lowerCaseMessage = userMessage.toLowerCase();
  
  if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi ') || lowerCaseMessage.includes('hey')) {
    return getResponse('greeting');
  }
  
  if (lowerCaseMessage.includes('job') || lowerCaseMessage.includes('work') || lowerCaseMessage.includes('career')) {
    return getResponse('jobs');
  }
  
  if (lowerCaseMessage.includes('application') || lowerCaseMessage.includes('apply') || lowerCaseMessage.includes('status')) {
    return getResponse('applications');
  }
  
  if (lowerCaseMessage.includes('interview') || lowerCaseMessage.includes('prepare')) {
    return getResponse('interview');
  }
  
  if (lowerCaseMessage.includes('resume') || lowerCaseMessage.includes('cv')) {
    return getResponse('resume');
  }
  
  if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('learn') || lowerCaseMessage.includes('improve')) {
    return getResponse('skills');
  }
  
  if (lowerCaseMessage.includes('mentor') || lowerCaseMessage.includes('guidance') || lowerCaseMessage.includes('advice')) {
    return getResponse('mentorship');
  }
  
  if (lowerCaseMessage.includes('event') || lowerCaseMessage.includes('workshop') || lowerCaseMessage.includes('webinar')) {
    return getResponse('events');
  }
  
  return getResponse('default');
};

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
              text: getResponse('welcome'),
              timestamp: Date.now()
            }
          ]
        }));
      }, 500);
    }
  },
  
  sendMessage: (text: string) => {
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
    
    // Simulate bot thinking and respond after a delay
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: Date.now().toString(),
            type: 'bot',
            text: botResponse,
            timestamp: Date.now()
          }
        ],
        isTyping: false
      }));
    }, 1500);
  },
  
  clearMessages: () => {
    set({ messages: [] });
  }
}));