import React, { useState } from 'react';

const EventList = () => {
  const [filter, setFilter] = useState('all');
  
  // Mock event data
  const events = [
    {
      id: 1,
      title: 'Orientation Welcome',
      category: 'orientation',
      date: '2025-03-10',
      time: '9:00 AM - 12:00 PM',
      location: 'Main Hall Auditorium',
      description: 'Welcome session for new students with campus tours and introductions to faculty.'
    },
    {
      id: 2,
      title: 'Computer Science Symposium',
      category: 'academic',
      date: '2025-03-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Science Center Room 201',
      description: 'Annual symposium featuring research presentations and keynote speakers in computer science.'
    },
    {
      id: 3,
      title: 'Spring Concert',
      category: 'cultural',
      date: '2025-03-20',
      time: '7:00 PM - 10:00 PM',
      location: 'Performing Arts Center',
      description: 'Annual spring concert featuring student bands and special musical guests.'
    },
    {
      id: 4,
      title: 'Career Fair',
      category: 'career',
      date: '2025-03-25',
      time: '11:00 AM - 3:00 PM',
      location: 'Student Union Ballroom',
      description: 'Connect with over 50 employers across various industries for internships and job opportunities.'
    },
    {
      id: 5,
      title: 'Basketball Championship',
      category: 'sports',
      date: '2025-03-18',
      time: '6:00 PM - 8:00 PM',
      location: 'Recreation Center',
      description: 'Final game of the intramural basketball tournament. Come support your fellow students!'
    },
    {
      id: 6,
      title: 'Student Club Fair',
      category: 'social',
      date: '2025-03-12',
      time: '12:00 PM - 3:00 PM',
      location: 'Campus Quad',
      description: 'Explore over 100 student clubs and organizations. Find your community on campus!'
    }
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);
  
  // Get category color
  const getCategoryColor = (category) => {
    switch(category) {
      case 'orientation': return '#4a6bff';
      case 'academic': return '#48bb78';
      case 'cultural': return '#9f7aea';
      case 'career': return '#ed8936';
      case 'sports': return '#e53e3e';
      case 'social': return '#4299e1';
      default: return '#4a5568';
    }
  };
  
  // Format date from YYYY-MM-DD to Month Day format
  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="mb-4">Campus Events</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <div>
              <h3 className="mb-2">Upcoming Events</h3>
              <p>Discover what's happening on campus</p>
            </div>
            
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setFilter('all')} 
                  className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
                >
                  All
                </button>
                {['orientation', 'academic', 'cultural', 'career', 'sports', 'social'].map(category => (
                  <button 
                    key={category}
                    onClick={() => setFilter(category)} 
                    className={`btn ${filter === category ? 'btn-primary' : 'btn-outline'}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-3">
        {filteredEvents.map(event => (
          <div key={event.id} className="card">
            <div 
              style={{ 
                padding: '2rem 1rem', 
                backgroundColor: getCategoryColor(event.category),
                color: 'white',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{formatDate(event.date)}</div>
              <div style={{ textTransform: 'uppercase', fontSize: '0.8rem', opacity: '0.9' }}>{event.category}</div>
            </div>
            <div className="card-body">
              <h3 className="card-title">{event.title}</h3>
              <p className="card-text">{event.description}</p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                  </svg>
                  <span>{event.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                  <span>{event.location}</span>
                </div>
              </div>
              
              <button className="btn btn-primary mt-3">Add to Calendar</button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredEvents.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p>No events found in this category. Please try another filter.</p>
        </div>
      )}
    </div>
  );
};

export default EventList;