import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://27af-105-113-64-120.ngrok-free.app/api', // Adjust if your backend URL is different
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => apiClient.post('/auth/register', userData);

export const login = (credentials) => apiClient.post('/auth/login', credentials);

export const getTasksForUser = (userId) => apiClient.get(`/tasks/user/${userId}`);

export const createTask = (taskData) => apiClient.post('/tasks', taskData);

export const updateTask = (taskId, taskData) => apiClient.put(`/tasks/${taskId}`, taskData);

export const deleteTask = (taskId) => apiClient.delete(`/tasks/${taskId}`);