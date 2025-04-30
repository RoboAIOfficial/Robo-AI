import React from 'react';
import { useAppContext } from '../store/AppContext';
import { DesktopIcon as DesktopIconType } from '../types';

interface DesktopIconProps {
  icon: DesktopIconType;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, isSelected, onClick }) => {
  const { openWindow } = useAppContext();

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openWindow(icon.id);
  };

  return (
    <div
      className={`desktop-icon flex flex-col items-center cursor-pointer p-2 ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-1">
        <img src={icon.icon} alt={icon.label} className="max-w-full max-h-full" />
      </div>
      <div className="icon-label px-2 py-1 text-white text-center text-sm max-w-[96px]">
        {icon.label}
      </div>
    </div>
  );
};

export default DesktopIcon;