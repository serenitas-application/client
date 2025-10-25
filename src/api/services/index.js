export const authApi = (transport, prefix) => ({
  registration: (payload) => transport.post(`/${prefix}/registration`, payload),
  login: (payload) => transport.post(`/${prefix}/login`, payload),
  sendToken: (payload) => transport.post(`/${prefix}/send-token`, payload),
  verifyToken: (payload) => transport.post(`/${prefix}/verify-token`, payload),
  logout: () => transport.post(`/${prefix}/logout`),
});

export const diaryApi = (transport, prefix) => ({
  getDiaryRecords: () => transport.get(`/${prefix}/records`),
  getDiaryByDate: (date) => transport.get(`/${prefix}?date=${date}`),
  create: (payload) => transport.post(`/${prefix}`, payload),
  update: (id, payload) => transport.patch(`/${prefix}/${id}`, payload),
  delete: (id) => transport.delete(`/${prefix}/${id}`),
});

export const accountApi = (transport, prefix) => ({
  getAccountInfo: () => transport.get(`/${prefix}`),
});
