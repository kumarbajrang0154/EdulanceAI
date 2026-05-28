import apiClient from './axios';

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: 'student' | 'freelancer' | 'admin';
  profileImage?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  user: User;
  token: string;
};

export const signup = (payload: {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'freelancer';
}) => apiClient.post<AuthResponse>('/auth/signup', payload).then((res) => res.data);

export const login = (payload: { email: string; password: string }) =>
  apiClient.post<AuthResponse>('/auth/login', payload).then((res) => res.data);

export const getProfile = () => apiClient.get<{ user: User }>('/auth/profile').then((res) => res.data);
