import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FreelancerProfileCard from '../components/marketplace/FreelancerProfileCard';
import MarketplaceCard from '../components/marketplace/MarketplaceCard';
import { fetchMarketplaceServices } from '../services/marketplace';
import apiClient from '../services/axios';
import { FreelancerProfile } from '../services/freelancer';
import { MarketplaceServiceItem } from '../services/marketplace';

const FreelancerProfilePage = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [services, setServices] = useState<MarketplaceServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const profileResponse = await apiClient.get<{ profile: FreelancerProfile }>(`/freelancer/profile/${userId}`);
        setProfile(profileResponse.data.profile);
        const serviceResults = await fetchMarketplaceServices({ userId, sort: 'latest' });
        setServices(serviceResults);
      } catch {
        setError('Unable to load freelancer profile.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [userId]);

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-sm shadow-slate-100">Loading freelancer profile...</div>;
  }

  if (error || !profile) {
    return <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-700 shadow-sm shadow-red-100">{error || 'Profile not found.'}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Freelancer profile</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{profile.experienceLevel} freelancer</h1>
        <p className="mt-2 text-sm text-slate-600">View services and profile details for this freelancer.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <FreelancerProfileCard profile={profile} />
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Services</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">Published services</h2>
          <div className="mt-6 grid gap-4">
            {services.length ? services.map((service) => <MarketplaceCard key={service._id} service={service} />) : <p className="text-sm text-slate-500">No active services published yet.</p>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FreelancerProfilePage;
