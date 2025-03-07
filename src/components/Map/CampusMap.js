import React, { useState, useEffect } from 'react';

const CampusMap = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Mock building data
  const buildings = [
    { id: 1, name: 'Main Hall', type: 'academic', description: 'The central academic building housing administration offices and lecture halls.' },
    { id: 2, name: 'Science Center', type: 'academic', description: 'Home to state-of-the-art laboratories and research facilities.' },
    { id: 3, name: 'Library', type: 'academic', description: 'Our central library with study spaces, digital archives, and extensive collections.' },
    { id: 4, name: 'Student Union', type: 'social', description: 'The heart of campus life with dining options, meeting spaces, and student services.' },
    { id: 5, name: 'Recreation Center', type: 'athletic', description: 'Modern athletic facilities including a gym, pool, and various sports courts.' },
    { id: 6, name: 'Dormitory Girls', type: 'housing', description: 'Girls dormitory with modern amenities and community spaces.' },
    { id: 7, name: 'Dormitory Boys', type: 'housing', description: 'Boys dormitory with modern amenities and community spaces.' },
    { id: 8, name: 'Performing Arts Center', type: 'cultural', description: 'Venue for theatrical productions, concerts, and cultural events.' }
  ];

  // Simulate loading a map
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBuildingClick = (building) => {
    setSelectedBuilding(building);
  };

  // Get building color based on type
  const getBuildingColor = (type) => {
    switch(type) {
      case 'academic': return '#4a6bff';
      case 'social': return '#ff7846';
      case 'athletic': return '#48bb78';
      case 'housing': return '#ed8936';
      case 'cultural': return '#9f7aea';
      default: return '#4a5568';
    }
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <h1 className="mb-4">Campus Map</h1>
      
      <div className="grid grid-2" style={{ gap: '2rem' }}>
        <div>
          <div className="card mb-4">
            <div className="card-header">
              <h2 className="card-title">Interactive Map</h2>
            </div>
            <div className="card-body">
              {!mapLoaded ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <div>Loading map...</div>
                </div>
              ) : (
                <div className="map-container">
                  {/* This would normally be a real map component like Leaflet or Google Maps */}
                  <div style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#e2e8f0',
                    
                    position: 'relative',
                  }}>
                    {/* Simulated building markers */}
                    {buildings.map((building, index) => {
                      // Calculate position (would be actual coordinates in real app)
                      const left = 10 + (index % 4) * 25;
                      const top = 10 + Math.floor(index / 4) * 25;
                      
                      return (
                        <div 
                          key={building.id}
                          onClick={() => handleBuildingClick(building)}
                          style={{
                            position: 'absolute',
                            left: `${left}%`,
                            top: `${top}%`,
                            width: '60px',
                            height: '60px',
                            backgroundColor: getBuildingColor(building.type),
                            border: selectedBuilding?.id === building.id ? '3px solid black' : '1px solid rgba(0,0,0,0.2)',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: '0.8rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transform: selectedBuilding?.id === building.id ? 'scale(1.1)' : 'scale(1)',
                          }}
                        >
                          {building.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Legend</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {['academic', 'social', 'athletic', 'housing', 'cultural'].map(type => (
                  <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ 
                      width: '16px', 
                      height: '16px', 
                      backgroundColor: getBuildingColor(type),
                      borderRadius: '3px'
                    }}></div>
                    <span style={{ textTransform: 'capitalize' }}>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">
                {selectedBuilding ? selectedBuilding.name : 'Building Information'}
              </h2>
            </div>
            <div className="card-body">
              {selectedBuilding ? (
                <div>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: '200px', 
                      backgroundColor: getBuildingColor(selectedBuilding.type),
                      borderRadius: '8px',
                      marginBottom: '1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '2rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {selectedBuilding.name}
                  </div>
                  
                  <h3 className="mb-2">Description</h3>
                  <p className="mb-4">{selectedBuilding.description}</p>
                  
                  <h3 className="mb-2">Facilities</h3>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    <li>Wi-Fi Access</li>
                    <li>Wheelchair Accessible</li>
                    <li>Restrooms</li>
                    <li>Water Fountains</li>
                  </ul>
                  
                  <div className="mt-4">
                    <button className="btn btn-primary">Get Directions</button>
                    <button className="btn btn-outline" style={{ marginLeft: '0.5rem' }}>Take Virtual Tour</button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                  <p>Select a building on the map to view detailed information</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-header">
              <h3 className="card-title">Campus Tour Schedule</h3>
            </div>
            <div className="card-body">
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--gray)' }}>
                  <strong>Monday - Friday:</strong> 10:00 AM, 1:00 PM, 3:00 PM
                </li>
                <li style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--gray)' }}>
                  <strong>Saturday:</strong> 11:00 AM, 2:00 PM
                </li>
                <li style={{ padding: '0.75rem 0' }}>
                  <strong>Sunday:</strong> By appointment only
                </li>
              </ul>
              <div className="mt-3">
                <button className="btn btn-primary">Book a Tour</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;