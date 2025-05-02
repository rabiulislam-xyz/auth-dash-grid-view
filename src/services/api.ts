
// API service for making authenticated requests

const API_BASE_URL = 'http://localhost:8000/api';

// Get auth token from localStorage
const getToken = () => localStorage.getItem('authToken');

// Helper to handle API responses
const handleResponse = async (response: Response) => {
  if (response.ok) {
    return await response.json();
  }
  
  // Handle error responses
  const error = await response.json().catch(() => ({
    message: 'Something went wrong',
  }));
  
  throw new Error(error.message || `Error: ${response.status}`);
};

// Create headers with authorization if token exists
const createHeaders = (contentType = 'application/json') => {
  const headers: Record<string, string> = {
    'Content-Type': contentType,
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// API methods
export const api = {
  // User endpoints
  users: {
    getAll: async () => {
      const response = await fetch(`${API_BASE_URL}/users/`, {
        headers: createHeaders(),
      });
      return handleResponse(response);
    },
    
    getById: async (id: number) => {
      const response = await fetch(`${API_BASE_URL}/users/${id}/`, {
        headers: createHeaders(),
      });
      return handleResponse(response);
    },
  },

  // Auth endpoints
  auth: {
    login: async (username: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/token/`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({ username, password }),
      });
      return handleResponse(response);
    },
    
    refreshToken: async (refreshToken: string) => {
      const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
        method: 'POST',
        headers: createHeaders(),
        body: JSON.stringify({ refresh: refreshToken }),
      });
      return handleResponse(response);
    },
    
    getUserProfile: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/user/`, {
        headers: createHeaders(),
      });
      return handleResponse(response);
    },
  },
};
