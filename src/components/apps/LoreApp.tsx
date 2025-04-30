import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getAllRobots } from '../../data/robots';
import { cn } from '../../utils/cn';

const robots = getAllRobots();

const LoreApp: React.FC = () => {
  const [selectedRobot, setSelectedRobot] = useState(robots[0].id);
  const [activeTab, setActiveTab] = useState<'story' | 'gallery' | 'stats'>('story');
  
  const robot = robots.find(r => r.id === selectedRobot) || robots[0];
  
  // Function to convert markdown headings to HTML
  const formatLore = (lore: string) => {
    return lore
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-blue-100">
        <div className="flex items-center">
          <div className="flex-grow">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746029748/c3aa6b41-8834-43cd-9c7f-89fbd33d9e12_pxkgot.jpg"
                alt="Lore"
                className="w-10 h-10 animate-pulse"
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Robot Chronicles & Tales
              </h1>
            </div>
            <select
              className="p-3 border-2 border-blue-200 rounded-xl w-full bg-white/50 backdrop-blur-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all shadow-sm hover:shadow-md"
              value={selectedRobot}
              onChange={(e) => setSelectedRobot(e.target.value)}
            >
              {robots.map(robot => (
                <option key={robot.id} value={robot.id}>
                  {robot.name} - {robot.personality}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          {(['story', 'gallery', 'stats'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === tab
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-blue-50 text-gray-600"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-6 bg-gradient-to-br from-white to-blue-50/30">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-blue-100"
        >
          <div className="flex items-center mb-8">
            <div className="w-32 h-32 mr-6 flex-shrink-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 animate-pulse" />
              <img src={robot.avatar} alt={robot.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
                {robot.name}
              </h1>
              <p className="text-gray-600 italic bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-2 rounded-full inline-block shadow-sm">
                {robot.personality}
              </p>
            </div>
          </div>

          {activeTab === 'story' && (
            <motion.div 
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-3xl -z-10 animate-pulse" />
              <div 
                className="max-w-none bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-8 shadow-inner relative overflow-hidden"
                dangerouslySetInnerHTML={{ __html: formatLore(robot.lore) }}
              />
            </motion.div>
          )}
          
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-3 gap-6">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <img src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png" alt="Chat" className="w-20 h-20 object-contain mb-3" />
                <span className="text-sm font-medium text-gray-700">Chat</span>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <img src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/766aea9f-1f8a-4c83-a5bc-f7b2679714f6-removebg-preview_mli5oz.png" alt="Lore" className="w-20 h-20 object-contain mb-3" />
                <span className="text-sm font-medium text-gray-700">Lore</span>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-pink-100 to-blue-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group hover:shadow-xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                <img src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033383/969e8418-590f-4a86-b62f-aefe1b29d49f-removebg-preview_1_svgyrf.png" alt="Docs" className="w-20 h-20 object-contain mb-3" />
                <span className="text-sm font-medium text-gray-700">Docs</span>
              </div>
            </div>
          )}
          
          {activeTab === 'stats' && (
            <div className="space-y-6 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl -z-10" />
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold mb-4">Personality Traits</h3>
                <div className="space-y-4">
                  {['Friendliness', 'Intelligence', 'Creativity', 'Efficiency'].map(trait => (
                    <div key={trait} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{trait}</span>
                        <span className="text-blue-600 font-medium bg-blue-100/50 px-2 rounded-full">{Math.floor(Math.random() * 40) + 60}%</span>
                      </div>
                      <div className="h-2 bg-blue-100 rounded-full overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 animate-pulse" />
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoreApp;