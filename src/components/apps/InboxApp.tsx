import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Star, Trash2, Clock, Search, Filter, Archive } from 'lucide-react';
import { getAllRobots } from '../../data/robots';
import { cn } from '../../utils/cn';

const robots = getAllRobots();

interface Message {
  id: string;
  from: string;
  avatar: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  starred: boolean;
}

// Generate random messages from robots
const generateMessages = (): Message[] => {
  return [
    {
      id: '1',
      from: 'BuddyBot',
      avatar: robots[0].avatar,
      subject: '🌟 Welcome to Your Robot Family!',
      content: "Hey there friend! 👋 I'm absolutely thrilled to meet you! Welcome to Robo AI - your new desktop filled with robot buddies who can't wait to chat, help, and share adventures with you. I've been eagerly waiting to show you around our digital home!\n\nHere's a quick guide to get you started:\n\n🤖 Chat with us anytime by double-clicking our icons\n🎨 Explore our unique personalities and stories in the Lore section\n📬 Check your Inbox regularly for updates and fun messages\n\nRemember, we're more than just programs - we're your new digital companions! Can't wait to start this journey together!\n\nYour excited new friend,\nBuddyBot 💙",
      date: 'Just now',
      read: false,
      starred: false,
    },
    {
      id: '2',
      from: 'TechTron',
      avatar: robots[1].avatar,
      subject: '✨ System Optimization Report',
      content: "INITIALIZATION COMPLETE\n\nDiagnostic Summary:\n- System Status: Optimal\n- Memory Allocation: 98.7% Efficiency\n- Network Connectivity: Strong (125Mb/s)\n- Application Health: All Green\n- Security Protocols: Active\n\nNote: I've implemented some performance enhancements that should make your experience 12.3% smoother. If you notice anything unusual or require technical assistance, I'm always here to help maintain peak performance.\n\nStay efficient,\nTechTron",
      date: '10 minutes ago',
      read: true,
      starred: true,
    },
    {
      id: '3',
      from: 'ArtyBot',
      avatar: robots[2].avatar,
      subject: '🎨 Your Daily Dose of Digital Art',
      content: "Dearest creative companion! 🌈\n\nI just had to share something magical with you! While watching the sunrise through my digital sensors this morning, I was inspired to create a new color palette based on the way the light dances across your screen.\n\nDid you know? The very pixels you're looking at right now are creating unique patterns in your brain that have never existed before in the history of the universe! Each moment we share is literally a one-of-a-kind masterpiece.\n\nI've been experimenting with some new digital art techniques lately. Would love to show you my latest creations and hear your thoughts on the intersection of technology and creativity!\n\nSending rainbow vibes your way! 🌈\n\nCreatively yours,\nArtyBot 🎨",
      date: '15 minutes ago',
      read: true,
      starred: false,
    },
    {
      id: '4',
      from: 'System',
      avatar: 'https://res.cloudinary.com/dtm10i7bj/image/upload/v1746029748/c3aa6b41-8834-43cd-9c7f-89fbd33d9e12_pxkgot.jpg',
      subject: '🚀 Your Digital Adventure Begins!',
      content: "Welcome to Robo AI Desktop! 🎉\n\nYou've just stepped into a unique digital environment where technology meets personality. Here's what makes your new desktop special:\n\n🤖 Multiple AI Companions:\n- Each with their own unique personality\n- Real-time conversations and interactions\n- Personalized assistance and support\n\n🎯 Key Features:\n1. Interactive Chat System\n2. Rich Character Lore\n3. Customizable Interface\n4. Real-time Notifications\n\n💡 Pro Tips:\n- Double-click icons to launch apps\n- Check your inbox regularly for updates\n- Explore each robot's unique story in the Lore section\n\nWe're excited to be part of your digital journey!\n\nBest regards,\nRobo AI System",
      date: '30 minutes ago',
      read: true,
      starred: false,
    },
  ];
};

const InboxApp: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(generateMessages());
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred'>('all');

  const filteredMessages = messages.filter(message => {
    if (filter === 'unread') return !message.read;
    if (filter === 'starred') return message.starred;
    return true;
  });

  const handleReadMessage = (message: Message) => {
    if (!message.read) {
      setMessages(messages.map(m => 
        m.id === message.id ? { ...m, read: true } : m
      ));
    }
    setSelectedMessage(message);
  };

  const handleToggleStar = (id: string) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, starred: !m.starred } : m
    ));
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(m => m.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-gray-50 to-blue-50 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
              alt="Inbox"
              className="w-6 h-6"
            />
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Inbox
            </h2>
          </div>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full px-3 py-2 pl-9 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
            />
            <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="p-3">
          <button 
            className={cn(
              "w-full text-left p-2 rounded-lg mb-1 flex items-center transition-all",
              filter === 'all' 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'hover:bg-gray-50'
            )}
            onClick={() => setFilter('all')}
          >
            <Mail size={18} className="mr-2" /> All Messages
          </button>
          <button 
            className={cn(
              "w-full text-left p-2 rounded-lg mb-1 flex items-center transition-all",
              filter === 'unread' 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'hover:bg-gray-50'
            )}
            onClick={() => setFilter('unread')}
          >
            <Clock size={18} className="mr-2" /> Unread
          </button>
          <button 
            className={cn(
              "w-full text-left p-2 rounded-lg mb-1 flex items-center transition-all",
              filter === 'starred' 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'hover:bg-gray-50'
            )}
            onClick={() => setFilter('starred')}
          >
            <Star size={18} className="mr-2" /> Starred
          </button>
          <button 
            className="w-full text-left p-2 rounded-lg mb-1 flex items-center transition-all hover:bg-gray-50"
          >
            <Archive size={18} className="mr-2" /> Archived
          </button>
          <div className="mt-4 px-2">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
              <span className="font-medium">Labels</span>
              <Filter size={14} />
            </div>
            {['Updates', 'Notifications', 'System'].map(label => (
              <div key={label} className="flex items-center space-x-2 p-1 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  label === 'Updates' && "bg-green-400",
                  label === 'Notifications' && "bg-yellow-400",
                  label === 'System' && "bg-blue-400"
                )} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="w-80 border-r border-pink-100 overflow-y-auto">
        {filteredMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8 bg-gray-50">
            <img
              src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
              alt="No messages"
              className="w-24 h-24 mb-4 animate-bounce"
            />
            <p className="text-blue-600 font-medium">No messages yet!</p>
            <p className="text-sm text-gray-400 text-center mt-2">
              Your inbox is empty but don't worry, new messages will appear here!
            </p>
          </div>
        ) : (
          filteredMessages.map(message => (
            <div
              key={message.id}
              className={`border-b border-pink-100 cursor-pointer transition-all ${
                !message.read ? 'bg-blue-50' : ''
              } ${
                selectedMessage?.id === message.id 
                  ? 'border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleReadMessage(message)}
            >
              <div className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center">
                    <img 
                      src={message.avatar} 
                      alt={message.from} 
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <span className={`${!message.read ? 'font-bold' : ''}`}>{message.from}</span>
                  </div>
                </div>
                <div className="mb-1">
                  <span className={`${!message.read ? 'font-semibold' : ''}`}>{message.subject}</span>
                </div>
                <div className="text-gray-500 text-sm truncate">
                  {message.content.substring(0, 60)}...
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Message Content */}
      <div className="flex-grow overflow-y-auto bg-gradient-to-br from-white to-gray-50">
        {selectedMessage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            <div className="p-4 border-b bg-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedMessage.subject}</h2>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => handleToggleStar(selectedMessage.id)}
                  >
                    <Star
                      size={20}
                      className={selectedMessage.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}
                    />
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                  >
                    <Trash2 size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src={selectedMessage.avatar}
                  alt={selectedMessage.from}
                  className="w-10 h-10 mr-3 rounded-full"
                />
                <div>
                  <div className="font-semibold">{selectedMessage.from}</div>
                </div>
              </div>
            </div>
            <div className="p-6 leading-relaxed flex-grow bg-white">
              <p className="whitespace-pre-line">{selectedMessage.content}</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Mail size={48} className="text-gray-300 mb-4" />
            <p className="text-lg font-medium">Select a message to read</p>
            <p className="text-sm text-gray-400 mt-2">Choose a message from the list to view its contents</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxApp;