import React from 'react';

type AIResponsePanelProps = {
  title: string;
  content: string;
  error?: string;
  loading?: boolean;
};

const AIResponsePanel = ({ title, content, error, loading = false }: AIResponsePanelProps) => (
  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-500">Review, copy, or refine the AI-generated response.</p>
      </div>
    </div>

    <div className="mt-6 min-h-[220px] rounded-3xl bg-white p-5 text-sm leading-7 text-slate-800 shadow-sm">
      {loading ? (
        <p className="text-slate-500">Generating response…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : content ? (
        <pre className="whitespace-pre-wrap break-words">{content}</pre>
      ) : (
        <p className="text-slate-500">Generated content will appear here once the request completes.</p>
      )}
    </div>
  </div>
);

export default AIResponsePanel;
