import axios from 'axios';

const API_URL = 'http://localhost:8080/api/';

class AuthService {
  async login(email, password) {
    const response = await axios.post(API_URL + 'auth/login', {
      email,
      password
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(username, email, password) {
    return axios.post(API_URL + 'auth/register', {
      username,
      email,
      password,
      role: 'USER' // Default role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthHeader() {
    const user = this.getCurrentUser();
    
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }

  isAuthenticated() {
    const user = this.getCurrentUser();
    return !!user;
  }
}

export default new AuthService();