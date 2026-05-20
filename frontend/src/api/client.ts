import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

export const authApi = {
  register: (data: { username: string; email: string; password: string }) =>
    api.post('/auth/register', data).then(r => r.data),
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data).then(r => r.data),
  me: () => api.get('/auth/me').then(r => r.data),
};

export const topicsApi = {
  getAll: () => api.get('/topics').then(r => r.data),
  getBySlug: (slug: string) => api.get(`/topics/${slug}`).then(r => r.data),
  getLesson: (slug: string) => api.get(`/topics/${slug}/lesson`).then(r => r.data),
  getExercises: (slug: string) => api.get(`/topics/${slug}/exercises`).then(r => r.data),
};

export const progressApi = {
  getAll: () => api.get('/progress').then(r => r.data),
  completeLesson: (topicId: number) =>
    api.post('/progress/complete-lesson', { topicId }).then(r => r.data),
};

export const quizApi = {
  getByTopic: (topicId: number) => api.get(`/quiz/topic/${topicId}`).then(r => r.data),
  submit: (quizId: number, answers: Array<{ questionId: number; answer: string }>) =>
    api.post(`/quiz/${quizId}/submit`, { answers }).then(r => r.data),
};

export const leaderboardApi = {
  getAll: () => api.get('/leaderboard').then(r => r.data),
  getMyRank: () => api.get('/leaderboard/me').then(r => r.data),
};

export const challengesApi = {
  getAll: () => api.get('/challenges').then(r => r.data),
  getById: (id: number) => api.get(`/challenges/${id}`).then(r => r.data),
  join: (id: number) => api.post(`/challenges/${id}/join`).then(r => r.data),
  submitGithub: (id: number, githubUrl: string, language: string) =>
    api.post(`/challenges/${id}/submit-github`, { githubUrl, language }).then(r => r.data),
};

export const homeworkApi = {
  getByTopic: (slug: string) => api.get(`/homework/topic/${slug}`).then(r => r.data),
  submit: (id: number, githubUrl: string) =>
    api.post(`/homework/${id}/submit`, { githubUrl }).then(r => r.data),
  getMy: () => api.get('/homework/my').then(r => r.data),
};

export const usersApi = {
  getProfile: (id: number) => api.get(`/users/profile/${id}`).then(r => r.data),
  updateProfile: (data: Partial<{ username: string; fullName: string; bio: string; avatar: string }>) =>
    api.put('/users/profile', data).then(r => r.data),
  getNotifications: () => api.get('/users/notifications').then(r => r.data),
  markNotificationRead: (id: number) =>
    api.put(`/users/notifications/${id}/read`).then(r => r.data),
  markAllNotificationsRead: () =>
    api.put('/users/notifications/read-all').then(r => r.data),
};

export const messagesApi = {
  getAll: () => api.get('/messages').then(r => r.data),
  send: (receiverId: number, content: string) =>
    api.post('/messages', { receiverId, content }).then(r => r.data),
};
