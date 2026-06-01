import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getPlatformMetrics } from '../services/admin';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    students: 0,
    freelancers: 0,
    admins: 0,
    pendingVerifications: 0,
    pendingFeedback: 0,
    publishedVideos: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getPlatformMetrics();
        setMetrics(data);
      } catch (error) {
        console.error('Unable to load admin metrics', error);
      }
    };

    void fetchMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin center</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome, {user?.fullName}</h2>
        <p className="mt-2 text-sm text-slate-600">Review platform activity, manage users, and monitor system security.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Students</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.students}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Freelancers</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.freelancers}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Admins</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.admins}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Pending verifications</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.pendingVerifications}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Feedback reviews</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.pendingFeedback}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-sm uppercase tracking-[0.3em] text-slate-500">Published videos</h3>
          <p className="mt-5 text-4xl font-semibold text-slate-900">{metrics.publishedVideos}</p>
        </article>
      </div>
    </div>
  );
};

export default AdminDashboard;
