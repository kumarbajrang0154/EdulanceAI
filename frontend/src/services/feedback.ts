import apiClient from './axios';

const endpoint = '/feedback';

export const submitFeedback = (payload: Record<string, unknown>) =>
  apiClient.post(`${endpoint}/create`, payload).then((res) => res.data);

export const getFeedback = (params?: Record<string, unknown>) =>
  apiClient.get(`${endpoint}`, { params }).then((res) => res.data);
