import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import AuthService from '../../services/AuthService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      if (user) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '4rem auto' }}>
        <div className="card-header">
          <h2 className="card-title text-center">Login to Your Account</h2>
        </div>
        <div className="card-body">
          {error && (
            <div style={{ 
              padding: '0.75rem', 
              marginBottom: '1rem', 
              backgroundColor: 'rgba(229, 62, 62, 0.1)', 
              borderLeft: '3px solid var(--danger)',
              color: 'var(--danger)'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group" style={{ textAlign: 'right' }}>
              <a href="#" style={{ textDecoration: 'none', color: 'var(--primary)', fontSize: '0.9rem' }}>
                Forgot password?
              </a>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p>Don't have an account? <Link to="/register" style={{ color: 'var(--primary)' }}>Sign up</Link></p>
          </div>

          <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(74, 107, 255, 0.05)', borderRadius: '4px' }}>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}><strong>Demo Accounts:</strong></p>
            <p style={{ fontSize: '0.9rem' }}><strong>Student:</strong> student@college.edu / password123</p>
            <p style={{ fontSize: '0.9rem' }}><strong>Admin:</strong> admin@college.edu / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
