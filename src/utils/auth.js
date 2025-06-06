import apiService from '../services/api';

export const auth = {
  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem('token');
  },

  // Get user data from localStorage
  getUser() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  },

  // Login user
  async login(email, password) {
    try {
      const response = await apiService.login({ email, password });
      
      // Store token and user data
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await apiService.register(userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/signin';
  },

  // Verify email
  async verifyEmail(token) {
    try {
      const response = await apiService.verifyEmail(token);
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user role
  getUserRole() {
    const user = this.getUser();
    return user ? user.role : null;
  }
};

export default auth;