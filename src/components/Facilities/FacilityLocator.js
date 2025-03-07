import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './FacilityLocator.css';

// Fix for default marker icon in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different categories
const createCategoryIcon = (category) => {
  return L.icon({
    iconUrl: `${process.env.PUBLIC_URL}/icons/${category}-marker.png`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const FacilityLocator = () => {
  // CMR University Lakeside Campus coordinates
  const CAMPUS_COORDINATES = [13.0827, 77.5877]; // Bangalore CMR University Lakeside Campus
  
  const [facilities, setFacilities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [mapCenter, setMapCenter] = useState(CAMPUS_COORDINATES);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // CMR University Lakeside Campus facilities
  useEffect(() => {
    // Simulating API call with setTimeout
    setIsLoading(true);
    setTimeout(() => {
      const cmrFacilities = [
        { 
          id: 1, 
          name: 'Main Academic Block', 
          category: 'academic', 
          description: 'Houses classrooms, faculty offices, and administrative departments', 
          location: [13.0832, 77.5880], 
          hours: '8AM - 6PM',
          amenities: ['Wi-Fi', 'Air Conditioning', 'Elevator Access']
        },
        { 
          id: 2, 
          name: 'CMR Lakeside Library', 
          category: 'academic', 
          description: 'Comprehensive collection of books, journals, and digital resources with study spaces', 
          location: [13.0835, 77.5875], 
          hours: '8AM - 9PM',
          amenities: ['Wi-Fi', 'Computer Labs', 'Discussion Rooms', 'Quiet Reading Areas']
        },
        { 
          id: 3, 
          name: 'Student Center', 
          category: 'services', 
          description: 'Hub for student activities, clubs, and organizations', 
          location: [13.0828, 77.5868], 
          hours: '7AM - 8PM',
          amenities: ['Event Spaces', 'Student Lounge', 'Club Meeting Rooms']
        },
        { 
          id: 4, 
          name: 'Sports Complex', 
          category: 'athletics', 
          description: 'Includes indoor sports facilities, cricket field, and basketball courts', 
          location: [13.0820, 77.5882], 
          hours: '6AM - 9PM',
          amenities: ['Gym', 'Indoor Games', 'Outdoor Fields', 'Swimming Pool']
        },
        { 
          id: 5, 
          name: 'CMR Innovation Center', 
          category: 'academic', 
          description: 'Research and innovation hub with labs and project spaces', 
          location: [13.0838, 77.5885], 
          hours: '9AM - 8PM',
          amenities: ['Research Labs', 'Maker Spaces', 'Conference Rooms']
        },
        { 
          id: 6, 
          name: 'Lakeside Cafeteria', 
          category: 'dining', 
          description: 'Main dining facility with multiple food options and lakeside views', 
          location: [13.0825, 77.5865], 
          hours: '7:30AM - 9PM',
          amenities: ['Multiple Cuisines', 'Outdoor Seating', 'Veg and Non-Veg Options']
        },
        { 
          id: 7, 
          name: 'Health & Wellness Center', 
          category: 'services', 
          description: 'Medical services and counseling for students and staff', 
          location: [13.0830, 77.5870], 
          hours: '8AM - 6PM',
          amenities: ['First Aid', 'Doctor on Call', 'Counseling Services']
        },
        { 
          id: 8, 
          name: 'Engineering Block', 
          category: 'academic', 
          description: 'Houses engineering departments with specialized labs and workshops', 
          location: [13.0836, 77.5890], 
          hours: '8AM - 7PM',
          amenities: ['Computer Labs', 'Engineering Workshops', 'Project Studios']
        },
        { 
          id: 9, 
          name: 'Management Building', 
          category: 'academic', 
          description: 'Home to business and management departments with modern facilities', 
          location: [13.0833, 77.5895], 
          hours: '8AM - 7PM',
          amenities: ['Case Study Rooms', 'Conference Halls', 'Bloomberg Terminal']
        },
        { 
          id: 10, 
          name: 'Student Hostels', 
          category: 'housing', 
          description: 'On-campus accommodation for students with modern amenities', 
          location: [13.0815, 77.5875], 
          hours: 'Open 24/7',
          amenities: ['Wi-Fi', 'Laundry Services', 'Common Rooms', 'Security']
        },
        { 
          id: 11, 
          name: 'Lakeside Garden', 
          category: 'recreation', 
          description: 'Beautiful garden area beside the lake for relaxation and events', 
          location: [13.0820, 77.5860], 
          hours: 'Open 24/7',
          amenities: ['Seating Areas', 'Walking Paths', 'Event Space']
        },
        { 
          id: 12, 
          name: 'Auditorium', 
          category: 'services', 
          description: 'Multi-purpose hall for conferences, seminars, and cultural events', 
          location: [13.0840, 77.5875], 
          hours: '9AM - 6PM (Event Based)',
          amenities: ['Advanced AV System', 'Seating for 500', 'Stage Lighting']
        }
      ];
      setFacilities(cmrFacilities);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredFacilities = facilities.filter(facility => {
    const matchesCategory = selectedCategory === 'all' || facility.category === selectedCategory;
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { value: 'all', label: 'All Facilities' },
    { value: 'academic', label: 'Academic Buildings' },
    { value: 'services', label: 'Student Services' },
    { value: 'athletics', label: 'Athletic Facilities' },
    { value: 'dining', label: 'Dining' },
    { value: 'housing', label: 'Housing' },
    { value: 'recreation', label: 'Recreation' }
  ];

  const handleFacilityClick = (facility) => {
    setSelectedFacility(facility);
    setMapCenter(facility.location);
    if (mapInstance) {
      mapInstance.flyTo(facility.location, 17, {
        duration: 1.5,
        animate: true
      });
    }
  };

  // For accessibility
  const handleKeyPress = (event, facility) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleFacilityClick(facility);
    }
  };

  return (
    <div className="facility-locator">
      <div className="facility-header">
        <h1>CMR University Lakeside Campus Map</h1>
        <p>Explore facilities across the CMR University Bangalore Lakeside Campus</p>
      </div>

      <div className="facility-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search facilities"
          />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
            aria-label="Filter by category"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="facility-content">
        <div className="facility-list">
          <h2>Campus Facilities ({filteredFacilities.length})</h2>
          
          {isLoading ? (
            <div className="loading-facilities">
              <div className="loading-spinner"></div>
              <p>Loading campus facilities...</p>
            </div>
          ) : filteredFacilities.length === 0 ? (
            <p className="no-results">No facilities match your search. Try adjusting your filters.</p>
          ) : (
            <ul className="facilities-list">
              {filteredFacilities.map(facility => (
                <li 
                  key={facility.id} 
                  className={`facility-item ${selectedFacility && selectedFacility.id === facility.id ? 'selected' : ''}`}
                  onClick={() => handleFacilityClick(facility)}
                  onKeyPress={(e) => handleKeyPress(e, facility)}
                  tabIndex="0"
                  aria-label={`${facility.name}, ${facility.category} facility`}
                >
                  <div className="facility-icon" data-category={facility.category}></div>
                  <div className="facility-content">
                    <h3>{facility.name}</h3>
                    <p className="facility-category">{facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}</p>
                    <p className="facility-description">{facility.description}</p>
                    <p className="facility-hours"><strong>Hours:</strong> {facility.hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="facility-map">
          <MapContainer 
            center={mapCenter} 
            zoom={16} 
            style={{ height: '100%', width: '100%' }}
            whenCreated={(mapInst) => {
              setMapInstance(mapInst);
              mapInst.on('click', () => {
                setSelectedFacility(null);
              });
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Campus boundary outline - approximated */}
            {/* You would need to implement this with GeoJSON or Polygon in a real app */}
            
            {filteredFacilities.map(facility => (
              <Marker 
                key={facility.id} 
                position={facility.location}
                // In a real app, you would use the custom icons based on category
                // icon={createCategoryIcon(facility.category)}
                eventHandlers={{
                  click: () => {
                    setSelectedFacility(facility);
                  },
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <h3>{facility.name}</h3>
                    <p className="popup-category">{facility.category.charAt(0).toUpperCase() + facility.category.slice(1)}</p>
                    <p>{facility.description}</p>
                    <p><strong>Hours:</strong> {facility.hours}</p>
                    <button 
                      className="popup-details-btn"
                      onClick={() => setSelectedFacility(facility)}
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          <div className="map-controls">
            <button 
              className="reset-map-btn" 
              onClick={() => {
                if (mapInstance) {
                  mapInstance.flyTo(CAMPUS_COORDINATES, 16);
                  setSelectedFacility(null);
                }
              }}
              aria-label="Reset map view"
            >
              Reset View
            </button>
          </div>
        </div>
      </div>

      {selectedFacility && (
        <div className="facility-details">
          <button 
            className="close-details-btn" 
            onClick={() => setSelectedFacility(null)}
            aria-label="Close details"
          >
            &times;
          </button>
          
          <h2>{selectedFacility.name}</h2>
          <p className="facility-category">{selectedFacility.category.charAt(0).toUpperCase() + selectedFacility.category.slice(1)}</p>
          <p className="facility-description">{selectedFacility.description}</p>
          <div className="facility-detail-section">
            <p><strong>Hours:</strong> {selectedFacility.hours}</p>
            
            <div className="facility-amenities">
              <h3>Amenities</h3>
              <ul>
                {selectedFacility.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
            
            <div className="facility-actions">
              <button 
                className="directions-btn"
                onClick={() => {
                  // In a real app, this would open directions
                  alert(`Directions to ${selectedFacility.name} will be shown here`);
                }}
              >
                Get Directions
              </button>
              <button 
                className="share-btn"
                onClick={() => {
                  // In a real app, this would open sharing options
                  navigator.clipboard.writeText(
                    `Check out ${selectedFacility.name} at CMR University Lakeside Campus: https://cmr-university.edu/campus/facilities/${selectedFacility.id}`
                  );
                  alert('Link copied to clipboard!');
                }}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacilityLocator;