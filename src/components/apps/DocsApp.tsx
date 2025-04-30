import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, Mail, Info, Github as GitHub, FileText } from 'lucide-react';
import { useAppContext } from '../../store/AppContext';

const DocsApp: React.FC = () => {
  const { openWindow } = useAppContext();

  const appDocs = [
    {
      id: 'chat',
      name: 'Chat Application',
      icon: <MessageSquare className="text-primary-600" />,
      description: 'Chat with multiple robot personalities. Each robot has its own unique responses and conversation style.',
      instructions: [
        'Select a robot from the dropdown menu',
        'Type your message in the input field',
        'Press Enter or click the send button',
        'The robot will respond in its unique character style'
      ]
    },
    {
      id: 'lore',
      name: 'Robot Lore',
      icon: <BookOpen className="text-accent-600" />,
      description: 'Explore the background stories and lore for each robot character. Learn about their origins, personalities, and history.',
      instructions: [
        'Select a robot from the dropdown menu',
        'Read through the detailed lore and background story',
        'Discover unique facts about each robot character'
      ]
    },
    {
      id: 'inbox',
      name: 'Inbox',
      icon: <Mail className="text-secondary-600" />,
      description: 'View system notifications and messages from the robot characters.',
      instructions: [
        'Check for new notifications indicated by badges',
        'Read messages from robot characters',
        'Access system announcements and updates'
      ]
    },
    {
      id: 'docs',
      name: 'Documentation',
      icon: <FileText className="text-gray-600" />,
      description: 'This documentation app provides information about how to use the Robo AI desktop interface and its applications.',
      instructions: [
        'Click on application names to view detailed information',
        'Follow the instructions to get the most out of each app',
        'Explore tips and tricks for better interaction'
      ]
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: <GitHub className="text-black" />,
      description: 'Visit the GitHub repository for Robo AI to view source code, contribute, or report issues.',
      instructions: [
        'Click to open the GitHub repository in a window',
        'Explore the codebase and documentation',
        'Star the repository if you enjoy using Robo AI'
      ]
    },
    {
      id: 'x',
      name: 'X.com',
      icon: <Info className="text-blue-400" />,
      description: 'Follow Robo AI on X.com for the latest updates, announcements, and community interactions.',
      instructions: [
        'Click to open X.com in a window',
        'Follow the Robo AI account for updates',
        'Join the conversation with hashtag #RoboAI'
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-100 p-4 border-b">
        <div className="flex items-center space-x-3">
          <img
            src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033383/969e8418-590f-4a86-b62f-aefe1b29d49f-removebg-preview_1_svgyrf.png"
            alt="Docs"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Robo AI Documentation
            </h1>
            <p className="text-gray-600">Learn how to use the Robo AI desktop interface and applications</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {appDocs.map((app, index) => (
              <motion.div
                key={app.id}
                className="border-2 border-pink-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-white to-pink-50/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 flex items-center border-b border-pink-100">
                  <div className="mr-3">{app.icon}</div>
                  <h2 className="text-lg font-bold">{app.name}</h2>
                </div>
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{app.description}</p>
                  <h3 className="font-bold text-sm text-gray-600 mb-2">Instructions:</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
                    {app.instructions.map((instruction, i) => (
                      <li key={i} className="mb-1">{instruction}</li>
                    ))}
                  </ul>
                  <button
                    className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full hover:from-pink-500 hover:to-purple-500 transition-all w-full shadow-md hover:shadow-lg font-medium"
                    onClick={() => openWindow(app.id)}
                  >
                    Open {app.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsApp;