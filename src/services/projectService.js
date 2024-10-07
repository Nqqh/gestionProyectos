import api from '../utils/api';

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
  update: (projectId, taskId, taskData) => api.put(`/projects/${projectId}/tasks/${taskId}`, taskData),
  delete: (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}`),
};

export default api;
