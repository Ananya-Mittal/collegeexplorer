
import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CampusMap from './components/Map/CampusMap';
import EventList from './components/Events/EventList';
import FacilityLocator from './components/Facilities/FacilityLocator';
import ReviewForm from './components/Reviews/ReviewForm';
import AdminDashboard from './components/Admin/AdminDashboard';
import useAuth from './hooks/useAuth';
import AuthService from './services/AuthService';


// Protected route component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const { currentUser, logout } = useAuth();
  
  return (
    <div className="app">
      <header>
        <div className="container">
          <nav>
            <div className="logo">Campus Explorer</div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/map">Campus Map</Link></li>
              <li><Link to="/events">Events</Link></li>
              <li><Link to="/facilities">Facilities</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
            <div className="auth-buttons">
              {currentUser ? (
                <>
                  {currentUser.role === 'admin' && (
                    <Link to="/admin" className="btn btn-outline">Admin</Link>
                  )}
                  <button onClick={logout} className="btn btn-outline">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline">Login</Link>
                  <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<CampusMap />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/facilities" element={<FacilityLocator />} />
          <Route 
            path="/review" 
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">Campus Explorer</div>
              <p>Discover your perfect college journey with our comprehensive campus tour app.</p>
            </div>
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/map">Campus Map</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/about">About</Link></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Resources</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Campus News</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Contact</h3>
              <ul>
                <li>Email: info@campusexplorer.com</li>
                <li>Phone: (123) 456-7890</li>
                <li>Address: Off, Bagalur Main Rd, near Kempegowda International Airport, Mitganahalli, Hennur Gardens, Chagalahatti, Bengaluru, Karnataka 562149</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Campus Explorer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
