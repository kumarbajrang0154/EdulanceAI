import { useEffect, useState } from 'react';
import { DashboardLayout, DashboardHeader, SectionTitle } from '../components/dashboard';
import Alert from '../components/Alert';
import { getActivityHistory, type ActivityRecord } from '../services/activity';

const eventLabelMap: Record<string, string> = {
  ai_summary_generated: 'AI summary generated',
  saved_resource: 'Resource saved',
  video_watched: 'Video watched',
  resume_created: 'Resume created',
  profile_updated: 'Profile updated',
};

const ActivityHistory = () => {
  const [activities, setActivities] = useState<ActivityRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadActivity = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getActivityHistory({ page: 1, limit: 40 });
        setActivities(data.activities || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load activity history');
      } finally {
        setLoading(false);
      }
    };

    void loadActivity();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <DashboardHeader
          title="Activity History"
          description="Track your platform actions and see your latest engagement history."
        />

        {error && <Alert message={error} variant="error" />}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          {loading ? (
            <p className="text-sm text-slate-500">Loading activity…</p>
          ) : activities.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-medium text-slate-900">No activity recorded yet</p>
              <p className="mt-2 text-sm">Use Edulance AI and student tools to populate your timeline.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <article key={activity._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {eventLabelMap[activity.activityType] || activity.activityType.replace(/_/g, ' ')}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        {Object.entries(activity.metadata)
                          .filter(([, value]) => value !== undefined && value !== null)
                          .map(([key, value]) => `${key}: ${String(value)}`)
                          .join(' · ')}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ActivityHistory;
