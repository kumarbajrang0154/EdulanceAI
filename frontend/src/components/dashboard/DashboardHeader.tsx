import { useAuth } from '../../context/AuthContext';

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="mb-8">
      <div className="rounded-2xl border border-slate-200 bg-gradient-to-r from-blue-50 to-slate-50 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
          {getGreeting()}, {user?.fullName?.split(' ')[0]}! 👋
        </h1>
        <p className="mt-2 text-slate-600">{description || title}</p>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <span>📅</span>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
