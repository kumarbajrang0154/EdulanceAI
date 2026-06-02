import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchFreelancerProfile, fetchFreelancerDashboard, fetchPortfolio, fetchServices, FreelancerDashboardSummary, FreelancerProfile } from '../services/freelancer';
import {
  fetchProposalHistory,
  fetchPricingHistory,
  PricingSuggestionHistoryItem,
  ProposalHistoryItem,
} from '../services/freelancerAI';
import DashboardStats from '../components/dashboard/DashboardStats';
import EarningsOverview from '../components/dashboard/EarningsOverview';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ProfileCard from '../components/dashboard/ProfileCard';
import SkillsSection from '../components/dashboard/SkillsSection';

const FreelancerDashboardHome = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<FreelancerProfile | null>(null);
  const [dashboard, setDashboard] = useState<FreelancerDashboardSummary | null>(null);
  const [proposalCount, setProposalCount] = useState(0);
  const [pricingCount, setPricingCount] = useState(0);
  const [latestProposal, setLatestProposal] = useState<ProposalHistoryItem | null>(null);
  const [latestPricing, setLatestPricing] = useState<PricingSuggestionHistoryItem | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchFreelancerProfile();
        setProfile(data);
      } catch {
        setProfile(null);
      }

      try {
        const summary = await fetchFreelancerDashboard();
        setDashboard(summary);
      } catch {
        setDashboard(null);
      }

      try {
        const historyResponse = await fetchProposalHistory();
        setProposalCount(historyResponse.proposals.length);
        setLatestProposal(historyResponse.proposals[0] ?? null);
      } catch {
        setProposalCount(0);
        setLatestProposal(null);
      }

      try {
        const pricingResponse = await fetchPricingHistory();
        setPricingCount(pricingResponse.pricingHistory.length);
        setLatestPricing(pricingResponse.pricingHistory[0] ?? null);
      } catch {
        setPricingCount(0);
        setLatestPricing(null);
      }
    };

    void loadDashboard();
  }, []);

  const stats = [
    { label: 'Services', value: String(dashboard?.totalServices ?? 0), description: 'Active service offerings in your catalog.' },
    { label: 'Portfolio', value: String(dashboard?.portfolioCount ?? 0), description: 'Published portfolio entries ready for clients.' },
    { label: 'Projects', value: String(dashboard?.totalProjects ?? 0), description: 'Ongoing and completed freelance engagements.' },
    { label: 'Earnings', value: `$${dashboard?.totalEarnings.toLocaleString() ?? '0'}`, description: 'Total revenue from completed work.' },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Welcome back</p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">Hello, {user?.fullName}</h2>
        <p className="mt-2 text-sm text-slate-600">Manage your freelancer portfolio, services, projects and earnings in a centralized workspace.</p>
      </div>

      <DashboardStats stats={stats} />

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">AI Freelancer Assistant</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Recent proposals and pricing</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Generated proposals</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{proposalCount}</p>
              <p className="mt-2 text-sm text-slate-600">Latest: {latestProposal?.projectTitle ?? 'No proposals yet'}</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Pricing suggestions</p>
              <p className="mt-4 text-3xl font-semibold text-slate-900">{pricingCount}</p>
              <p className="mt-2 text-sm text-slate-600">Latest: {latestPricing ? latestPricing.estimatedPrice : 'No suggestions yet'}</p>
            </div>
          </div>
          {latestProposal?.projectTitle && (
            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Latest proposal snippet</p>
              <p className="mt-2 leading-7 text-slate-600">{latestProposal.generatedProposal.slice(0, 180)}{latestProposal.generatedProposal.length > 180 ? '...' : ''}</p>
            </div>
          )}
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">AI workflow</p>
          <h3 className="mt-3 text-xl font-semibold text-slate-900">Quick access</h3>
          <div className="mt-6 space-y-4">
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Proposal generator</p>
              <p className="mt-2 text-slate-600">Start a new freelancer proposal with AI-driven structure and tone selection.</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Pricing assistant</p>
              <p className="mt-2 text-slate-600">Review suggested pricing and timelines for your next client engagement.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <ProfileCard showEditButton />
          <EarningsOverview
            totalEarnings={dashboard?.totalEarnings ?? 0}
            completedProjects={dashboard?.completedProjects ?? 0}
            pendingRevenue={dashboard?.pendingRevenue ?? 0}
          />
        </div>
        <div className="space-y-6">
          <SkillsSection skills={profile?.skills ?? []} />
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

export default FreelancerDashboardHome;
