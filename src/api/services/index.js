export const authApi = (transport) => ({
  registration: (payload) => transport.post('/auth/registration', payload),
  login: (payload) => transport.post('/auth/login', payload),
  logout: () => transport.post('/auth/logout'),
});

export const accountApi = (transport) => ({
  getAccountInfo: () => transport.get('/users'),
});
