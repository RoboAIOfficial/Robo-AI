import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../store/AppContext';
import DesktopIcon from './DesktopIcon';

const Desktop: React.FC = () => {
  const { icons } = useAppContext();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  return (
    <div 
      className="absolute inset-0 bg-desktop-wallpaper bg-cover bg-center overflow-hidden"
      onClick={() => setSelectedIcon(null)}
    >
      <div className="absolute inset-0 p-4 grid grid-cols-[repeat(auto-fill,100px)] gap-4 content-start">
        {icons.map((icon) => (
          <motion.div
            key={icon.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: icons.indexOf(icon) * 0.1 }}
            style={{ gridColumn: Math.floor(icon.position.x / 100) + 1, gridRow: Math.floor(icon.position.y / 100) + 1 }}
          >
            <DesktopIcon 
              icon={icon} 
              isSelected={selectedIcon === icon.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIcon(icon.id);
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Desktop;