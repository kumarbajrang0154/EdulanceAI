import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Admin center</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Welcome, {user?.fullName}</h2>
        <p className="mt-2 text-sm text-slate-600">Review platform activity, manage users, and monitor system security.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">User management</h3>
          <p className="mt-2 text-slate-600">Approve accounts, manage roles, and inspect user activity.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Platform health</h3>
          <p className="mt-2 text-slate-600">Monitor requests, auth usage, and system stability.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Security controls</h3>
          <p className="mt-2 text-slate-600">Verify access, revoke sessions, and audit role behavior.</p>
        </article>
      </div>
    </div>
  );
};

export default AdminDashboard;
