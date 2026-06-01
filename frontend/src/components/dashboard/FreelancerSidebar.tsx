import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'Dashboard', path: '/freelancer/dashboard' },
  { label: 'Portfolio', path: '/freelancer/portfolio' },
  { label: 'Services', path: '/freelancer/services' },
  { label: 'Projects', path: '/freelancer/projects' },
  { label: 'AI Proposal Lab', path: '/freelancer/ai-proposals' },
  { label: 'Proposal History', path: '/freelancer/proposal-history' },
  { label: 'Pricing Suggestions', path: '/freelancer/pricing-suggestions' },
  { label: 'Templates', path: '/freelancer/proposal-templates' },
  { label: 'Incoming Requests', path: '/requests/freelancer' },
  { label: 'Earnings', path: '/freelancer/earnings' },
  { label: 'Notifications', path: '/notifications' },
  { label: 'Activity', path: '/activity' },
  { label: 'Feedback Center', path: '/feedback-center' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'Settings', path: '/freelancer/settings' },
];

const FreelancerSidebar = () => {
  const { user, logout } = useAuth();

  return (
    <aside className="hidden w-80 shrink-0 space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 lg:block">
      <div className="space-y-3">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Freelancer profile</p>
        <div className="flex items-center gap-4 rounded-3xl bg-slate-50 p-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-200 text-xl font-semibold text-slate-700">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-slate-900">{user?.fullName}</p>
            <p className="text-sm text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <nav className="space-y-2 text-sm text-slate-700">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block rounded-3xl px-4 py-3 transition ${
                isActive ? 'bg-slate-900 text-white shadow-sm' : 'hover:bg-slate-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={logout}
          className="w-full rounded-3xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default FreelancerSidebar;
