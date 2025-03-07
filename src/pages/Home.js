import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CampusMap from '../components/Map/CampusMap';
import EventList from '../components/Events/EventList';
import useAuth from "../hooks/useAuth";
import { Calendar, Map, BookOpen } from 'lucide-react';
import './pageStyles.css';

const Home = () => {
  const { user } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching featured events
    const fetchEvents = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setFeaturedEvents([
            { id: 1, title: 'Campus Open Day', date: '2025-03-15', location: 'Main Quad', description: 'Tour our beautiful campus and meet current students and faculty.' },
            { id: 2, title: 'Student Orientation', date: '2025-03-20', location: 'Student Center', description: 'Get acquainted with campus resources and student services.' },
            { id: 3, title: 'Faculty Meet & Greet', date: '2025-03-22', location: 'Alumni Hall', description: 'Connect with professors and learn about academic opportunities.' }
          ]);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section with Parallax Effect */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Future Campus</h1>
          <p className="hero-subtitle">Explore facilities, events, and everything our campus has to offer</p>
          {!user && (
            <div className="cta-buttons">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section with Card Animation */}
      <section className="features-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="feature-cards-container">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Map size={32} className="feature-icon" />
            </div>
            <h3>Interactive Campus Map</h3>
            <p>Navigate easily through our campus with detailed building information and directions.</p>
            <Link to="/map" className="feature-link">Explore Map</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Calendar size={32} className="feature-icon" />
            </div>
            <h3>Upcoming Events</h3>
            <p>Stay updated with the latest campus events, workshops, and activities happening near you.</p>
            <Link to="/events" className="feature-link">View Events</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <BookOpen size={32} className="feature-icon" />
            </div>
            <h3>Campus Facilities</h3>
            <p>Discover various facilities including libraries, labs, study spaces, and recreational areas.</p>
            <Link to="/facilities" className="feature-link">Find Facilities</Link>
          </div>
        </div>
      </section>

      {/* Map Preview Section with Interactive Elements */}
      <section className="map-preview-section">
        <div className="section-header">
          <h2 className="section-title">Campus at a Glance</h2>
          <p className="section-subtitle">Get familiar with our campus layout before your visit</p>
        </div>
        <div className="map-container">
          <CampusMap preview={true} />
          <div className="map-overlay">
            <Link to="/map" className="map-cta">View Full Map</Link>
          </div>
        </div>
      </section>

      {/* Events Section with Skeleton Loading */}
      <section className="events-section">
        <div className="section-header">
          <h2 className="section-title">Featured Events</h2>
          <p className="section-subtitle">Don't miss these upcoming campus activities</p>
        </div>
        
        {isLoading ? (
          <div className="events-loading">
            {[1, 2, 3].map(i => (
              <div key={i} className="event-skeleton">
                <div className="skeleton-date"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-location"></div>
              </div>
            ))}
          </div>
        ) : (
          <EventList events={featuredEvents} preview={true} />
        )}
        
        <div className="view-all-container">
          <Link to="/events" className="view-all-link">
            View All Events
            <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Testimonial Section with Fade-in Effect */}
      <section className="testimonial-section">
        <div className="section-header">
          <h2 className="section-title">What Students Say</h2>
          <p className="section-subtitle">Hear from students who use our campus app</p>
        </div>
        
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">The campus tour app made my orientation week so much easier! I found all my classes without getting lost and discovered great study spots.</p>
            <div className="student-info">
              <div className="student-avatar" style={{ backgroundImage: "url('/src/assets/student1.jpeg')" }}></div>
              <div className="student-details">
                <span className="student-name">Jessica T.</span>
                <span className="student-year">Freshman, Biology</span>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-mark">"</div>
            <p className="testimonial-text">As a transfer student, I appreciated how easy it was to find events and connect with campus life. The event notifications are super helpful!</p>
            <div className="student-info">
              <div className="student-avatar" style={{ backgroundImage: "url('/src/assets/student2.jpg')" }}></div>
              <div className="student-details">
                <span className="student-name">Miguel R.</span>
                <span className="student-year">Junior, Computer Science</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore Our Campus?</h2>
          <p>Download our mobile app or sign up to get started</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
            <a href="#download" className="btn btn-secondary">Download App</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;