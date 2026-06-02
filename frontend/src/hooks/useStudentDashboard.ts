import { useCallback, useEffect, useState } from 'react';
import { getStudentDashboardStats, type DashboardStats } from '../services/student';
import { getActivityHistory, type ActivityRecord } from '../services/activity';

export type StudentDashboardState = {
  stats: DashboardStats | null;
  activity: ActivityRecord[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

export const useStudentDashboard = (): StudentDashboardState => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activity, setActivity] = useState<ActivityRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [statsResponse, activityResponse] = await Promise.all([
        getStudentDashboardStats(),
        getActivityHistory({ page: 1, limit: 5 }),
      ]);

      setStats(statsResponse.stats);
      setActivity(activityResponse.activities || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return {
    stats,
    activity,
    isLoading,
    error,
    refresh: loadDashboard,
  };
};
