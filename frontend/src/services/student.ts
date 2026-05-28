import apiClient from './axios';

export type DashboardStats = {
  resourcesSaved: number;
  aiUsageCount: number;
  resumeCount: number;
  videosWatched: number;
  joinedDate: string;
  lastActivity: string;
};

export type StudentPreferences = {
  theme?: 'light' | 'dark';
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
  twoFactorAuth?: boolean;
};

// Get student profile
export const getStudentProfile = () =>
  apiClient.get('/student/profile').then((res) => res.data);

// Get student dashboard statistics
export const getStudentDashboardStats = () =>
  apiClient.get('/student/dashboard-stats').then((res) => res.data);

// Update student profile
export const updateStudentProfile = (payload: { fullName?: string; profileImage?: string }) =>
  apiClient.put('/student/profile', payload).then((res) => res.data);

// Update student preferences
export const updateStudentPreferences = (payload: StudentPreferences) =>
  apiClient.put('/student/preferences', { preferences: payload }).then((res) => res.data);

// Increment student stat
export const incrementStudentStat = (statType: 'resourcesSaved' | 'aiUsageCount' | 'resumeCount' | 'videosWatched') =>
  apiClient.post(`/student/stats/${statType}`).then((res) => res.data);
