import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const menuItems =
    user.role === 'freelancer'
      ? [
          { label: 'Dashboard', to: '/freelancer' },
          { label: 'Portfolio', to: '/freelancer/portfolio' },
          { label: 'Services', to: '/freelancer/services' },
          { label: 'Projects', to: '/freelancer/projects' },
          { label: 'Proposals', to: '/freelancer/ai-proposals' },
          { label: 'Notifications', to: '/notifications' },
          { label: 'Activity', to: '/activity' },
          { label: 'Feedback center', to: '/feedback-center' },
          { label: 'Reviews', to: '/reviews' },
        ]
      : user.role === 'admin'
      ? [
          { label: 'Dashboard', to: '/admin' },
          { label: 'Users', to: '/admin/users' },
          { label: 'Approvals', to: '/admin/verifications' },
          { label: 'Notifications', to: '/notifications' },
          { label: 'Activity', to: '/activity' },
          { label: 'Reviews', to: '/reviews' },
          { label: 'Feedback', to: '/admin/feedback' },
          { label: 'Video Library', to: '/admin/videos' },
        ]
      : [
          { label: 'Dashboard', to: '/student/dashboard' },
          { label: 'My notes', to: '/student/ai-notes' },
          { label: 'Resume builder', to: '/student/resume' },
          { label: 'Placement prep', to: '/student/placement' },
          { label: 'Notifications', to: '/notifications' },
          { label: 'Activity', to: '/activity' },
          { label: 'Feedback center', to: '/feedback-center' },
          { label: 'Reviews', to: '/reviews' },
        ];

  return (
    <aside className="hidden w-72 shrink-0 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 lg:block">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[.3em] text-slate-500">Welcome, {user.fullName.split(' ')[0]}</p>
        <ul className="space-y-3 text-sm text-slate-700">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 transition ${isActive ? 'bg-slate-100 text-slate-900' : 'hover:bg-slate-50 text-slate-700'}`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <span className="block rounded-2xl px-4 py-3">{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
