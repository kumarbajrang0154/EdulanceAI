import apiClient from './axios';

const endpoint = '/admin';

export const getPlatformMetrics = () => apiClient.get(`${endpoint}/metrics`).then((res) => res.data);
export const getUsers = (params?: Record<string, unknown>) =>
  apiClient.get(`${endpoint}/users`, { params }).then((res) => res.data);
export const updateUser = (id: string, payload: Record<string, unknown>) =>
  apiClient.patch(`${endpoint}/users/${id}`, payload).then((res) => res.data);
export const getVerificationRequests = () => apiClient.get(`${endpoint}/verification-requests`).then((res) => res.data);
export const moderateVerificationRequest = (id: string, payload: Record<string, unknown>) =>
  apiClient.patch(`${endpoint}/verification-requests/${id}`, payload).then((res) => res.data);
export const getFeedback = (params?: Record<string, unknown>) =>
  apiClient.get(`${endpoint}/feedback`, { params }).then((res) => res.data);
export const moderateFeedback = (id: string, payload: Record<string, unknown>) =>
  apiClient.patch(`${endpoint}/feedback/${id}`, payload).then((res) => res.data);
export const getVideos = () => apiClient.get(`${endpoint}/videos`).then((res) => res.data);
export const createVideo = (payload: Record<string, unknown>) =>
  apiClient.post(`${endpoint}/videos`, payload).then((res) => res.data);
export const updateVideo = (id: string, payload: Record<string, unknown>) =>
  apiClient.patch(`${endpoint}/videos/${id}`, payload).then((res) => res.data);
export const deleteVideo = (id: string) => apiClient.delete(`${endpoint}/videos/${id}`).then((res) => res.data);
