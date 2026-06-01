const activity = [
  { id: '1', title: 'Service published', detail: 'Your brand design package is now live.', time: '2h ago' },
  { id: '2', title: 'Portfolio update', detail: 'New project case study added to the portfolio.', time: '1d ago' },
  { id: '3', title: 'Proposal sent', detail: 'Submitted a pricing proposal to a product team.', time: '2d ago' },
];

const ActivityFeed = () => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Recent activity</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">Freelancer actions</h2>
      </div>
      <span className="text-sm text-slate-500">Updated automatically</span>
    </div>
    <div className="mt-6 space-y-4">
      {activity.map((item) => (
        <div key={item.id} className="rounded-3xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-semibold text-slate-900">{item.title}</p>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.time}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{item.detail}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ActivityFeed;
