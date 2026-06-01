const EarningsOverview = () => (
  <section className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Earnings overview</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Monthly performance</h2>
        </div>
        <button type="button" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          View analytics
        </button>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">This month</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">$8,750</p>
          <p className="mt-2 text-sm text-slate-500">Projected earnings based on active services.</p>
        </article>
        <article className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Completed</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">18 projects</p>
          <p className="mt-2 text-sm text-slate-500">Tasks closed successfully during the current period.</p>
        </article>
        <article className="rounded-3xl bg-white p-5 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Forecast</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">+$2,400</p>
          <p className="mt-2 text-sm text-slate-500">Potential revenue from pending proposals.</p>
        </article>
      </div>
    </div>
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Chart ready</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">Revenue trend</h3>
        </div>
        <span className="text-sm text-slate-500">Designed for future chart integration</span>
      </div>
      <div className="mt-5 h-44 rounded-3xl bg-slate-50 p-5 text-slate-500">
        <p className="text-sm">Chart placeholder</p>
        <p className="mt-2 text-sm">Monthly revenue and booking forecast area for future visualization.</p>
      </div>
    </div>
  </section>
);

export default EarningsOverview;
