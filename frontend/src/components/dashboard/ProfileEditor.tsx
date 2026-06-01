import { useEffect, useState } from 'react';
import { FreelancerProfile, fetchFreelancerProfile, updateFreelancerProfile } from '../../services/freelancer';

const initialProfile: FreelancerProfile = {
  userId: '',
  bio: '',
  skills: [],
  experienceLevel: 'Intermediate',
  portfolioLinks: [],
  socialLinks: { linkedin: '', github: '', website: '', twitter: '' },
  availabilityStatus: 'Available',
  profileImage: '',
};

const ProfileEditor = () => {
  const [profile, setProfile] = useState<FreelancerProfile>(initialProfile);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchFreelancerProfile();
        setProfile(data);
      } catch (error) {
        setMessage('Unable to load profile data.');
      }
    };

    load();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const updated = await updateFreelancerProfile(profile);
      setProfile(updated);
      setMessage('Profile saved successfully.');
    } catch {
      setMessage('Unable to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Profile settings</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Update your freelancer details</h2>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-3xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-slate-600">{message}</p>}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Bio</span>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={4}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Experience level</span>
          <select
            value={profile.experienceLevel}
            onChange={(e) => setProfile({ ...profile, experienceLevel: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Skills (comma separated)</span>
          <input
            type="text"
            value={profile.skills.join(', ')}
            onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Availability status</span>
          <select
            value={profile.availabilityStatus}
            onChange={(e) => setProfile({ ...profile, availabilityStatus: e.target.value })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option>Available</option>
            <option>Busy</option>
            <option>Offline</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">LinkedIn</span>
          <input
            type="text"
            value={profile.socialLinks.linkedin}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, linkedin: e.target.value } })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">GitHub</span>
          <input
            type="text"
            value={profile.socialLinks.github}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, github: e.target.value } })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Website</span>
          <input
            type="text"
            value={profile.socialLinks.website}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, website: e.target.value } })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Twitter</span>
          <input
            type="text"
            value={profile.socialLinks.twitter}
            onChange={(e) => setProfile({ ...profile, socialLinks: { ...profile.socialLinks, twitter: e.target.value } })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
        <label className="block md:col-span-2">
          <span className="text-sm font-medium text-slate-700">Portfolio links (comma separated)</span>
          <input
            type="text"
            value={profile.portfolioLinks.join(', ')}
            onChange={(e) => setProfile({ ...profile, portfolioLinks: e.target.value.split(',').map((item) => item.trim()).filter(Boolean) })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </label>
      </div>
    </section>
  );
};

export default ProfileEditor;
