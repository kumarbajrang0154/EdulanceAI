import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className="mx-auto max-w-xl rounded-[28px] border border-slate-200 bg-white p-10 shadow-sm shadow-slate-100">
    <h2 className="text-3xl font-semibold text-slate-900">Access denied</h2>
    <p className="mt-2 text-sm text-slate-600">You do not have permission to view this page.</p>
    <div className="mt-6">
      <Link
        to="/dashboard"
        className="inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
      >
        Return to dashboard
      </Link>
    </div>
  </div>
);

export default Unauthorized;
