import React, { useState } from 'react';
import './pageStyles.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setFormError('Please enter your email');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    if (!formData.message.trim()) {
      setFormError('Please enter a message');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setFormSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: 'General Inquiry',
          message: ''
        });
      }, 1000);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or feedback? We'd love to hear from you!</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-card">
            <div className="contact-icon email-icon"></div>
            <h3>Email Us</h3>
            <p>campustour@cmr.edu.in</p>
            <p>support@cmr.edu.in</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon phone-icon"></div>
            <h3>Call Us</h3>
            <p>Main Office: (555) 123-4567</p>
            <p>Tech Support: (555) 987-6543</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon location-icon"></div>
            <h3>Visit Us</h3>
            <p>Admin Office</p>
            <p> Bagalur Main Rd, near Kempegowda International Airport, Bengaluru, Karnataka 562149</p>
            <p>Open Mon-Fri: 9am - 5pm</p>
          </div>
          
          <div className="contact-card">
            <div className="contact-icon social-icon"></div>
            <h3>Connect</h3>
            <div className="social-links">
              <a href="#" className="social-link facebook"></a>
              <a href="#" className="social-link twitter"></a>
              <a href="#" className="social-link instagram"></a>
              <a href="#" className="social-link linkedin"></a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          
          {formSubmitted ? (
            <div className="form-success">
              <div className="success-icon"></div>
              <h3>Thank you for your message!</h3>
              <p>We've received your inquiry and will get back to you within 24-48 hours.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setFormSubmitted(false)}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {formError && <div className="form-error">{formError}</div>}
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="  johndoe@example.com"
                  required
                  style={{height:"2.7rem",border: "1px solid #ddd"}}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Report a Bug">Report a Bug</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary submit-btn">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="faq-section" style={{marginLeft:"3rem", marginTop:"2rem"}}>
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I reset my password?</h3>
            <p>Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.</p>
          </div>
          <div className="faq-item">
            <h3>Is the app available offline?</h3>
            <p>Yes! Once you've loaded areas of the map, they remain available even without an internet connection.</p>
          </div>
          <div className="faq-item">
            <h3>How accurate is the campus map?</h3>
            <p>Our maps are updated monthly to reflect any campus changes and construction zones.</p>
          </div>
          <div className="faq-item">
            <h3>Can I add events to the calendar?</h3>
            <p>Student organizations and faculty can submit events for approval through the admin portal.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;