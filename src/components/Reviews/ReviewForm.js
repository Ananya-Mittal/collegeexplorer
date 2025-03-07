import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase.config';
import useAuth from "../../hooks/useAuth"; 



import './ReviewForm.css';
import { getFirestore } from "firebase/firestore";
// import db from '../../firebase.config';  // Adjust path if necessary
// import './ReviewsForm.css'; // Ensure path is correct


const ReviewForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    facilityName: '',
    rating: 5,
    title: '',
    content: '',
    category: 'academic',
    anonymous: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const { facilityName, rating, title, content, category, anonymous } = formData;
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please log in to submit a review.');
      return;
    }
    
    if (!facilityName || !title || !content) {
      setError('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const reviewData = {
        facilityName,
        rating: Number(rating),
        title,
        content,
        category,
        anonymous,
        userId: anonymous ? null : user.uid,
        userName: anonymous ? 'Anonymous' : user.displayName || user.email.split('@')[0],
        createdAt: serverTimestamp(),
        likes: 0,
        dislikes: 0
      };
      
      await addDoc(collection(db, 'reviews'), reviewData);
      
      setSuccess(true);
      setFormData({
        facilityName: '',
        rating: 5,
        title: '',
        content: '',
        category: 'academic',
        anonymous: false
      });
      
      // Automatically redirect after showing success message
      setTimeout(() => {
        navigate('/');
      }, 3000);
      
    } catch (error) {
      console.error('Error adding review:', error);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <div className="review-form-container">
        <div className="container">
          <div className="review-form-wrapper">
            <h1>Share Your Experience</h1>
            <p className="review-intro">
              Your feedback helps other students make informed decisions about campus facilities and services.
            </p>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && (
              <div className="alert alert-success">
                Your review has been submitted successfully! Redirecting to home...
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="review-form">
              <div className="form-group">
                <label htmlFor="facilityName">Facility or Service Name*</label>
                <input
                  type="text"
                  id="facilityName"
                  name="facilityName"
                  value={facilityName}
                  onChange={handleChange}
                  placeholder="e.g. Main Library, Student Union, Math Department"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={handleChange}
                >
                  <option value="academic">Academic</option>
                  <option value="dining">Dining</option>
                  <option value="residence">Residence</option>
                  <option value="recreation">Recreation</option>
                  <option value="service">Service</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <div className="rating-input">
                  <input
                    type="range"
                    id="rating"
                    name="rating"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={handleChange}
                  />
                  <div className="rating-display">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={`star ${i < rating ? 'filled' : ''}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Review Title*</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={handleChange}
                  placeholder="Summarize your experience"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="content">Review Content*</label>
                <textarea
                  id="content"
                  name="content"
                  value={content}
                  onChange={handleChange}
                  placeholder="Share your detailed experience, what you liked or didn't like..."
                  rows="5"
                  required
                ></textarea>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={anonymous}
                  onChange={handleChange}
                />
                <label htmlFor="anonymous">Submit anonymously</label>
              </div>
              
              <div className="form-footer">
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
                <p className="disclaimer">
                  * By submitting this review, you confirm that it is based on your genuine experience and follows our community guidelines.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default ReviewForm;