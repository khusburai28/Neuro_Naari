import React from 'react';
import { Circle } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'application' | 'interview' | 'offer' | 'event' | 'course';
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities }) => {
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'application':
        return 'bg-primary-500';
      case 'interview':
        return 'bg-accent-500';
      case 'offer':
        return 'bg-green-500';
      case 'event':
        return 'bg-yellow-500';
      case 'course':
        return 'bg-pink-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {activities.map((activity, activityIdx) => (
          <li key={activity.id}>
            <div className="relative pb-8">
              {activityIdx !== activities.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-secondary-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getActivityColor(
                      activity.type
                    )}`}
                  >
                    <Circle className="h-4 w-4 text-white" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-secondary-900 font-medium">{activity.title}</p>
                    <p className="mt-0.5 text-sm text-secondary-500">{activity.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-secondary-500">
                    {activity.timestamp}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityTimeline;