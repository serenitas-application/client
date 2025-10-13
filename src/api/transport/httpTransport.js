export const createTransport = (instance) => ({
  get: async (url, params) => {
    const response = await instance(url, params);
    return response.json();
  },
  post: async (url, data = {}) => {
    const payload = JSON.stringify(data);
    const response = await instance(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    return response.json();
  },
  patch: async (url, data) => {
    const payload = JSON.stringify(data);
    const response = await instance(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    });
    return response.json();
  },
  delete: async (url) => {
    const response = await instance(url, {
      method: 'DELETE',
    });
    return response.json();
  },
});
