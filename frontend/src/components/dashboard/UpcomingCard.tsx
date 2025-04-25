import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location?: string;
  isOnline: boolean;
}

interface UpcomingCardProps {
  events: Event[];
  onViewAll: () => void;
}

const UpcomingCard: React.FC<UpcomingCardProps> = ({ events, onViewAll }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-secondary-100">
      <div className="p-6 border-b border-secondary-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">Upcoming Events</h3>
          <button
            onClick={onViewAll}
            className="text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View all
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-secondary-100">
        {events.map(event => (
          <div key={event.id} className="p-4 hover:bg-secondary-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-secondary-900">{event.title}</h4>
              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                {event.type}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-secondary-500 space-x-4">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{event.time}</span>
              </div>
              {event.location && (
                <div className="flex items-center">
                  <MapPin size={14} className="mr-1" />
                  <span>{event.location}</span>
                </div>
              )}
              {event.isOnline && (
                <span className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded-full">
                  Online
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingCard;