import { MessageSquare, MinusSquare, Send, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Message, useChatbotStore } from '../../store/chatbotStore';

const ChatbotWidget: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuthStore();
  
  const { 
    isOpen, 
    messages, 
    isTyping, 
    toggleChatbot, 
    sendMessage 
  } = useChatbotStore();
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  // Only show chatbot for authenticated users
  if (!isAuthenticated) {
    return null;
  }
  
  // ChatMessage component for individual messages
  const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
    const isBot = message.type === 'bot';
    
    return (
      <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
        <div 
          className={`max-w-[85%] p-3 rounded-lg ${
            isBot 
              ? 'bg-secondary-100 text-secondary-900 rounded-bl-none' 
              : 'bg-primary-600 text-white rounded-br-none'
          }`}
        >
          {message.text}
        </div>
      </div>
    );
  };
  
  // Toggle button for chatbot
  const ChatToggleButton = () => (
    <button
      onClick={toggleChatbot}
      className="fixed bottom-6 right-6 z-20 p-4 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-all"
    >
      <MessageSquare size={24} />
    </button>
  );
  
  if (!isOpen) {
    return <ChatToggleButton />;
  }
  
  return (
    <div className="fixed bottom-6 right-6 z-20 w-[350px] h-[500px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-primary-600 text-white px-4 py-3 flex items-center justify-between">
        <h3 className="font-semibold">Asha AI Assistant</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleChatbot}
            className="p-1 hover:bg-primary-500 rounded-full"
          >
            <MinusSquare size={18} />
          </button>
          <button 
            onClick={toggleChatbot}
            className="p-1 hover:bg-primary-500 rounded-full"
          >
            <X size={18} />
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-white">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-secondary-100 p-3 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-secondary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-secondary-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors disabled:bg-primary-300"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatbotWidget;