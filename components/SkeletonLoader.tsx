
import React from 'react';

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-12 bg-slate-800 rounded w-1/4"></div>
      <div className="h-64 bg-slate-800 rounded w-full"></div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded w-full"></div>
        <div className="h-4 bg-slate-800 rounded w-5/6"></div>
        <div className="h-4 bg-slate-800 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
