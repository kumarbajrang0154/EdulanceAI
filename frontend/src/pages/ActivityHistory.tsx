import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SectionTitle } from '../components/dashboard';
import { getActivityHistory } from '../services/activity';

const ActivityHistory = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        setLoading(true);
        const data = await getActivityHistory({ page: 1, limit: 40 });
        setActivities(data.activities || []);
      } catch {
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    void loadActivity();
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <SectionTitle
          title="Activity History"
          description="Track your platform actions and see your latest engagement history."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          {loading ? (
            <p className="text-sm text-slate-500">Loading activity…</p>
          ) : activities.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-medium text-slate-900">No activity recorded yet</p>
              <p className="mt-2 text-sm">Use Edulance AI and marketplace tools to populate your activity timeline.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity._id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{activity.activityType.replace(/_/g, ' ')}</p>
                      <p className="mt-2 text-sm text-slate-600">{JSON.stringify(activity.metadata)}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      {new Date(activity.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ActivityHistory;
