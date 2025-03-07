import React from 'react';
import { Link } from 'react-router-dom';
import './pageStyles.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Our Campus Tour App</h1>
        <p>Your ultimate guide to exploring and experiencing campus life</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="about-image mission-image"></div>
          <div className="about-text" style={{marginLeft:"3rem", marginTop:"2rem"}}>
            <h2>Our Mission</h2>
            <p>
              Our college tour app was created with one simple mission: to help students, 
              visitors, and faculty navigate our campus with ease and discover all the 
              amazing opportunities available. We believe that a well-informed campus 
              community is a thriving one.
            </p>
            <p>
              Whether you're a prospective student exploring your future home, a current 
              student looking for the newest study spot, or a visitor attending an event, 
              our app is designed to enhance your campus experience.
            </p>
          </div>
        </div>

        <div className="about-section reverse">
          <div className="about-image features-image"></div>
          <div className="about-text" style={{marginLeft:"3rem", marginTop:"2rem"}}>
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>
                <strong>Interactive Campus Map</strong>
                <p>Navigate seamlessly between buildings, facilities, and points of interest</p>
              </li>
              <li>
                <strong>Event Discovery</strong>
                <p>Never miss an important campus event with our comprehensive calendar</p>
              </li>
              <li>
                <strong>Facility Locator</strong>
                <p>Quickly find study spaces, dining options, and recreational facilities</p>
              </li>
              <li>
                <strong>User Reviews</strong>
                <p>Share your experiences and read insights from fellow campus community members</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="team-section" style={{marginLeft:"3rem", marginTop:"2rem"}}>
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3>Dr. Sarah Johnson</h3>
              <p className="team-role">Faculty Advisor</p>
              <p>Computer Science Department</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3>Jason Kim</h3>
              <p className="team-role">Lead Developer</p>
              <p>Computer Engineering '25</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3>Maya Patel</h3>
              <p className="team-role">UI/UX Designer</p>
              <p>Digital Media Arts '24</p>
            </div>
            <div className="team-member">
              <div className="team-avatar"></div>
              <h3>Carlos Rodriguez</h3>
              <p className="team-role">Data Manager</p>
              <p>Information Systems '26</p>
            </div>
          </div>
        </div>

        <div className="timeline-section" style={{marginLeft:"3rem", marginTop:"2rem"}}>
          <h2>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{marginLeft:"0.5rem", marginTop:"1rem"}}>2023</h3>
                <p>Initial concept developed during the Campus Innovation Hackathon</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{marginLeft:"0.5rem", marginTop:"1rem"}}>2024</h3>
                <p>Beta version released with core mapping functionality</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3 style={{marginLeft:"0.5rem", paddingTop:"1rem"}}>2025</h3>
                <p>Full release with events, reviews, and administrative features</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Join Our Campus Community</h2>
          <p>Experience everything our campus has to offer with our interactive tour app</p>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">Create Account</Link>
            <Link to="/contact" className="btn btn-secondary">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;