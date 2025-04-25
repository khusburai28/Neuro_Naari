import React from 'react';
import ActivityTimeline from './ActivityTimeline';

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'application' | 'interview' | 'offer' | 'event' | 'course';
}

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-100 p-6">
      <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
      <ActivityTimeline activities={activities} />
    </div>
  );
};

export default RecentActivity;