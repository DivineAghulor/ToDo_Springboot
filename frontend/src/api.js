import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/users', userData),

  // Tasks
  getTasksForUser: (userId, params) => apiClient.get(`/users/${userId}/tasks`, { params }),
  createTask: (userId, taskData) => apiClient.post(`/users/${userId}/tasks`, taskData),
  updateTask: (userId, taskId, taskData) => apiClient.put(`/users/${userId}/tasks/${taskId}`, taskData),
  deleteTask: (userId, taskId) => apiClient.delete(`/users/${userId}/tasks/${taskId}`),
};

