import { useEffect, useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SectionTitle from '../components/dashboard/SectionTitle';
import ProposalHistoryTable from '../components/ai/ProposalHistoryTable';
import ProposalViewer from '../components/ai/ProposalViewer';
import { deleteProposalById, fetchProposalHistory, ProposalHistoryItem } from '../services/freelancerAI';

const FreelancerProposalHistory = () => {
  const [history, setHistory] = useState<ProposalHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState<ProposalHistoryItem | null>(null);
  const [error, setError] = useState('');

  const loadHistory = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchProposalHistory();
      setHistory(response.proposals);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to load proposal history';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError('');

    try {
      await deleteProposalById(id);
      setHistory((current) => current.filter((item) => item._id !== id));
      if (selectedProposal?._id === id) {
        setSelectedProposal(null);
      }
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to delete proposal';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadHistory();
  }, []);

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Proposal History"
        description="Manage saved proposals and review your AI-generated freelancer drafts."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6">
          <SectionTitle title="Saved Proposals" description="Your recent AI proposal history is stored securely for reuse." />

          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <ProposalHistoryTable history={history} onDelete={handleDelete} onView={setSelectedProposal} />
        </section>

        <section className="space-y-6">
          <SectionTitle title="Proposal Preview" description="Inspect the selected draft and copy it for client delivery." />
          <ProposalViewer
            title={selectedProposal ? selectedProposal.projectTitle : 'Select a proposal to preview'}
            content={selectedProposal ? selectedProposal.generatedProposal : ''}
            error={loading ? 'Refreshing history…' : ''}
            isLoading={loading}
          />
        </section>
      </div>
    </div>
  );
};

export default FreelancerProposalHistory;
