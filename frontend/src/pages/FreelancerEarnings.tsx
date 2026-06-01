import EarningsOverview from '../components/dashboard/EarningsOverview';

const FreelancerEarnings = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Earnings center</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">Revenue and payouts</h2>
      <p className="mt-2 text-sm text-slate-600">Review your earnings summary and future revenue potential.</p>
    </div>

    <div className="grid gap-4 lg:grid-cols-3">
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Total earnings</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">$34,920</p>
        <p className="mt-2 text-sm text-slate-500">Lifetime freelancer payout summary.</p>
      </article>
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Pending release</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">$2,180</p>
        <p className="mt-2 text-sm text-slate-500">Funds pending client approval and release.</p>
      </article>
      <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Completed jobs</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">42</p>
        <p className="mt-2 text-sm text-slate-500">Completed freelance projects to date.</p>
      </article>
    </div>

    <EarningsOverview />
  </div>
);

export default FreelancerEarnings;
