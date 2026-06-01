import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import SectionTitle from '../components/dashboard/SectionTitle';
import ProposalForm from '../components/ai/ProposalForm';
import AIResponsePanel from '../components/ai/AIResponsePanel';
import TemplateSelector from '../components/ai/TemplateSelector';
import { generateCoverLetter, generateProposal } from '../services/freelancerAI';

const FreelancerProposalGenerator = () => {
  const navigate = useNavigate();
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [skills, setSkills] = useState('');
  const [category, setCategory] = useState('web development');
  const [deliveryExpectations, setDeliveryExpectations] = useState('High-quality, timely delivery');
  const [proposalStyle, setProposalStyle] = useState('Professional');
  const [templateType, setTemplateType] = useState('web development');
  const [loading, setLoading] = useState(false);
  const [proposalResult, setProposalResult] = useState('');
  const [coverLetterResult, setCoverLetterResult] = useState('');
  const [error, setError] = useState('');
  const [activeMode, setActiveMode] = useState<'proposal' | 'coverLetter'>('proposal');

  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'projectTitle':
        setProjectTitle(value);
        break;
      case 'projectDescription':
        setProjectDescription(value);
        break;
      case 'budget':
        setBudget(value);
        break;
      case 'timeline':
        setTimeline(value);
        break;
      case 'skills':
        setSkills(value);
        break;
      case 'category':
        setCategory(value);
        break;
      case 'deliveryExpectations':
        setDeliveryExpectations(value);
        break;
      case 'proposalStyle':
        setProposalStyle(value);
        break;
      case 'templateType':
        setTemplateType(value);
        break;
      default:
        break;
    }
  };

  const handleGenerateProposal = async () => {
    setLoading(true);
    setError('');
    setProposalResult('');

    try {
      const response = await generateProposal({
        projectTitle,
        projectDescription,
        budget,
        timeline,
        skills: skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        proposalStyle,
        templateType,
        category,
        deliveryExpectations,
      });
      setProposalResult(response.proposal);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to generate proposal';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    setLoading(true);
    setError('');
    setCoverLetterResult('');

    try {
      const response = await generateCoverLetter({
        projectTitle,
        projectDescription,
        timeline,
        skills: skills.split(',').map((skill) => skill.trim()).filter(Boolean),
        proposalStyle,
        deliveryExpectations,
      });
      setCoverLetterResult(response.coverLetter);
    } catch (error_) {
      const message = error_ instanceof Error ? error_.message : 'Failed to generate cover letter';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeader
        title="AI Proposal Generator"
        description="Create professional freelancer proposals, cover letters, and pricing drafts using AI assistance."
      />

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <SectionTitle
            title="Proposal Builder"
            description="Enter project details and choose the style that fits your client engagement."
            action={{
              label: 'View templates',
              onClick: () => navigate('/freelancer/proposal-templates'),
            }}
          />

          <TemplateSelector selectedTemplate={templateType} onSelect={(value) => setTemplateType(value)} />

          <ProposalForm
            projectTitle={projectTitle}
            projectDescription={projectDescription}
            budget={budget}
            timeline={timeline}
            skills={skills}
            category={category}
            deliveryExpectations={deliveryExpectations}
            proposalStyle={proposalStyle}
            templateType={templateType}
            onChange={handleFieldChange}
            onSubmit={activeMode === 'proposal' ? handleGenerateProposal : handleGenerateCoverLetter}
            submitLabel={activeMode === 'proposal' ? 'Generate Proposal' : 'Generate Cover Letter'}
            isLoading={loading}
          />
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-100">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Modes</h2>
                <p className="text-sm text-slate-500">Switch between proposal and cover letter generation.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['proposal', 'coverLetter'].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveMode(mode as 'proposal' | 'coverLetter')}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                      activeMode === mode ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {mode === 'proposal' ? 'Proposal' : 'Cover Letter'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AIResponsePanel
            title={activeMode === 'proposal' ? 'AI-generated Proposal' : 'AI-generated Cover Letter'}
            content={activeMode === 'proposal' ? proposalResult : coverLetterResult}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default FreelancerProposalGenerator;
