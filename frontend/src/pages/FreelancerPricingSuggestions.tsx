import { useState } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SectionTitle from '../components/dashboard/SectionTitle';
import PricingSuggestionCard from '../components/ai/PricingSuggestionCard';
import { PricingSuggestionResult, suggestPricing } from '../services/freelancerAI';

const FreelancerPricingSuggestions = () => {
  const [category, setCategory] = useState('web development');
  const [projectComplexity, setProjectComplexity] = useState('Medium');
  const [skills, setSkills] = useState('React, Node.js, Tailwind CSS');
  const [deliveryExpectations, setDeliveryExpectations] = useState('Delivery with clean code, documentation, and weekly progress updates.');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [pricingResult, setPricingResult] = useState<PricingSuggestionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setPricingResult(null);

    try {
      const response = await suggestPricing({
        category,
        projectComplexity,
        skills: skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        deliveryExpectations,
        budget,
        timeline,
      });
      setPricingResult(response.pricing);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to generate pricing suggestion';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Pricing Suggestions"
        description="Use AI to estimate project pricing, delivery timeline, and service recommendations."
      />

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="space-y-6">
          <SectionTitle title="Pricing Input" description="Provide the project scope details to receive a realistic recommendation." />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Category</span>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
            <div className="grid gap-4 lg:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Complexity</span>
                <select
                  value={projectComplexity}
                  onChange={(event) => setProjectComplexity(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Enterprise</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Timeline</span>
                <input
                  value={timeline}
                  onChange={(event) => setTimeline(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="4-6 weeks"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Skills required</span>
              <input
                value={skills}
                onChange={(event) => setSkills(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="React, Node.js, API design"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Budget guidance</span>
              <input
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="$3,000 - $5,000"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Delivery expectations</span>
              <textarea
                rows={4}
                value={deliveryExpectations}
                onChange={(event) => setDeliveryExpectations(event.target.value)}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Expect weekly updates, actionable demos, and end-to-end implementation."
              />
            </label>
            {error && <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {loading ? 'Analyzing…' : 'Generate Pricing Suggestion'}
            </button>
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle title="AI Recommendation" description="Review the estimated budget, timeline, and recommended services." />
          <PricingSuggestionCard pricing={pricingResult} />
        </section>
      </div>
    </div>
  );
};

export default FreelancerPricingSuggestions;
