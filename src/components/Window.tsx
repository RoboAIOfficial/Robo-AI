import React, { ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Square, X, Cloud } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { AppWindow, Position, Size } from '../types';

interface WindowProps {
  window: AppWindow;
  isActive: boolean;
  children: ReactNode;
}

const calculateInitialPosition = (position: Position, size: Size): Position => {
  const maxX = window.innerWidth - size.width - 20;
  const maxY = window.innerHeight - size.height - 70;
  
  return {
    x: Math.min(Math.max(position.x, 20), maxX),
    y: Math.min(Math.max(position.y, 20), maxY)
  };
};

const Window: React.FC<WindowProps> = ({ window, isActive, children }) => {
  const { 
    closeWindow, 
    minimizeWindow, 
    maximizeWindow, 
    setActiveWindow,
    updateWindowPosition,
    updateWindowSize
  } = useAppContext();
  
  const initialPosition = calculateInitialPosition(window.position, window.size);

  if (window.isMinimized) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(window.id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(window.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.appId !== 'chat') {
      maximizeWindow(window.id);
    }
  };
  return (
      <Rnd
        className="floating-window"
        style={{
          zIndex: isActive ? 1000 : window.zIndex,
          display: window.isMinimized ? 'none' : 'block',
          pointerEvents: 'auto'
        }}
        default={{
          x: initialPosition.x,
          y: initialPosition.y,
          width: window.size.width,
          height: window.size.height,
        }}
        position={{
          x: window.isMaximized ? 0 : initialPosition.x,
          y: window.isMaximized ? 0 : initialPosition.y,
        }}
        size={{
          width: window.isMaximized ? window.innerWidth : window.size.width,
          height: window.isMaximized ? window.innerHeight - 50 : window.size.height,
        }}
        minWidth={250}
        minHeight={150}
        enableResizing={window.appId !== 'chat'}
        disableDragging={window.isMaximized || window.appId === 'chat'}
        bounds="parent"
        onDragStart={() => {
          if (!isActive) {
            setActiveWindow(window.id);
          }
        }}
        onDragStop={(e, d) => {
          updateWindowPosition(window.id, d.x, d.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          updateWindowSize(
            window.id,
            parseInt(ref.style.width),
            parseInt(ref.style.height)
          );
          updateWindowPosition(window.id, position.x, position.y);
        }}
        dragHandleClassName="window-title-bar"
      >
        <div 
          className="window h-full flex flex-col relative rounded-xl bg-white/90 backdrop-blur-sm overflow-hidden"
          onClick={() => {
            if (!isActive) {
              setActiveWindow(window.id);
            }
          }}
        >
          <div 
            className="window-title-bar flex items-center justify-between px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500"
          >
            <div className="flex items-center">
              <img 
                src={window.appId === 'chat' 
                  ? "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/89ac77f9-cdd4-4a51-8516-6b7c021aece4-removebg-preview_ldzyms.png"
                  : window.appId === 'lore'
                  ? "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033321/766aea9f-1f8a-4c83-a5bc-f7b2679714f6-removebg-preview_mli5oz.png"
                  : "https://res.cloudinary.com/dtm10i7bj/image/upload/v1746033383/969e8418-590f-4a86-b62f-aefe1b29d49f-removebg-preview_1_svgyrf.png"} 
                alt={window.title}
                className="w-4 h-4 mr-2"
              />
              <div className="text-sm font-medium truncate">{window.title}</div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="w-5 h-5 flex items-center justify-center rounded-full bg-yellow-300 hover:bg-yellow-400 transition-colors"
                onClick={handleMinimize}
              >
                <Minus size={14} className="text-yellow-700" />
              </button>
              {window.appId !== 'chat' && (
                <button
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-green-300 hover:bg-green-400 transition-colors"
                  onClick={handleMaximize}
                >
                  <Square size={14} className="text-green-700" />
                </button>
              )}
              <button
                className="w-5 h-5 flex items-center justify-center rounded-full bg-red-300 hover:bg-red-400 transition-colors"
                onClick={handleClose}
              >
                <X size={14} className="text-red-700" />
              </button>
            </div>
          </div>
          <div className="window-content flex-grow overflow-hidden relative">
            {children}
          </div>
        </div>
      </Rnd>
    );
};

export default Window;