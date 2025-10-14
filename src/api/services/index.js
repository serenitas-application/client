export const authApi = (transport) => ({
  registration: (payload) => transport.post('/auth/registration', payload),
  login: (payload) => transport.post('/auth/login', payload),
  logout: () => transport.post('/auth/logout'),
});

export const diaryApi = (transport) => ({
  create: (payload) => transport.post('/diary', payload),
});

export const accountApi = (transport) => ({
  getAccountInfo: () => transport.get('/users'),
});
