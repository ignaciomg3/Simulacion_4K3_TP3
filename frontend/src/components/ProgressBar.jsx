// src/components/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ progress, className = '', height = 'h-2' }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height} ${className}`}>
      <div 
        className="bg-gradient-to-r from-primary-400 to-primary-600 h-full transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;