import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface DashboardSidebarProps {
  onItemClick?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
  { label: 'Marketplace', path: '/marketplace', icon: '🛒' },
  { label: 'My Requests', path: '/requests/user', icon: '📩' },
  { label: 'AI Notes Summary', path: '/student/ai-notes', icon: '✨' },
  { label: 'Summary History', path: '/student/summary-history', icon: '📚' },
  { label: 'Resume Builder', path: '/student/resume', icon: '📄' },
  { label: 'Placement Prep', path: '/student/placement', icon: '🎯' },
  { label: 'Video Learning', path: '/student/videos', icon: '🎬' },
  { label: 'Saved Resources', path: '/student/resources', icon: '💾' },
  { label: 'Notifications', path: '/notifications', icon: '🔔' },
  { label: 'Activity', path: '/activity', icon: '📝' },
  { label: 'Feedback Center', path: '/feedback-center', icon: '📣' },
  { label: 'Reviews', path: '/reviews', icon: '⭐' },
  { label: 'Settings', path: '/student/settings', icon: '⚙️' },
];

const DashboardSidebar = ({ onItemClick }: DashboardSidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    if (onItemClick) onItemClick();
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-slate-200">
        <Link to="/student/dashboard" className="flex items-center gap-2" onClick={onItemClick}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="text-lg font-semibold text-slate-900">Edulance</span>
        </Link>
        <p className="text-xs text-slate-500 mt-2">Student Dashboard</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onItemClick}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-6 bg-blue-600 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="border-t border-slate-200 px-4 py-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
        >
          <span className="text-lg">🚪</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-4 py-3">
        <p className="text-xs text-slate-500 text-center">
          Edulance AI v1.0 © 2024
        </p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
