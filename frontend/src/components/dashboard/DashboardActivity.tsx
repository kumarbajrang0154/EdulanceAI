const DashboardActivity = () => (
  <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Activity snapshot</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Workflow moments</h2>
      </div>
      <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-600">Stable</span>
    </div>
    <ul className="mt-6 space-y-4">
      <li className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-100">
        <p className="font-semibold text-slate-900">Service response</p>
        <p className="mt-2 text-sm text-slate-500">Your top service response rate is strong and ready for client scaling.</p>
      </li>
      <li className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-100">
        <p className="font-semibold text-slate-900">Portfolio visibility</p>
        <p className="mt-2 text-sm text-slate-500">New project exposure is live with updated portfolio entries.</p>
      </li>
      <li className="rounded-3xl bg-white p-4 shadow-sm shadow-slate-100">
        <p className="font-semibold text-slate-900">Marketplace readiness</p>
        <p className="mt-2 text-sm text-slate-500">Your freelancer workspace is configured for future freelance campaigns.</p>
      </li>
    </ul>
  </section>
);

export default DashboardActivity;
