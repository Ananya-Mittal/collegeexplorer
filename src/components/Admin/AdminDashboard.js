import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './AdminDashboard.css';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [facilities, setFacilities] = useState([]);
  const [events, setEvents] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pendingReviews, setPendingReviews] = useState([]);
  const [tourRequests, setTourRequests] = useState([]);

  // Mock data loading - in a real app, this would be API calls
  useEffect(() => {
    // Simulate API loading delay
    setTimeout(() => {
      setFacilities([
        { id: 1, name: 'Main Library', status: 'operational', lastUpdated: '2025-02-28' },
        { id: 2, name: 'Student Center', status: 'operational', lastUpdated: '2025-03-01' },
        { id: 3, name: 'Science Building', status: 'maintenance', lastUpdated: '2025-03-02' },
        { id: 4, name: 'University Gym', status: 'operational', lastUpdated: '2025-03-01' },
        { id: 5, name: 'Arts Center', status: 'operational', lastUpdated: '2025-02-27' },
      ]);

      setEvents([
        { id: 1, name: 'Campus Open House', date: '2025-03-15', attendees: 245, status: 'upcoming' },
        { id: 2, name: 'Career Fair', date: '2025-03-20', attendees: 180, status: 'upcoming' },
        { id: 3, name: 'Alumni Mixer', date: '2025-02-10', attendees: 120, status: 'completed' },
        { id: 4, name: 'Spring Tour Day', date: '2025-04-05', attendees: 200, status: 'upcoming' },
      ]);

      setUserStats({
        registrations: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          data: [45, 60, 75, 65, 80, 95]
        },
        tourAttendance: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [25, 40, 35, 45, 50, 65, 30]
        }
      });

      setPendingReviews([
        { id: 1, user: 'alex_smith', facility: 'Student Center', rating: 4, comment: 'Great facilities but could use more seating.', date: '2025-03-01' },
        { id: 2, user: 'jamie_doe', facility: 'Main Library', rating: 5, comment: 'Amazing staff and resources!', date: '2025-03-02' },
        { id: 3, user: 'taylor_jones', facility: 'Science Building', rating: 3, comment: 'Labs need updating, but the staff is helpful.', date: '2025-03-03' },
      ]);

      setTourRequests([
        { id: 1, name: 'Emma Johnson', email: 'emma@example.com', date: '2025-03-20', time: '10:00 AM', size: 3, status: 'pending' },
        { id: 2, name: 'Michael Liu', email: 'michael@example.com', date: '2025-03-25', time: '2:00 PM', size: 5, status: 'pending' },
        { id: 3, name: 'Sofia Rodriguez', email: 'sofia@example.com', date: '2025-04-05', time: '11:30 AM', size: 2, status: 'pending' },
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApproveReview = (id) => {
    setPendingReviews(pendingReviews.filter(review => review.id !== id));
    // In a real app, you would call an API to approve the review
  };

  const handleRejectReview = (id) => {
    setPendingReviews(pendingReviews.filter(review => review.id !== id));
    // In a real app, you would call an API to reject the review
  };

  const handleApproveTour = (id) => {
    setTourRequests(tourRequests.map(request => 
      request.id === id ? {...request, status: 'approved'} : request
    ));
    // In a real app, you would call an API to approve the tour
  };

  const handleRejectTour = (id) => {
    setTourRequests(tourRequests.map(request => 
      request.id === id ? {...request, status: 'rejected'} : request
    ));
    // In a real app, you would call an API to reject the tour
  };

  const registrationData = {
    labels: userStats.registrations?.labels || [],
    datasets: [
      {
        label: 'New Users',
        data: userStats.registrations?.data || [],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  const tourData = {
    labels: userStats.tourAttendance?.labels || [],
    datasets: [
      {
        label: 'Daily Tour Visitors',
        data: userStats.tourAttendance?.data || [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-tabs">
          <button 
            className={activeTab === 'overview' ? 'active' : ''} 
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={activeTab === 'facilities' ? 'active' : ''} 
            onClick={() => setActiveTab('facilities')}
          >
            Facilities
          </button>
          <button 
            className={activeTab === 'events' ? 'active' : ''} 
            onClick={() => setActiveTab('events')}
          >
            Events
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
          <button 
            className={activeTab === 'tours' ? 'active' : ''} 
            onClick={() => setActiveTab('tours')}
          >
            Tour Requests
          </button>
        </div>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="admin-overview">
            <div className="stats-cards">
              <div className="stat-card">
                <h3>Registered Users</h3>
                <p className="stat-number">1,245</p>
                <p className="stat-change positive">+12% this month</p>
              </div>
              <div className="stat-card">
                <h3>Tour Requests</h3>
                <p className="stat-number">{tourRequests.length}</p>
                <p className="stat-change positive">+5% this month</p>
              </div>
              <div className="stat-card">
                <h3>Active Facilities</h3>
                <p className="stat-number">{facilities.filter(f => f.status === 'operational').length}</p>
                <p className="stat-change neutral">No change</p>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <p className="stat-number">{events.filter(e => e.status === 'upcoming').length}</p>
                <p className="stat-change positive">+2 since last week</p>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-card">
                <h3>User Registrations</h3>
                <div className="chart">
                  <Line data={registrationData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>

              <div className="chart-card">
                <h3>Tour Attendance</h3>
                <div className="chart">
                  <Bar data={tourData} options={{ maintainAspectRatio: false }} />
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">Add Facility</button>
                <button className="action-btn">Create Event</button>
                <button className="action-btn">Export Reports</button>
                <button className="action-btn">System Settings</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facilities' && (
          <div className="admin-facilities">
            <div className="section-header">
              <h2>Campus Facilities</h2>
              <button className="add-btn">Add New Facility</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {facilities.map(facility => (
                  <tr key={facility.id}>
                    <td>{facility.id}</td>
                    <td>{facility.name}</td>
                    <td>
                      <span className={`status-badge ${facility.status}`}>
                        {facility.status.charAt(0).toUpperCase() + facility.status.slice(1)}
                      </span>
                    </td>
                    <td>{facility.lastUpdated}</td>
                    <td className="action-cells">
                      <button className="action-btn small">Edit</button>
                      <button className="action-btn small danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'events' && (
          <div className="admin-events">
            <div className="section-header">
              <h2>Campus Events</h2>
              <button className="add-btn">Create New Event</button>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Expected Attendees</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => (
                  <tr key={event.id}>
                    <td>{event.id}</td>
                    <td>{event.name}</td>
                    <td>{event.date}</td>
                    <td>{event.attendees}</td>
                    <td>
                      <span className={`status-badge ${event.status}`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </span>
                    </td>
                    <td className="action-cells">
                      <button className="action-btn small">Edit</button>
                      <button className="action-btn small danger">Cancel</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="admin-reviews">
            <h2>Pending Reviews</h2>
            {pendingReviews.length === 0 ? (
              <div className="empty-state">
                <p>No pending reviews to moderate.</p>
              </div>
            ) : (
              <div className="reviews-list">
                {pendingReviews.map(review => (
                  <div key={review.id} className="review-card">
                    <div className="review-header">
                      <h3>{review.facility}</h3>
                      <div className="review-rating">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                    <div className="review-meta">
                      <span>By: {review.user}</span>
                      <span>Date: {review.date}</span>
                    </div>
                    <div className="review-actions">
                      <button 
                        className="action-btn approve"
                        onClick={() => handleApproveReview(review.id)}
                      >
                        Approve
                      </button>
                      <button 
                        className="action-btn reject"
                        onClick={() => handleRejectReview(review.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'tours' && (
          <div className="admin-tours">
            <h2>Tour Requests</h2>
            {tourRequests.length === 0 ? (
              <div className="empty-state">
                <p>No pending tour requests.</p>
              </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Group Size</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tourRequests.map(request => (
                    <tr key={request.id}>
                      <td>{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.date}</td>
                      <td>{request.time}</td>
                      <td>{request.size}</td>
                      <td>
                        <span className={`status-badge ${request.status}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="action-cells">
                        {request.status === 'pending' && (
                          <>
                            <button 
                              className="action-btn small approve"
                              onClick={() => handleApproveTour(request.id)}
                            >
                              Approve
                            </button>
                            <button 
                              className="action-btn small reject"
                              onClick={() => handleRejectTour(request.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {request.status !== 'pending' && (
                          <span>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;