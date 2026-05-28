interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard = ({ title, value, description, icon, trend = 'neutral' }: StatsCardProps) => {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-slate-600',
  }[trend];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs uppercase tracking-wide text-slate-500 font-medium">{title}</p>
          <div className="mt-3 flex items-baseline gap-2">
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          </div>
          <p className={`mt-2 text-sm ${trendColor}`}>{description}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </article>
  );
};

export default StatsCard;
