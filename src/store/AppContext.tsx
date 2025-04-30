import React, { createContext, useState, useContext, useCallback } from 'react';
import { AppWindow, DesktopIcon } from '../types';
import { initialIcons } from '../data/icons';
import { getRobotByName } from '../data/robots';

interface AppContextType {
  windows: AppWindow[];
  activeWindowId: string | null;
  icons: DesktopIcon[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  setActiveWindow: (id: string | null) => void;
  updateWindowPosition: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  chats: Record<string, { messages: Array<{ sender: 'user' | 'bot', content: string, timestamp: number }> }>;
  addChatMessage: (robotId: string, content: string, sender: 'user' | 'bot') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [windows, setWindows] = useState<AppWindow[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [icons] = useState<DesktopIcon[]>(initialIcons);
  const [chats, setChats] = useState<Record<string, { messages: Array<{ sender: 'user' | 'bot', content: string, timestamp: number }> }>>({});

  const openWindow = useCallback((appId: string) => {
    // Check if window already exists
    const existingWindow = windows.find(w => w.appId === appId);
    
    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w => 
          w.id === existingWindow.id ? { ...w, isMinimized: false } : w
        ));
      }
      setActiveWindowId(existingWindow.id);
      return;
    }

    const windowWidth = appId === 'chat' ? 800 : 700;
    const windowHeight = 600;
    const maxX = window.innerWidth - windowWidth - 20;
    const maxY = window.innerHeight - windowHeight - 100;
    
    const chatWindowSize = {
      width: 800,
      height: 550
    };
    
    // Calculate a random position for the new window
    const x = appId === 'chat' 
      ? (window.innerWidth - chatWindowSize.width) / 2 
      : Math.max(20, Math.floor(Math.random() * maxX));
    const y = appId === 'chat'
      ? 100
      : Math.max(20, Math.floor(Math.random() * maxY));
    
    const newWindow: AppWindow = {
      id: `window-${Date.now()}`,
      appId,
      title: icons.find(icon => icon.id === appId)?.label || appId,
      position: { x, y },
      size: appId === 'chat' ? chatWindowSize : { width: 600, height: 400 },
      isMinimized: false,
      isMaximized: false,
      zIndex: windows.length + 1,
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    };
    
    if (appId === 'chat' && !chats['robo-default']) {
      initializeChat('robo-default');
    }
    
    setWindows([...windows, newWindow]);
    setActiveWindowId(newWindow.id);
  }, [windows, icons, chats]);

  const closeWindow = useCallback((id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      // Set the next available window as active, or null if none
      const remainingWindows = windows.filter(w => w.id !== id);
      setActiveWindowId(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  }, [windows, activeWindowId]);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
    if (activeWindowId === id) {
      // Set the next visible window as active, or null if none
      const visibleWindows = windows.filter(w => !w.isMinimized && w.id !== id);
      setActiveWindowId(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null);
    }
  }, [windows, activeWindowId]);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, [windows]);

  const updateWindowPosition = useCallback((id: string, x: number, y: number) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, position: { x, y } } : w
    ));
  }, [windows]);

  const updateWindowSize = useCallback((id: string, width: number, height: number) => {
    setWindows(windows.map(w => 
      w.id === id ? { ...w, size: { width, height } } : w
    ));
  }, [windows]);

  const initializeChat = (robotId: string) => {
    const robot = getRobotByName(robotId);
    setChats(prev => ({
      ...prev,
      [robotId]: {
        messages: [
          {
            sender: 'bot',
            content: robot.greeting,
            timestamp: Date.now()
          }
        ]
      }
    }));
  };

  const addChatMessage = useCallback((robotId: string, content: string, sender: 'user' | 'bot') => {
    if (!chats[robotId]) {
      initializeChat(robotId);
    }
    
    setChats(prev => ({
      ...prev,
      [robotId]: {
        messages: [
          ...(prev[robotId]?.messages || []),
          {
            sender,
            content,
            timestamp: Date.now()
          }
        ]
      }
    }));
  }, [chats]);

  return (
    <AppContext.Provider
      value={{
        windows,
        activeWindowId,
        icons,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        setActiveWindow: setActiveWindowId,
        updateWindowPosition,
        updateWindowSize,
        chats,
        addChatMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};