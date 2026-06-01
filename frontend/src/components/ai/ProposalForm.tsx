import React from 'react';

type ProposalFormProps = {
  projectTitle: string;
  projectDescription: string;
  budget: string;
  timeline: string;
  skills: string;
  category: string;
  deliveryExpectations: string;
  proposalStyle: string;
  templateType: string;
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading: boolean;
};

const ProposalForm = ({
  projectTitle,
  projectDescription,
  budget,
  timeline,
  skills,
  category,
  deliveryExpectations,
  proposalStyle,
  templateType,
  onChange,
  onSubmit,
  submitLabel,
  isLoading,
}: ProposalFormProps) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
    className="space-y-5"
  >
    <div className="grid gap-4 lg:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Project Title</span>
        <input
          value={projectTitle}
          onChange={(event) => onChange('projectTitle', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Build a modern landing page for a SaaS startup"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Category</span>
        <input
          value={category}
          onChange={(event) => onChange('category', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Web Development, AI/ML, Design"
        />
      </label>
    </div>

    <label className="block">
      <span className="text-sm font-medium text-slate-700">Project Description</span>
      <textarea
        value={projectDescription}
        onChange={(event) => onChange('projectDescription', event.target.value)}
        rows={6}
        className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="Describe the client requirements, goals, and deliverables in a clear way."
      />
    </label>

    <div className="grid gap-4 lg:grid-cols-3">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Budget</span>
        <input
          value={budget}
          onChange={(event) => onChange('budget', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="$2,500 - $3,500"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Timeline</span>
        <input
          value={timeline}
          onChange={(event) => onChange('timeline', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="4 weeks, 2 months, etc."
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Proposal Style</span>
        <select
          value={proposalStyle}
          onChange={(event) => onChange('proposalStyle', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option>Professional</option>
          <option>Friendly</option>
          <option>Technical</option>
          <option>Short Pitch</option>
          <option>Detailed Proposal</option>
        </select>
      </label>
    </div>

    <div className="grid gap-4 lg:grid-cols-2">
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Skills</span>
        <input
          value={skills}
          onChange={(event) => onChange('skills', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="React, Node.js, Tailwind CSS"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Template Type</span>
        <select
          value={templateType}
          onChange={(event) => onChange('templateType', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option>web development</option>
          <option>design</option>
          <option>AI/ML</option>
          <option>resume services</option>
          <option>content writing</option>
        </select>
      </label>
    </div>

    <label className="block">
      <span className="text-sm font-medium text-slate-700">Delivery Expectations</span>
      <input
        value={deliveryExpectations}
        onChange={(event) => onChange('deliveryExpectations', event.target.value)}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        placeholder="High-quality UX, weekly demos, rapid iteration"
      />
    </label>

    <button
      type="submit"
      disabled={isLoading}
      className="inline-flex items-center justify-center rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {isLoading ? 'Generating…' : submitLabel}
    </button>
  </form>
);

export default ProposalForm;
