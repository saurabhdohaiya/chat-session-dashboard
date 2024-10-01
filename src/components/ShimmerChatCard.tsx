import React from 'react';

const ShimmerChatCard: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 animate-pulse border border-gray-400 rounded-lg p-4">
      <div className="h-10 w-10 bg-gray-400 rounded-full"></div>
      <div className="flex-1 space-y-4">
        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="h-3 bg-gray-400 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ShimmerChatCard;
