import React from 'react';
import { BriefcaseIcon, Calendar, Users, BookOpen, TrendingUp, Target } from 'lucide-react';
import StatsCard from './StatsCard';

interface DashboardStatsProps {
  stats: {
    applications: number;
    interviews: number;
    savedJobs: number;
    upcomingEvents: number;
    coursesInProgress: number;
    mentorshipSessions: number;
    profileViews: number;
    profileStrength: number;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatsCard
        title="Applications"
        value={stats.applications}
        icon={BriefcaseIcon}
        color="bg-primary-600"
        trend={{ value: 15, isPositive: true }}
      />
      
      <StatsCard
        title="Interviews"
        value={stats.interviews}
        icon={Users}
        color="bg-accent-600"
        trend={{ value: 20, isPositive: true }}
      />
      
      <StatsCard
        title="Profile Views"
        value={stats.profileViews}
        icon={TrendingUp}
        color="bg-secondary-600"
        trend={{ value: 8, isPositive: true }}
      />
      
      <StatsCard
        title="Profile Strength"
        value={`${stats.profileStrength}%`}
        icon={Target}
        color="bg-primary-600"
      />
    </div>
  );
};

export default DashboardStats;