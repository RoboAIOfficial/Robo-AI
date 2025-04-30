import React from 'react';
import { FileText, Github, Twitter } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import Window from './Window';
import ChatApp from './apps/ChatApp';
import LoreApp from './apps/LoreApp';
import DocsApp from './apps/DocsApp';
import InboxApp from './apps/InboxApp';
import ExternalLinkApp from './apps/ExternalLinkApp';

const WindowManager: React.FC = () => {
  const { windows, activeWindowId } = useAppContext();

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case 'chat':
        return <ChatApp />;
      case 'lore':
        return <LoreApp />;
      case 'docs':
        return <ExternalLinkApp 
          url="https://robo-ai-2.gitbook.io/robo-ai/" 
          title="Documentation"
          icon={<FileText size={48} className="text-gray-800" />}
          description="Explore our comprehensive documentation to learn everything about Robo AI's features, capabilities, and how to get the most out of your robot companions!" 
        />;
      case 'inbox':
        return <InboxApp />;
      case 'github':
        return <ExternalLinkApp 
          url="https://github.com/RoboAIOfficial/Robo-AI" 
          title="GitHub"
          icon={<Github size={48} className="text-gray-800" />}
          description="Visit our GitHub repository to explore the code, contribute, or report issues. Don't forget to star the project if you like it!" 
        />;
      case 'x':
        return <ExternalLinkApp 
          url="https://x.com/RoboAIyours" 
          title="X.com"
          icon={<Twitter size={48} className="text-blue-400" />}
          description="Follow us on X.com for the latest updates, announcements, and community interactions!" 
        />;
      default:
        return <div className="p-4">App not found</div>;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {windows.map((window) => (
        <Window
          key={window.id}
          window={window}
          isActive={window.id === activeWindowId}
        >
          {getAppComponent(window.appId)}
        </Window>
      ))}
    </div>
  );
};

export default WindowManager;