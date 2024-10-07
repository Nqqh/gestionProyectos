import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (userData) => api.post('/users', userData),
  update: (id, userData) => api.put(`/users/${id}`, userData),
  delete: (id) => api.delete(`/users/${id}`),
};

export const projectService = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (projectData) => api.post('/projects', projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
};

export const taskService = {
  getAll: (projectId) => api.get(`/projects/${projectId}/tasks`),
  getById: (projectId, taskId) => api.get(`/projects/${projectId}/tasks/${taskId}`),
  create: (projectId, taskData) => api.post(`/projects/${projectId}/tasks`, taskData),
  update: (projectId, taskId, taskData) => api.put(`/projects/${projectId}/tasks/${taskId}`, taskData), // Corregido el cierre del parámetro
  delete: (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}`),
};

export default api;
