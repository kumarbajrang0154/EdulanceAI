import React from 'react';
import { ProposalHistoryItem } from '../../services/freelancerAI';

type ProposalCardProps = {
  proposal: ProposalHistoryItem;
  onSelect?: (proposal: ProposalHistoryItem) => void;
  onDelete?: (id: string) => void;
};

const ProposalCard = ({ proposal, onSelect, onDelete }: ProposalCardProps) => (
  <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{proposal.templateType}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900">{proposal.projectTitle}</h3>
        <p className="mt-1 text-sm text-slate-600">{proposal.proposalType} proposal · {new Date(proposal.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="flex gap-2">
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(proposal)}
            className="rounded-full border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            View
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(proposal._id)}
            className="rounded-full border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>
        )}
      </div>
    </div>

    <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
      {proposal.generatedProposal.slice(0, 220)}{proposal.generatedProposal.length > 220 ? '...' : ''}
    </div>
  </article>
);

export default ProposalCard;
