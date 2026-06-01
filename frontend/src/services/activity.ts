import apiClient from './axios';

const endpoint = '/activity';

export const getActivityHistory = (params?: Record<string, unknown>) =>
  apiClient.get(`${endpoint}/history`, { params }).then((res) => res.data);
