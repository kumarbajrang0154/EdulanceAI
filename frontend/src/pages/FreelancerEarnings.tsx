import { useEffect, useState } from 'react';
import EarningsOverview from '../components/dashboard/EarningsOverview';
import { fetchFreelancerDashboard, FreelancerDashboardSummary } from '../services/freelancer';

const FreelancerEarnings = () => {
  const [dashboard, setDashboard] = useState<FreelancerDashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEarnings = async () => {
      setLoading(true);
      try {
        const data = await fetchFreelancerDashboard();
        setDashboard(data);
      } catch {
        setError('Unable to load earnings data.');
      } finally {
        setLoading(false);
      }
    };

    void loadEarnings();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Earnings center</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Revenue and payouts</h2>
        <p className="mt-2 text-sm text-slate-600">Review your earnings summary and future revenue potential.</p>
      </div>

      {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>}

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total earnings</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">${dashboard?.totalEarnings.toLocaleString() ?? '0'}</p>
          <p className="mt-2 text-sm text-slate-500">Lifetime freelancer payout summary.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Pending revenue</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">${dashboard?.pendingRevenue.toLocaleString() ?? '0'}</p>
          <p className="mt-2 text-sm text-slate-500">Revenue in progress or awaiting approval.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Completed jobs</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900">{dashboard?.completedProjects ?? 0}</p>
          <p className="mt-2 text-sm text-slate-500">Completed freelance projects to date.</p>
        </article>
      </div>

      <EarningsOverview
        totalEarnings={dashboard?.totalEarnings ?? 0}
        completedProjects={dashboard?.completedProjects ?? 0}
        pendingRevenue={dashboard?.pendingRevenue ?? 0}
      />
    </div>
  );
};

export default FreelancerEarnings;
