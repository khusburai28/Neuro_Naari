import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter, X, Users } from 'lucide-react';
import { useEventStore, Event } from '../store/eventStore';

const EventsPage: React.FC = () => {
  const { 
    events, 
    filteredEvents, 
    searchTerm, 
    filter,
    setSearchTerm, 
    toggleFilter, 
    clearFilters 
  } = useEventStore();
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Event types for filters
  const eventTypes = ['Workshop', 'Webinar', 'Conference', 'Networking'];
  
  // Toggle mobile filter
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get featured events
  const featuredEvents = filteredEvents.filter(event => event.isFeatured);
  
  return (
    <div className="bg-secondary-50 pt-24 pb-16 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Events & Workshops</h1>
          
          {/* Mobile Filter Toggle */}
          <button 
            className="md:hidden btn-secondary flex items-center"
            onClick={toggleMobileFilter}
          >
            <Filter size={18} className="mr-2" />
            Filters
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-card p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-secondary-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search events by name, topic, or location"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full input-field"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={clearFilters}
                className="btn-secondary flex-shrink-0"
                disabled={!searchTerm && filter.types.length === 0 && filter.upcoming}
              >
                <X size={18} className="mr-2" />
                Clear
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-full md:w-72 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-lg shadow-card p-6">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              
              {/* Event Type Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Event Type</h3>
                <div className="space-y-2">
                  {eventTypes.map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filter.types.includes(type)}
                        onChange={() => toggleFilter('types', type)}
                        className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-secondary-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Upcoming Events Filter */}
              <div>
                <h3 className="font-medium mb-3">Time Period</h3>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filter.upcoming}
                    onChange={() => toggleFilter('upcoming', !filter.upcoming)}
                    className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-secondary-700">Show only upcoming events</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 z-50 bg-secondary-900 bg-opacity-50 flex items-end sm:items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button onClick={toggleMobileFilter} className="text-secondary-500 hover:text-secondary-700">
                      <X size={24} />
                    </button>
                  </div>
                  
                  {/* Event Type Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Event Type</h3>
                    <div className="space-y-2">
                      {eventTypes.map(type => (
                        <label key={type} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={filter.types.includes(type)}
                            onChange={() => toggleFilter('types', type)}
                            className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-secondary-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Upcoming Events Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Time Period</h3>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filter.upcoming}
                        onChange={() => toggleFilter('upcoming', !filter.upcoming)}
                        className="h-4 w-4 text-primary-600 border-secondary-300 rounded focus:ring-primary-500"
                      />
                      <span className="ml-2 text-secondary-700">Show only upcoming events</span>
                    </label>
                  </div>
                  
                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => {
                        clearFilters();
                        toggleMobileFilter();
                      }}
                      className="btn-secondary flex-1"
                    >
                      Clear Filters
                    </button>
                    
                    <button 
                      onClick={toggleMobileFilter}
                      className="btn-primary flex-1"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Event Listings */}
          <div className="flex-1">
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Featured Events</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {featuredEvents.map(event => (
                    <div 
                      key={event.id}
                      className="card overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                                {formatDate(event.date)}
                              </div>
                              <div className="text-sm text-secondary-500">{event.time}</div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          </div>
                          <div className="bg-accent-100 text-accent-600 px-2 py-1 rounded text-xs font-semibold uppercase">
                            Featured
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-secondary-500 mb-3">
                          <MapPin size={16} className="mr-1" />
                          <span>{event.location}</span>
                          <span className="mx-2">•</span>
                          <span>{event.type}</span>
                        </div>
                        <p className="text-secondary-600 mb-4 line-clamp-2">
                          {event.description}
                        </p>
                        {event.speakers && event.speakers.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center">
                              <Users size={16} className="text-secondary-500 mr-2" />
                              <span className="text-sm text-secondary-500">
                                {event.speakers.length} Speaker{event.speakers.length > 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                        )}
                        <button className="btn-primary w-full">Register Now</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Events */}
            <h2 className="text-2xl font-bold mb-4">All Events</h2>
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents
                  .filter(event => !event.isFeatured)
                  .map(event => (
                    <div 
                      key={event.id}
                      className="card overflow-hidden hover:shadow-md transition-shadow"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-5">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full text-sm font-medium">
                            {formatDate(event.date)}
                          </div>
                          <div className="text-sm text-secondary-500">{event.time}</div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                        <div className="flex items-center text-sm text-secondary-500 mb-3">
                          <MapPin size={14} className="mr-1" />
                          <span>{event.location}</span>
                          <span className="mx-2">•</span>
                          <span>{event.type}</span>
                        </div>
                        <p className="text-secondary-600 mb-4 text-sm line-clamp-2">
                          {event.description}
                        </p>
                        <button className="btn-secondary w-full text-sm">Register Now</button>
                      </div>
                    </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <p className="text-secondary-500 mb-2">No events match your search criteria</p>
                <button 
                  onClick={clearFilters}
                  className="text-primary-600 font-medium hover:text-primary-700"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-secondary-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <img 
                  src={selectedEvent.imageUrl} 
                  alt={selectedEvent.title} 
                  className="w-full h-64 object-cover"
                />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-secondary-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {formatDate(selectedEvent.date)}
                  </div>
                  <div className="text-sm text-secondary-500">{selectedEvent.time}</div>
                  <div className="flex items-center text-sm text-secondary-600">
                    <MapPin size={16} className="mr-1" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="bg-secondary-100 text-secondary-700 px-3 py-1 rounded-full text-sm">
                    {selectedEvent.type}
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">About this event</h3>
                  <p className="text-secondary-700">
                    {selectedEvent.description}
                  </p>
                </div>
                
                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Speakers</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEvent.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-center p-3 bg-secondary-50 rounded-lg">
                          <div className="w-12 h-12 rounded-full bg-secondary-200 flex-shrink-0 mr-3">
                            {speaker.imageUrl ? (
                              <img 
                                src={speaker.imageUrl} 
                                alt={speaker.name} 
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <Users size={20} className="text-secondary-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-semibold">{speaker.name}</h4>
                            <p className="text-sm text-secondary-600">{speaker.role}, {speaker.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button className="btn-primary flex-1">Register Now</button>
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;