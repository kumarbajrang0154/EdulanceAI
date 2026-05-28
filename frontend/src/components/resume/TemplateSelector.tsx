import { ResumeTemplate } from '../../services/resume';

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  onTemplateChange: (template: ResumeTemplate) => void;
}

const templates: { key: ResumeTemplate; title: string; description: string }[] = [
  { key: 'modern', title: 'Modern', description: 'Clean layout with subtle section bars.' },
  { key: 'minimal', title: 'Minimal', description: 'Simple design for ATS-friendly resumes.' },
  { key: 'professional', title: 'Professional', description: 'High-impact layout with strong headings.' },
];

const TemplateSelector = ({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-100">
    <div className="mb-5 flex items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Template Selection</h3>
        <p className="text-sm text-slate-600">Choose a professional resume layout.</p>
      </div>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      {templates.map((template) => {
        const active = selectedTemplate === template.key;
        return (
          <button
            key={template.key}
            type="button"
            onClick={() => onTemplateChange(template.key)}
            className={`rounded-3xl border p-4 text-left transition hover:border-blue-400 ${
              active ? 'border-blue-600 bg-blue-50 shadow-sm' : 'border-slate-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-900">{template.title}</span>
              {active && <span className="rounded-full bg-blue-600 px-2 py-1 text-[11px] font-semibold text-white">Selected</span>}
            </div>
            <p className="mt-2 text-xs text-slate-500">{template.description}</p>
          </button>
        );
      })}
    </div>
  </div>
);

export default TemplateSelector;
