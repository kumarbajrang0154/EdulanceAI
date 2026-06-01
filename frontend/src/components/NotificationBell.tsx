import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNotifications, markNotificationRead } from '../services/notifications';

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const fetchNotifications = async () => {
    try {
      const data = await getNotifications({ page: 1, limit: 5 });
      setNotifications(data.notifications || []);
      setUnreadCount(data.notifications?.filter((item: any) => !item.isRead).length || 0);
    } catch {
      setNotifications([]);
    }
  };

  useEffect(() => {
    void fetchNotifications();
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleToggle = () => {
    setOpen((current) => !current);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      await fetchNotifications();
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggle}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
      >
        <span className="sr-only">Notifications</span>
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1.5 text-[10px] font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-80 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg shadow-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
            <Link to="/notifications" className="text-xs text-blue-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {notifications.length === 0 ? (
              <p className="text-sm text-slate-500">No recent notifications.</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`rounded-3xl border p-3 ${notification.isRead ? 'bg-slate-50 border-slate-200' : 'bg-slate-100 border-slate-300'}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{notification.message}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void handleMarkAsRead(notification._id)}
                      className="text-xs font-medium text-blue-600 hover:text-blue-700"
                    >
                      Mark read
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
