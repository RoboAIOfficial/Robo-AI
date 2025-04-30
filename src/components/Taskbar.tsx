import React, { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

const Taskbar: React.FC = () => {
  const { windows, activeWindowId, openWindow, setActiveWindow, minimizeWindow } = useAppContext();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="w-full h-[var(--taskbar-height)] bg-gradient-to-b from-gray-900/95 to-gray-950/95 backdrop-blur-lg text-white flex items-center justify-between z-50 px-4 border-t border-white/5">
      <div className="flex items-center">
        <motion.button
          className="w-10 h-10 mr-4 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openWindow('chat')}
        >
          <img
            src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746029748/c3aa6b41-8834-43cd-9c7f-89fbd33d9e12_pxkgot.jpg"
            alt="Start"
            className="w-6 h-6"
          />
        </motion.button>

        <div className="flex items-center space-x-1">
          <AnimatePresence>
            {windows.map(window => {
              const icon = window.appId === 'chat'
                ? "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
                : window.appId === 'lore'
                ? "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/766aea9f-1f8a-4c83-a5bc-f7b2679714f6-removebg-preview_mli5oz.png"
                : "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033383/969e8418-590f-4a86-b62f-aefe1b29d49f-removebg-preview_1_svgyrf.png";
              
              return (
                <motion.button
                  key={window.id}
                  className={cn(
                    "h-8 px-2 rounded-md flex items-center transition-all border border-transparent",
                    activeWindowId === window.id && "bg-white/10 border-white/20",
                    !activeWindowId === window.id && "hover:bg-white/5 hover:border-white/10",
                    window.isMinimized && "opacity-50"
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={() => {
                    if (window.isMinimized) {
                      // Restore window if minimized
                      setActiveWindow(window.id);
                      minimizeWindow(window.id);
                    } else if (activeWindowId === window.id) {
                      // Minimize if clicking active window
                      minimizeWindow(window.id);
                    } else {
                      // Activate window
                      setActiveWindow(window.id);
                    }
                  }}
                >
                  <img
                    src={icon}
                    alt={window.title}
                    className="w-4 h-4 mr-2"
                  />
                  <span className="text-xs font-medium truncate max-w-24">{window.title}</span>
                </motion.button>
              );
            })}</AnimatePresence>
        </div>
      </div>

      <div className="flex items-center text-sm">
        <div className="px-3 py-1 hover:bg-white/5 rounded-md cursor-pointer transition-colors">
          <div className="text-center">{formatTime(time)}</div>
          <div className="text-center text-xs">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;