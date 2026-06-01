import { FreelancerProfile } from '../../services/freelancer';

const FreelancerProfileCard = ({ profile }: { profile: FreelancerProfile }) => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-3xl bg-slate-100" />
      <div>
        <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Freelancer</p>
        <h2 className="mt-2 text-xl font-semibold text-slate-900">{profile.experienceLevel} specialist</h2>
      </div>
    </div>
    <div className="mt-6 space-y-4 text-sm text-slate-600">
      <p>{profile.bio || 'Freelancer has not added a profile description yet.'}</p>
      <div>
        <p className="text-sm font-medium text-slate-700">Skills</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {profile.skills.length ? profile.skills.map((skill) => (
            <span key={skill} className="rounded-full bg-slate-50 px-3 py-1 text-xs text-slate-700">
              {skill}
            </span>
          )) : <span className="text-sm text-slate-500">No skills listed</span>}
        </div>
      </div>
      <div className="grid gap-2 text-sm text-slate-500">
        <p>Experience: {profile.experienceLevel}</p>
        <p>Availability: {profile.availabilityStatus}</p>
      </div>
    </div>
  </section>
);

export default FreelancerProfileCard;
