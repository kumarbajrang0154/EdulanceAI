type StatsItem = {
  label: string;
  value: string;
  description: string;
};

const DashboardStats = ({ stats }: { stats: StatsItem[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {stats.map((stat) => (
      <div key={stat.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
        <p className="mt-4 text-3xl font-semibold text-slate-900">{stat.value}</p>
        <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
      </div>
    ))}
  </div>
);

export default DashboardStats;
