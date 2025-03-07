import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock user data - in a real app, you'd use Firebase, Auth0, or another auth service
  const mockUsers = [
    { id: 1, email: 'student@college.edu', password: 'password123', name: 'John Student', role: 'student' },
    { id: 2, email: 'admin@college.edu', password: 'admin123', name: 'Admin User', role: 'admin' }
  ];

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem('collegeAppUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Find user
    const user = mockUsers.find(
      user => user.email === email && user.password === password
    );

    if (user) {
      // Remove password before storing
      const { password, ...userWithoutPassword } = user;
      localStorage.setItem('collegeAppUser', JSON.stringify(userWithoutPassword));
      setCurrentUser(userWithoutPassword);
      setError(null);
      return userWithoutPassword;
    } else {
      setError('Invalid email or password');
      return null;
    }
  };

  const register = (name, email, password) => {
    // Check if user already exists
    if (mockUsers.some(user => user.email === email)) {
      setError('User with this email already exists');
      return null;
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      email,
      password,
      name,
      role: 'student'
    };

    // In a real app, you'd send this to your backend
    mockUsers.push(newUser);

    // Remove password before storing
    const { password: pass, ...userWithoutPassword } = newUser;
    localStorage.setItem('collegeAppUser', JSON.stringify(userWithoutPassword));
    setCurrentUser(userWithoutPassword);
    setError(null);
    return userWithoutPassword;
  };

  const logout = () => {
    localStorage.removeItem('collegeAppUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};