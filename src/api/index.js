import { accountApi, authApi, diaryApi } from './services';
import { createTransport } from './transport/httpTransport';
import { $fetch } from './transport/instance';

const transport = createTransport($fetch);

export const apiClient = {
  auth: authApi(transport, 'auth'),
  account: accountApi(transport, 'users'),
  diary: diaryApi(transport, 'diary'),
};
