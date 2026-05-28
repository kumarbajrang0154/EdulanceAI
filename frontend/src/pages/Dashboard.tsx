import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const roleRoute = (role: string) => {
  if (role === 'freelancer') return '/freelancer';
  if (role === 'admin') return '/admin';
  return '/student';
};

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(roleRoute(user.role), { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <h2 className="text-3xl font-semibold text-slate-900">Redirecting...</h2>
        <p className="mt-2 text-sm text-slate-600">Preparing your dashboard experience.</p>
      </div>
      <LoadingSpinner />
    </div>
  );
};

export default Dashboard;
