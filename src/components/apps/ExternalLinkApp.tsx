import React from 'react';
import { ReactNode } from 'react';

interface ExternalLinkAppProps {
  url: string;
  title: string;
  icon?: ReactNode;
  description?: string;
}

const ExternalLinkApp: React.FC<ExternalLinkAppProps> = ({ url, title, icon, description }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-white to-pink-50/30 p-8">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            {icon}
          </div>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="mb-6 text-gray-600">
            {description || `This link will take you to ${title} in a new tab.`}
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            Open {title} in a new tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExternalLinkApp;