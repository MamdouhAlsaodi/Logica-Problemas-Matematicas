import axios from 'axios';
const API = axios.create({ baseURL: '/api' });

export const problemService = {
  getAll: (difficulty = '') => API.get(`/problems${difficulty ? `?difficulty=${difficulty}` : ''}`).then(r => r.data),
  getById: (id) => API.get(`/problems/${id}`).then(r => r.data),
  create: (data) => API.post('/problems', data).then(r => r.data),
  update: (id, data) => API.put(`/problems/${id}`, data).then(r => r.data),
  delete: (id) => API.delete(`/problems/${id}`).then(r => r.data),
  checkAnswer: (id, userAnswer) => API.post(`/problems/${id}/check`, { userAnswer }).then(r => r.data),
};

export const userService = {
  getAll: () => API.get('/users').then(r => r.data),
  create: (data) => API.post('/users', data).then(r => r.data),
  getById: (id) => API.get(`/users/${id}`).then(r => r.data),
  update: (id, data) => API.put(`/users/${id}`, data).then(r => r.data),
  delete: (id) => API.delete(`/users/${id}`).then(r => r.data),
};

export default API;
