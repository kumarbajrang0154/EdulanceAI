import React from 'react';

type ProposalViewerProps = {
  title: string;
  content: string;
  isLoading?: boolean;
  error?: string;
};

const ProposalViewer = ({ title, content, isLoading = false, error }: ProposalViewerProps) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">AI-generated content is ready for review and editing.</p>
      </div>
      {!isLoading && content && (
        <button
          type="button"
          onClick={() => navigator.clipboard.writeText(content)}
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400"
        >
          Copy
        </button>
      )}
    </div>

    <div className="mt-6 min-h-[220px] rounded-3xl bg-white p-5 text-sm leading-7 text-slate-800 shadow-sm">
      {isLoading ? (
        <p className="text-slate-500">Generating content, please wait...</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : content ? (
        <pre className="whitespace-pre-wrap break-words">{content}</pre>
      ) : (
        <p className="text-slate-500">Your generated content will appear here after submission.</p>
      )}
    </div>
  </div>
);

export default ProposalViewer;
