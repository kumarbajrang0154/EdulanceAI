import apiClient from './axios';

const endpoint = '/notifications';

export const getNotifications = (params?: Record<string, unknown>) =>
  apiClient.get(`${endpoint}`, { params }).then((res) => res.data);

export const markNotificationRead = (id: string) =>
  apiClient.put(`${endpoint}/${id}/read`).then((res) => res.data);

export const getUnreadCount = () =>
  apiClient.get(`${endpoint}`, { params: { page: 1, limit: 1 } }).then((res) => res.data.pagination?.total || 0);
