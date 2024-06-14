import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const getProjects = () => api.get('/projects');
export const addProject = (project: { name: string; description: string }) => api.post('/projects', project);
export const updateProject = (id: string, project: { name: string; description: string }) => api.patch(`/projects/${id}`, project);
export const deleteProject = (id: string) => api.delete(`/projects/${id}`);

export const addTask = (projectId: string, task: { title: string; description: string; assignedTo: string; completed: boolean }) => api.patch(`/projects/${projectId}/tasks`, task);
export const updateTask = (projectId: string, taskId: string, task: { title: string; description: string; assignedTo: string; completed: boolean }) => api.patch(`/projects/${projectId}/tasks/${taskId}`, task);
export const deleteTask = (projectId: string, taskId: string) => api.delete(`/projects/${projectId}/tasks/${taskId}`);
