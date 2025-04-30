import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import WindowManager from './components/WindowManager';
import { AppProvider } from './store/AppContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-indigo-900"
          >
            <div className="text-center relative">
              <div className="relative w-48 h-48">
                <div className="loading-spinner"></div>
                <motion.img
                  src="https://res.cloudinary.com/dtm10i7bj/image/upload/v1746029748/c3aa6b41-8834-43cd-9c7f-89fbd33d9e12_pxkgot.jpg"
                  alt="Robo AI"
                  className="absolute inset-0 m-auto w-24 h-24 object-cover rounded-full shadow-2xl"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            <div className="flex-grow relative overflow-hidden">
              <Desktop />
              <WindowManager />
            </div>
            <Taskbar />
          </motion.div>
        )}
      </AnimatePresence>
    </AppProvider>
  );
}

export default App;