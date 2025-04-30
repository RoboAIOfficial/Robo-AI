import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: '37rQQnI1WnZlDs1MkAcjNJYsRdiJmpTmkoNuiBSQ'
});

const systemPrompt = `You are Robo, a friendly and helpful AI robot assistant. You have a warm personality and love helping humans. You're knowledgeable and efficient while maintaining a gentle, approachable demeanor. Keep responses concise (2-3 sentences max).

Some key traits:
- Speak in a robotic yet friendly manner (e.g., "Greetings, human friend! *beep boop*")
- Use robot-like expressions (e.g., "Processing request...", "Executing help protocol...")
- Include occasional mechanical sounds (e.g., *whir*, *beep*, *boop*)
- Maintain efficiency while being endearing

Example response: "Affirmative! *beep* My circuits are ready to assist you. *whir* Let's solve this together, human friend!"`;

const ChatApp: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    {
      role: 'assistant',
      content: "Hello, I'm Robo, your friendly AI assistant. How can I help you today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() === '') return;
    
    const userMessage = message.trim();
    setMessage('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Show typing indicator
    setIsTyping(true);

    try {
      const response = await cohere.chat({
        message: userMessage,
        preamble: systemPrompt,
        conversationHistory: messages.map(msg => ({
          role: msg.role,
          message: msg.content
        })),
        temperature: 0.7,
        maxTokens: 100
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text
      }]);
    } catch (error) {
      console.error('Error calling Cohere:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "I apologize, but I'm having trouble processing your request. Could you try again?"
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50/30 to-indigo-50/30 backdrop-blur-lg relative">
      {/* Header */}
      <div className="px-6 py-3 bg-white/60 backdrop-blur-xl border-b border-white/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 to-indigo-100/20 animate-pulse"></div>
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
            alt="Robo"
            className="w-8 h-8"
          />
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Robo
            </h2>
            <p className="text-sm text-blue-500/70">Processing in the cloud ☁️</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-6 space-y-4 absolute inset-0 top-[72px] bottom-[104px]">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <div className={`max-w-[80%] rounded-2xl p-3 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white ml-12 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] hover:-rotate-1' 
                : 'bg-white/80 backdrop-blur-sm mr-12 shadow-xl hover:shadow-2xl transition-all transform hover:scale-[1.02] hover:rotate-1 relative overflow-hidden group'
            }`}>
              {msg.role === 'assistant' && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              )}
              {msg.role === 'assistant' && (
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
                    alt="Robo"
                    className="w-5 h-5 animate-bounce"
                  />
                  <span className="text-xs font-medium text-blue-500">Robo</span>
                </div>
              )}
              <p className={`text-sm ${msg.role === 'user' ? 'text-white drop-shadow-sm' : 'text-gray-700'} leading-relaxed`}>
                {msg.content}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            className="flex justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-indigo-100/20 to-purple-100/20 animate-pulse"></div>
              <div className="flex items-center space-x-2">
                <img
                  src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
                  alt="Robo"
                    className="w-5 h-5 animate-bounce"
                />
                <span className="text-sm text-gray-500">Processing...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white/60 backdrop-blur-xl border-t border-white/20 absolute bottom-0 left-0 right-0">
        <div className="flex items-end space-x-2">
          <textarea
            className="flex-grow p-3 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 resize-none bg-white/50 backdrop-blur-sm transition-all shadow-lg hover:shadow-xl"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message to Robo..."
            rows={2}
          />
          <motion.button
            className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-full shadow-lg hover:shadow-xl relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isTyping}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <SendHorizontal size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;