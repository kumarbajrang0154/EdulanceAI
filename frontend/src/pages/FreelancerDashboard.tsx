import { useAuth } from '../context/AuthContext';

const FreelancerDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Freelancer workspace</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Hello, {user?.fullName}</h2>
        <p className="mt-2 text-sm text-slate-600">Manage proposals, gigs, and client work from one place.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Open proposals</h3>
          <p className="mt-2 text-slate-600">Review project invitations and submit your proposals.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Client messages</h3>
          <p className="mt-2 text-slate-600">Keep conversations and project briefs organized.</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <h3 className="text-xl font-semibold text-slate-900">Income</h3>
          <p className="mt-2 text-slate-600">Track earnings and milestone payments on active contracts.</p>
        </article>
      </div>
    </div>
  );
};

export default FreelancerDashboard;
