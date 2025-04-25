import React from 'react';
import { useNavigate } from 'react-router-dom';
import UpcomingCard from './UpcomingCard';

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location?: string;
  isOnline: boolean;
}

interface UpcomingEventsProps {
  events: Event[];
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const navigate = useNavigate();
  
  return (
    <UpcomingCard 
      events={events} 
      onViewAll={() => navigate('/events')} 
    />
  );
};

export default UpcomingEvents;