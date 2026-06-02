import apiClient from './axios';

export type ActivityRecord = {
  _id: string;
  activityType: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type ActivityHistoryResponse = {
  activities: ActivityRecord[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

const endpoint = '/activity';

export const getActivityHistory = (params?: Record<string, unknown>) =>
  apiClient.get<ActivityHistoryResponse>(`${endpoint}/history`, { params }).then((res) => res.data);
