import { useAuth } from '../../context/AuthContext';

const FreelancerNavbar = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white/95 px-4 py-4 shadow-sm shadow-slate-100 backdrop-blur-md md:px-8">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Freelancer platform</p>
          <h1 className="text-2xl font-semibold text-slate-900">Edulance freelancer dashboard</h1>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          Signed in as <span className="font-semibold text-slate-900">{user?.fullName}</span>
        </div>
      </div>
    </header>
  );
};

export default FreelancerNavbar;
