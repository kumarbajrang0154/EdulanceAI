import ProfileEditor from '../components/dashboard/ProfileEditor';

const FreelancerSettings = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Account settings</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900">Freelancer profile settings</h2>
      <p className="mt-2 text-sm text-slate-600">Manage your profile information, social presence, skills, and availability status.</p>
    </div>
    <ProfileEditor />
  </div>
);

export default FreelancerSettings;
