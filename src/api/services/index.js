export const authApi = (transport, prefix) => ({
  registration: (payload) => transport.post(`/${prefix}/registration`, payload),
  login: (payload) => transport.post(`/${prefix}/login`, payload),
  logout: () => transport.post(`/${prefix}/logout`),
});

export const diaryApi = (transport, prefix) => ({
  getDiaryRecords: () => transport.get(`/${prefix}/records`),
  create: (payload) => transport.post(`/${prefix}`, payload),
});

export const accountApi = (transport, prefix) => ({
  getAccountInfo: () => transport.get(`/${prefix}`),
});
