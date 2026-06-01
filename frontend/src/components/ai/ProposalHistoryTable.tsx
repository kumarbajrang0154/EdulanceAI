import React from 'react';
import { ProposalHistoryItem } from '../../services/freelancerAI';

type ProposalHistoryTableProps = {
  history: ProposalHistoryItem[];
  onDelete: (id: string) => void;
  onView: (proposal: ProposalHistoryItem) => void;
};

const ProposalHistoryTable = ({ history, onDelete, onView }: ProposalHistoryTableProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm shadow-slate-100 overflow-hidden">
    <div className="grid grid-cols-[2fr_1fr_1fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-700">
      <span>Proposal</span>
      <span>Template</span>
      <span>Style</span>
      <span className="text-right">Actions</span>
    </div>
    <div className="space-y-2 p-4">
      {history.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
          No proposals created yet. Use the AI Proposal Lab to generate your first draft.
        </div>
      ) : (
        history.map((proposal) => (
          <div key={proposal._id} className="grid grid-cols-[2fr_1fr_1fr_0.8fr] gap-4 rounded-3xl border border-slate-200 p-4 text-sm text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">{proposal.projectTitle}</p>
              <p className="mt-1 text-slate-500">{new Date(proposal.createdAt).toLocaleDateString()}</p>
            </div>
            <div>{proposal.templateType}</div>
            <div>{proposal.proposalType}</div>
            <div className="text-right space-x-2">
              <button
                type="button"
                onClick={() => onView(proposal)}
                className="rounded-full border border-blue-600 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-50"
              >
                View
              </button>
              <button
                type="button"
                onClick={() => onDelete(proposal._id)}
                className="rounded-full border border-red-600 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
);

export default ProposalHistoryTable;
