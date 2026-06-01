import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { SectionTitle } from '../components/dashboard';
import { getNotifications, markNotificationRead } from '../services/notifications';

const NotificationsCenter = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications({ page: 1, limit: 30 });
      setNotifications(data.notifications || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

  const handleMarkRead = async (id: string) => {
    await markNotificationRead(id);
    await loadNotifications();
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionTitle
          title="Notifications"
          description="View your latest alerts, platform updates, and workflow reminders."
        />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          {loading ? (
            <p className="text-sm text-slate-500">Loading notifications…</p>
          ) : notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-500">
              <p className="text-lg font-medium text-slate-900">No notifications yet</p>
              <p className="mt-2 text-sm">Notification updates appear here when platform activity happens.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <article key={notification._id} className="rounded-3xl border border-slate-200 p-4 transition hover:bg-slate-50">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                      <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-slate-500">
                        {notification.type} • {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleMarkRead(notification._id)}
                      className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                    >
                      Mark read
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotificationsCenter;
