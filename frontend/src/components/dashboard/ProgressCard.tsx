import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProgressCardProps {
  title: string;
  progress: number;
  icon: LucideIcon;
  color: string;
  total: number;
  completed: number;
  nextItem?: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  progress,
  icon: Icon,
  color,
  total,
  completed,
  nextItem
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-secondary-100 hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center mr-3`}>
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm text-secondary-600 mb-1">
          <span>{completed} of {total} completed</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${color.replace('bg-', 'bg-')} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {nextItem && (
        <div className="text-sm">
          <span className="text-secondary-500">Next up:</span>
          <p className="font-medium text-secondary-700 mt-1">{nextItem}</p>
        </div>
      )}
    </div>
  );
};

export default ProgressCard;