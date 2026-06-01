import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SectionTitle from '../components/dashboard/SectionTitle';
import TemplateSelector from '../components/ai/TemplateSelector';

const templates = [
  {
    key: 'web development',
    title: 'Web Development',
    description: 'Proposals for SaaS landing pages, admin dashboards, and website builds.',
    sample: 'Build a polished web experience that converts visitors and supports your growth.',
  },
  {
    key: 'design',
    title: 'Design',
    description: 'Brand identity, UX/UI, and product design proposals.',
    sample: 'Create a modern, intuitive interface that reinforces your visual brand and converts users.',
  },
  {
    key: 'AI/ML',
    title: 'AI/ML',
    description: 'Machine learning models, data pipelines, and automation solutions.',
    sample: 'Develop an intelligent system that scales with your data and delivers measurable business value.',
  },
  {
    key: 'resume services',
    title: 'Resume Services',
    description: 'Resume writing, LinkedIn profiles, and career application copy proposals.',
    sample: 'Help clients present their experience clearly and position them for interviews.',
  },
  {
    key: 'content writing',
    title: 'Content Writing',
    description: 'Content strategy, blog writing, and marketing copy proposals.',
    sample: 'Deliver compelling content that engages your audience and drives conversions.',
  },
];

const FreelancerProposalTemplates = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('web development');

  const activeTemplate = templates.find((template) => template.key === selectedTemplate) ?? templates[0];

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Proposal Templates"
        description="Choose from reusable freelancer templates to accelerate proposal creation."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-6">
          <SectionTitle title="Template Library" description="Select a template that matches your service offering." />
          <TemplateSelector selectedTemplate={selectedTemplate} onSelect={setSelectedTemplate} />
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Selected template</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{activeTemplate.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{activeTemplate.description}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Quick preview</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{activeTemplate.sample}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/freelancer/ai-proposals')}
            className="rounded-3xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Use {activeTemplate.title} template
          </button>
        </section>
      </div>
    </div>
  );
};

export default FreelancerProposalTemplates;
