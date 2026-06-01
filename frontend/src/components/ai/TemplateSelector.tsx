import React from 'react';

type TemplateSelectorProps = {
  selectedTemplate: string;
  onSelect: (template: string) => void;
};

const templates = [
  {
    key: 'web development',
    title: 'Web Development',
    description: 'Client-facing landing pages, SaaS dashboards, and custom websites.',
  },
  {
    key: 'design',
    title: 'Design',
    description: 'Brand identities, UI/UX work, and product design support.',
  },
  {
    key: 'AI/ML',
    title: 'AI/ML',
    description: 'Intelligent models, data pipelines, and AI-driven solutions.',
  },
  {
    key: 'resume services',
    title: 'Resume Services',
    description: 'Career documents, LinkedIn profiles, and application copy.',
  },
  {
    key: 'content writing',
    title: 'Content Writing',
    description: 'Articles, blog posts, case studies, and marketing copy.',
  },
];

const TemplateSelector = ({ selectedTemplate, onSelect }: TemplateSelectorProps) => (
  <div className="space-y-4">
    <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Proposal templates</p>
    <div className="grid gap-4 sm:grid-cols-2">
      {templates.map((template) => (
        <button
          key={template.key}
          type="button"
          onClick={() => onSelect(template.key)}
          className={`rounded-3xl border p-5 text-left transition ${
            selectedTemplate === template.key
              ? 'border-blue-600 bg-blue-50 text-slate-900'
              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
          }`}
        >
          <div className="font-semibold">{template.title}</div>
          <p className="mt-2 text-sm text-slate-600">{template.description}</p>
        </button>
      ))}
    </div>
  </div>
);

export default TemplateSelector;
