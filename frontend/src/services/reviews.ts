import apiClient from './axios';

const endpoint = '/reviews';

export const createReview = (payload: Record<string, unknown>) =>
  apiClient.post(`${endpoint}/create`, payload).then((res) => res.data);

export const getReviewsForUser = (userId: string) =>
  apiClient.get(`${endpoint}/user/${userId}`).then((res) => res.data);

export const getMyReviews = () =>
  apiClient.get(`${endpoint}/me`).then((res) => res.data);
