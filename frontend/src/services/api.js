import axios from 'axios';
const API = axios.create({ baseURL: '/api' });

export const problemService = {
  getAll: (difficulty = '') => API.get(`/problems${difficulty ? `?difficulty=${difficulty}` : ''}`).then(r => r.data),
  create: (data) => API.post('/problems', data).then(r => r.data),
  delete: (id) => API.delete(`/problems/${id}`).then(r => r.data),
};

export const userService = {
  getAll: () => API.get('/users').then(r => r.data),
};
