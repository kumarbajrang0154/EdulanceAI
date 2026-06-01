import React from 'react';
import { PricingSuggestionResult } from '../../services/freelancerAI';

type PricingSuggestionCardProps = {
  pricing: PricingSuggestionResult | null;
};

const PricingSuggestionCard = ({ pricing }: PricingSuggestionCardProps) => {
  if (!pricing) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm shadow-slate-100">
        <p className="text-sm">Pricing recommendations will appear here once generated.</p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm shadow-slate-100">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Pricing suggestion</p>
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">Recommended project budget</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{pricing.estimatedPrice}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Timeline</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{pricing.estimatedTimeline}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-700">Recommended services</p>
          <p className="mt-2 text-sm text-slate-600">{pricing.serviceRecommendations}</p>
        </div>
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <p className="text-sm font-medium text-slate-700">Reasoning</p>
          <p className="mt-2 text-sm text-slate-600">{pricing.recommendationSummary}</p>
        </div>
      </div>
    </div>
  );
};

export default PricingSuggestionCard;
