import React, { useState, useRef, useEffect } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import { ChevronDown } from 'lucide-react';

const ThicknessDropdown = ({ currentThickness, handleThicknessChange }: { currentThickness: number, handleThicknessChange: (thickness: number) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSelectThickness = (thickness: number) => {
    handleThicknessChange(thickness);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 space-x-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        <FaSlidersH size={14} className="text-gray-600" />
        <span className="text-sm text-gray-700">Espessura: {currentThickness}px</span>
        <div 
          className="mx-1 bg-gray-700 rounded-full" 
          style={{ 
            width: `${Math.min(currentThickness * 1.5, 16)}px`, 
            height: `${Math.min(currentThickness * 1.5, 16)}px` 
          }}
        />
        <ChevronDown size={16} className="text-gray-600" />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-10 w-48 py-1 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 border-b border-gray-100">
            Selecione a espessura
          </div>
          
          {[4, 8, 12, 16].map(thickness => (
            <button
              key={thickness}
              onClick={() => onSelectThickness(thickness)}
              className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              <div className="flex items-center w-full space-x-3">
                <div 
                  className="bg-gray-700 rounded-full" 
                  style={{ 
                    width: `${Math.min(thickness * 1.5, 16)}px`, 
                    height: `${Math.min(thickness * 1.5, 16)}px` 
                  }}
                />
                <span>{thickness}px</span>
                
                {currentThickness === thickness && (
                  <div className="ml-auto">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThicknessDropdown;