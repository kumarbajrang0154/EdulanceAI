import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationBell from './NotificationBell';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm shadow-slate-100 backdrop-blur-md md:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
        <Link to="/" className="text-lg font-semibold text-slate-900">
          Edulance AI
        </Link>
        <nav className="flex items-center gap-4 text-sm text-slate-600">
          {user ? (
            <>
              <NotificationBell />
              <Link to="/dashboard" className="hover:text-slate-900">
                Dashboard
              </Link>
              <Link to="/marketplace" className="hover:text-slate-900">
                Marketplace
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-slate-900">
                Login
              </Link>
              <Link to="/signup" className="rounded-full bg-brand-500 px-4 py-2 text-white transition hover:bg-brand-700">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
